"use client";

import { useState } from "react";

import Card from "@/components/ui/Card";
import { useSettings } from "@/context/SettingsContext";
import type { Hemisphere, NativeFruit } from "@/types/settings";

export default function SettingsPage() {
  const { settings, replaceSettings } = useSettings();

  const [playerName, setPlayerName] = useState(settings.playerName);
  const [islandName, setIslandName] = useState(settings.islandName);
  const [hemisphere, setHemisphere] = useState<Hemisphere>(settings.hemisphere);
  const [nativeFruit, setNativeFruit] = useState<NativeFruit>(
    settings.nativeFruit
  );

  function handleSave(e: React.FormEvent) {
    e.preventDefault();

    replaceSettings({
      playerName,
      islandName,
      hemisphere,
      nativeFruit,
    });
  }

  return (
    <main className="page-shell">
      <h1 className="page-title">Settings</h1>

      <Card title="Island Settings">
        <form onSubmit={handleSave} className="grid gap-4">
          <div className="form-group">
            <label htmlFor="playerName">Player Name</label>
            <input
              id="playerName"
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="islandName">Island Name</label>
            <input
              id="islandName"
              type="text"
              value={islandName}
              onChange={(e) => setIslandName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="hemisphere">Hemisphere</label>
            <select
              id="hemisphere"
              value={hemisphere}
              onChange={(e) => setHemisphere(e.target.value as Hemisphere)}
            >
              <option value="Northern">Northern</option>
              <option value="Southern">Southern</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="nativeFruit">Native Fruit</label>
            <select
              id="nativeFruit"
              value={nativeFruit}
              onChange={(e) => setNativeFruit(e.target.value as NativeFruit)}
            >
              <option value="">Select fruit</option>
              <option value="Apple">Apple</option>
              <option value="Cherry">Cherry</option>
              <option value="Orange">Orange</option>
              <option value="Peach">Peach</option>
              <option value="Pear">Pear</option>
            </select>
          </div>

          <button type="submit" className="primary-button">
            Save Settings
          </button>
        </form>
      </Card>
    </main>
  );
}