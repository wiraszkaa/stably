import React, { createContext, useEffect, useState } from "react";
import ChangeNameDialog from "../components/ChangeNameDialog";

interface HorseContext {
  horse: string;
  setHorse: (horse?: string) => void;
}

export const HorseContext = createContext<HorseContext>({
  horse: "",
  setHorse: () => {},
});

interface Props {
  children: React.ReactNode;
}

export default function HorseContextProvider({ children }: Props) {
  const [horse, setHorseState] = useState<string>("");

  useEffect(() => {
    const horse = localStorage.getItem("horse");
    if (horse) setHorseState(horse);
  }, []);

  const setHorse = (horse?: string) => {
    if (!horse) return;
    localStorage.setItem("horse", horse);
    setHorseState(horse);
  };

  return (
    <HorseContext.Provider value={{ horse, setHorse }}>
      <ChangeNameDialog
        open={!horse}
        onClose={() => {}}
        horse={horse}
        setHorse={setHorse}
      />
      {children}
    </HorseContext.Provider>
  );
}
