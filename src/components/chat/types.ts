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

export type SeekResponse = {
  answer?: string;
  answersText?: string;
  document?: { title?: string; url?: string };
  fwd?: string;
  confidence?: number;
  kbCoverage?: number;
  totalResultsReturned?: number;
};
