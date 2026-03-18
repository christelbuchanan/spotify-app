import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { DataScenario } from "../types/music";

interface DataScenarioContextValue {
  scenario: DataScenario;
  setScenario: (scenario: DataScenario) => void;
}

const DataScenarioContext = createContext<DataScenarioContextValue | undefined>(undefined);

export function DataScenarioProvider({ children }: { children: ReactNode }) {
  const [scenario, setScenario] = useState<DataScenario>("normal");
  const value = useMemo(() => ({ scenario, setScenario }), [scenario]);
  return <DataScenarioContext.Provider value={value}>{children}</DataScenarioContext.Provider>;
}

export function useDataScenario() {
  const context = useContext(DataScenarioContext);
  if (!context) {
    throw new Error("useDataScenario must be used inside DataScenarioProvider");
  }
  return context;
}
