"use client";

import { useEffect, useState } from "react";
import { defaultSettings } from "../../data/defaultSettings";

type Settings = {
  playerName: string;
  islandName: string;
  hemisphere: string;
  nativeFruit: string;
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    const savedSettings = localStorage.getItem("acnhSettings");

    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function saveSettings() {
    localStorage.setItem("acnhSettings", JSON.stringify(settings));
    setSavedMessage("Settings saved!");

    setTimeout(() => {
      setSavedMessage("");
    }, 2000);
  }

  return (
    <main style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>Island Settings</h1>

      <div style={{ marginBottom: "15px" }}>
        <label>Player Name</label>
        <br />
        <input
          type="text"
          name="playerName"
          value={settings.playerName}
          onChange={handleChange}
          style={{ padding: "8px", width: "300px" }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>Island Name</label>
        <br />
        <input
          type="text"
          name="islandName"
          value={settings.islandName}
          onChange={handleChange}
          style={{ padding: "8px", width: "300px" }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>Hemisphere</label>
        <br />
        <select
          name="hemisphere"
          value={settings.hemisphere}
          onChange={handleChange}
          style={{ padding: "8px", width: "320px" }}
        >
          <option value="north">Northern</option>
          <option value="south">Southern</option>
        </select>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>Native Fruit</label>
        <br />
        <select
          name="nativeFruit"
          value={settings.nativeFruit}
          onChange={handleChange}
          style={{ padding: "8px", width: "320px" }}
        >
          <option value="">Select fruit</option>
          <option value="Apples">Apples</option>
          <option value="Cherries">Cherries</option>
          <option value="Oranges">Oranges</option>
          <option value="Peaches">Peaches</option>
          <option value="Pears">Pears</option>
        </select>
      </div>

      <button
        onClick={saveSettings}
        style={{
          padding: "10px 16px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Save Settings
      </button>

      {savedMessage && <p style={{ marginTop: "10px" }}>{savedMessage}</p>}
    </main>
  );
}