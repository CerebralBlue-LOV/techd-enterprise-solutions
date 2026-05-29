import type { ComponentType } from "react";

const RELOAD_FLAG = "lov:chunk-reloaded";

const isStaleChunkError = (value: unknown): boolean => {
  const msg = String(
    (value as { message?: string } | null)?.message ?? value ?? "",
  );

  return (
    msg.includes("dynamically imported module") ||
    msg.includes("Failed to fetch dynamically imported module") ||
    msg.includes("Importing a module script failed") ||
    /ChunkLoadError/i.test(msg)
  );
};

export const hasReloadedForStaleChunk = () =>
  sessionStorage.getItem(RELOAD_FLAG) === "1";

export const tryReloadForStaleChunk = (value: unknown): boolean => {
  if (isStaleChunkError(value) && !hasReloadedForStaleChunk()) {
    sessionStorage.setItem(RELOAD_FLAG, "1");
    window.location.reload();
    return true;
  }

  return false;
};

export const installStaleChunkRecovery = () => {
  window.addEventListener("error", (event) => {
    tryReloadForStaleChunk(event.error ?? event.message ?? event);
  });

  window.addEventListener("unhandledrejection", (event) => {
    tryReloadForStaleChunk(event.reason);
  });

  window.addEventListener("load", () => {
    sessionStorage.removeItem(RELOAD_FLAG);
  });
};

export const recoverableLazyImport = <TModule extends { default: ComponentType<any> }>(
  loader: () => Promise<TModule>,
) => async () => {
  try {
    return await loader();
  } catch (error) {
    if (!tryReloadForStaleChunk(error) && hasReloadedForStaleChunk()) {
      window.location.assign(window.location.href);
    }
    throw error;
  }
};