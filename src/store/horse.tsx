import React, { createContext, useEffect, useState } from "react";
import ChangeNameDialog from "../components/ChangeNameDialog";

interface HorseContext {
  horses: string[];
  setHorses: (horse?: string[]) => void;
}

export const HorseContext = createContext<HorseContext>({
  horses: [],
  setHorses: () => {},
});

interface Props {
  children: React.ReactNode;
}

export default function HorseContextProvider({ children }: Props) {
  const [horses, setHorsesState] = useState<string[]>([]);

  useEffect(() => {
    const horses = localStorage.getItem("horses");
    if (horses) setHorsesState(JSON.parse(horses));
  }, []);

  const setHorses = (horses?: string[]) => {
    if (!horses) return;
    localStorage.setItem("horses", JSON.stringify(horses));
    setHorsesState(horses);
  };

  return (
    <HorseContext.Provider value={{ horses, setHorses }}>
      <ChangeNameDialog
        open={!horses[0]}
        onClose={() => {}}
        horses={horses}
        setHorses={setHorses}
        persist
      />
      {children}
    </HorseContext.Provider>
  );
}
