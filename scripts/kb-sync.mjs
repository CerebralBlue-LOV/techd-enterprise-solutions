#!/usr/bin/env node
/**
 * Sync the NeuralSeek knowledge base with kb/*.md, one document per file.
 * Adapted from the neuralseek.com site's scripts/kb/sync.mjs.
 *
 *   npm run kb:build                 regenerate kb/ from src/content/
 *   npm run kb:sync                  dry run: prints what would change, touches nothing
 *   npm run kb:sync -- --apply       deletes changed/removed docs, adds changed/new ones
 *
 * Each document is added with its page URL (https://techd.com + its `route:` line), so Seek
 * returns a link the chat can show, and with its file name as the per-document `filter`.
 *
 * State = what the KB holds now: { [file]: { id, sha256, title, url } }, one file per instance,
 * in _private/ (gitignored). Document ids are random, so each add's id is saved straight away
 * and a run that dies halfway can simply be re-run.
 *
 * Legacy docs: files uploaded by drag-and-drop have no state entry and no URL. For a file with
 * no state, the script asks Seek for it by title and adopts the id of the passage whose
 * `document` is that file name — it is then replaced like any changed document.
 *
 * Instance + key: NS_BASE_URL / NS_API_KEY, else .neuralseekrc.json (gitignored). The key is
 * only ever sent as the `apikey` header, never printed.
 */
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const KB = "kb";
const ORIGIN = "https://techd.com";
const APPLY = process.argv.includes("--apply");

const rc = existsSync(".neuralseekrc.json") ? JSON.parse(readFileSync(".neuralseekrc.json", "utf8")) : {};
const BASE = process.env.NS_BASE_URL || rc.baseUrl;
const KEY = process.env.NS_API_KEY || rc.apiKey;
if (!BASE || !KEY) throw new Error("NS_BASE_URL and NS_API_KEY (or .neuralseekrc.json) are required");
const INSTANCE = BASE.split("/").pop();
const STATE = process.env.KB_STATE || `_private/kb-sync/${INSTANCE}.json`;

if (!existsSync(KB)) throw new Error("kb/ not found — run `npm run kb:build` first");

// ── Manifest ────────────────────────────────────────────────────────────────
const docs = readdirSync(KB)
  .filter((f) => f.endsWith(".md"))
  .sort()
  .map((file) => {
    const text = readFileSync(join(KB, file), "utf8");
    const title = text.match(/^title:\s*(.+)$/m)?.[1].trim() || file.replace(/\.md$/, "");
    const route = text.match(/^route:\s*(\S+)$/m)?.[1] || "/";
    return {
      file,
      text,
      title,
      url: ORIGIN + route,
      filter: file.replace(/\.md$/, ""),
      sha256: createHash("sha256").update(text).digest("hex"),
    };
  });

const state = existsSync(STATE) ? JSON.parse(readFileSync(STATE, "utf8")) : {};
const saveState = () => {
  mkdirSync(dirname(STATE), { recursive: true });
  writeFileSync(STATE, JSON.stringify(state, null, 2) + "\n");
};

// ── NeuralSeek calls ────────────────────────────────────────────────────────
async function post(path, body) {
  const res = await fetch(`${BASE}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: KEY, "User-Agent": "td-website-kb-sync" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`/${path} HTTP ${res.status}`);
  return res.json();
}

const maistro = async (ntl, params) =>
  String(
    (await post("maistro", { ntl, params: Object.entries(params).map(([name, value]) => ({ name, value })) }))
      .answer ?? "",
  ).trim();

/**
 * The legacy (drag-and-drop) doc id for a file, found through Seek: its title first, then
 * "TechD <title>", then its first body line — a title alone does not always rank the doc.
 */
async function findLegacyId(d) {
  const firstLine = d.text.split("\n").find((l) => /^[#A-Za-z]/.test(l) && !/^(title|route|source|priority):/.test(l));
  const queries = [d.title, `TechD ${d.title}`, firstLine?.replace(/^#+\s*/, "").slice(0, 200)].filter(Boolean);
  for (const question of queries) {
    const data = await post("seek", { question, options: { includeSourceResults: true } });
    const hit = (data.passages ?? []).find((p) => p.document === d.file && typeof p.id === "string");
    if (hit) return hit.id.split("::")[0];
  }
  return null;
}

const ADD = `{{ nsKbAddDocument | text: "<< name: text, prompt: false >>" | title: "<< name: title, prompt: false >>" | url: "<< name: url, prompt: false >>" | filter: "<< name: filter, prompt: false >>" }}=>{{ variable | name: "r" }}
{{ text | text: "<< name: nsKbAddDocument.id, prompt: false >>" }}`;
const DELETE = `{{ nsKbDeleteDocument | id: "<< name: id, prompt: false >>" }}=>{{ variable | name: "r" }}`;
const ID = /^[0-9a-f]{8}(-[0-9a-f]{8}){3}$/;

// ── Plan ────────────────────────────────────────────────────────────────────
for (const d of docs) {
  if (state[d.file]) continue;
  const id = await findLegacyId(d);
  if (id) state[d.file] = { id, sha256: "legacy", title: d.title, url: "" };
}

const wanted = new Set(docs.map((d) => d.file));
const add = [], replace = [], remove = [];
let same = 0;
for (const d of docs) {
  const had = state[d.file];
  if (!had) add.push(d);
  else if (had.sha256 !== d.sha256 || had.url !== d.url) replace.push(d);
  else same++;
}
for (const file of Object.keys(state)) if (!wanted.has(file)) remove.push(file);

console.log(`[kb-sync] ${INSTANCE} · state ${STATE}${existsSync(STATE) ? "" : " (none yet)"}`);
console.log(`[kb-sync] ${add.length} new · ${replace.length} changed · ${remove.length} removed · ${same} unchanged`);
for (const d of add) console.log(`  + ${d.file}`);
for (const d of replace) console.log(`  ~ ${d.file}${state[d.file].sha256 === "legacy" ? " (legacy upload)" : ""}`);
for (const file of remove) console.log(`  - ${file}`);
if (!APPLY) {
  console.log("[kb-sync] dry run — nothing sent. Re-run with --apply to write to the KB.");
  process.exit(0);
}

// ── Apply ───────────────────────────────────────────────────────────────────
saveState(); // keep adopted legacy ids even if the run stops early

async function del(file) {
  await maistro(DELETE, { id: state[file].id });
  delete state[file];
  saveState();
}

for (const file of remove) {
  await del(file);
  console.log(`  deleted ${file}`);
}
for (const d of [...replace, ...add]) {
  if (state[d.file]) await del(d.file);
  const id = await maistro(ADD, { text: d.text, title: d.title, url: d.url, filter: d.filter });
  if (!ID.test(id)) throw new Error(`add ${d.file} returned no document id (got ${JSON.stringify(id.slice(0, 80))})`);
  state[d.file] = { id, sha256: d.sha256, title: d.title, url: d.url };
  saveState();
  console.log(`  added ${d.file} → ${id}`);
}
console.log(`[kb-sync] done · ${Object.keys(state).length} documents in the KB`);
