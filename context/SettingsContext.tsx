"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import type { AppSettings } from "@/types/settings";
import { defaultSettings } from "@/data/defaultSettings";
import { getSettings, saveSettings } from "@/lib/storage/settingsStorage";

type SettingsContextType = {
  settings: AppSettings;
  updateSettings: (updates: Partial<AppSettings>) => void;
  replaceSettings: (settings: AppSettings) => void;
};

const SettingsContext = createContext<SettingsContextType | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettingsState] = useState<AppSettings>(() => {
    try {
      return getSettings();
    } catch {
      return defaultSettings;
    }
  });

  function replaceSettings(newSettings: AppSettings) {
    saveSettings(newSettings);
    setSettingsState(newSettings);
  }

  function updateSettings(updates: Partial<AppSettings>) {
    const nextSettings = { ...settings, ...updates };
    saveSettings(nextSettings);
    setSettingsState(nextSettings);
  }

  return (
    <SettingsContext.Provider
      value={{ settings, updateSettings, replaceSettings }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error("useSettings must be used inside SettingsProvider");
  }

  return context;
}