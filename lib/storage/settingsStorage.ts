import type { AppSettings } from "@/types/settings";
import { defaultSettings } from "@/data/defaultSettings";

const SETTINGS_KEY = "acnhSettings";
const SETUP_KEY = "setupComplete";

export function getSettings(): AppSettings {
  const raw = localStorage.getItem(SETTINGS_KEY);

  if (!raw) {
    return defaultSettings;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<AppSettings>;

    return {
      ...defaultSettings,
      ...parsed,
    };
  } catch {
    localStorage.removeItem(SETTINGS_KEY);

    return defaultSettings;
  }
}

export function saveSettings(settings: AppSettings): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function isSetupComplete(): boolean {
  return localStorage.getItem(SETUP_KEY) === "true";
}

export function setSetupComplete(value: boolean): void {
  localStorage.setItem(SETUP_KEY, String(value));
}