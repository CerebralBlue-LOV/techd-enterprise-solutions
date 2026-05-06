import AINeuralScene from "./AINeuralScene";
import DataGridScene from "./DataGridScene";
import AutomationFlowScene from "./AutomationFlowScene";
import SecurityDomeScene from "./SecurityDomeScene";
import CloudOrbitScene from "./CloudOrbitScene";
import type { FC } from "react";

export const SOLUTION_SCENES: Record<string, FC<{ active?: boolean }>> = {
  ai: AINeuralScene,
  "data-analytics": DataGridScene,
  automation: AutomationFlowScene,
  security: SecurityDomeScene,
  "hybrid-cloud": CloudOrbitScene,
};
