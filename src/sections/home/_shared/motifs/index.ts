import AIMotif from "./AIMotif";
import DataMotif from "./DataMotif";
import AutomationMotif from "./AutomationMotif";
import SecurityMotif from "./SecurityMotif";
import CloudMotif from "./CloudMotif";

export const SOLUTION_MOTIFS: Record<string, React.FC<{ featured?: boolean }>> = {
  ai: AIMotif,
  "data-analytics": DataMotif,
  automation: AutomationMotif,
  security: SecurityMotif,
  "hybrid-cloud": CloudMotif,
};
