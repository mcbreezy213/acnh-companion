"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Settings } from "../types";

const defaultSettings: Settings = {
  playerName: "",
  islandName: "",
  hemisphere: "north",
  nativeFruit: "",
};

type SettingsContextType = {
  settings: Settings;
  setSettings: (settings: Settings) => void;
};

const SettingsContext = createContext<SettingsContextType>({
  settings: defaultSettings,
  setSettings: () => {},
});

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettingsState] = useState(defaultSettings);

  useEffect(() => {
    const saved = localStorage.getItem("acnhSettings");

    if (saved) {
      setSettingsState(JSON.parse(saved));
    }
  }, []);

  function setSettings(newSettings: Settings) {
    setSettingsState(newSettings);
    localStorage.setItem("acnhSettings", JSON.stringify(newSettings));
  }

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}