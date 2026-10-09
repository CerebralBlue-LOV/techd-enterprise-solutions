export type Role = "user" | "assistant";

export type Citation = {
  title: string;
  url?: string;
};

export type Message = {
  id: string;
  role: Role;
  content: string;
  citations?: Citation[];
  error?: boolean;
};

// Shape verified against the live partners instance: `document` is the source
// document's name as a plain string and `url` is its link, both top-level
// (empty strings when nothing matched).
export type SeekResponse = {
  answer?: string;
  answersText?: string;
  document?: string;
  url?: string;
  fwd?: string;
  confidence?: number;
  kbCoverage?: number;
  totalResultsReturned?: number;
};
