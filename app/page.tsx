"use client";

import { useEffect, useState } from "react";
import Card from "../components/Card";
import { useSettings } from "../context/SettingsContext";
import { villagers } from "../data/villagers";
import { dailyTasks } from "../data/dailyTasks";
import { critters } from "../data/critters";
import { getAvailableNow } from "../helpers/critterFilters";

export default function Home() {
  const { settings } = useSettings();

  const [talked, setTalked] = useState<number[]>([]);
  const [gifted, setGifted] = useState<number[]>([]);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);

  useEffect(() => {
    const savedTalked = localStorage.getItem("talkedVillagers");
    const savedGifted = localStorage.getItem("giftedVillagers");
    const savedTasks = localStorage.getItem("completedDailyTasks");

    if (savedTalked) setTalked(JSON.parse(savedTalked));
    if (savedGifted) setGifted(JSON.parse(savedGifted));
    if (savedTasks) setCompletedTasks(JSON.parse(savedTasks));
  }, []);

  const currentMonth = new Date().getMonth() + 1;
  const currentHour = new Date().getHours();

  const availableCritters = getAvailableNow(
    critters,
    settings.hemisphere,
    currentMonth,
    currentHour
  );

  const villagersNeedingAttention = villagers.filter(
    (v) => !talked.includes(v.id) || !gifted.includes(v.id)
  );

  const remainingTasks = dailyTasks.filter(
    (task) => !completedTasks.includes(task.id)
  );

  return (
    <main style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>Island Dashboard</h1>

      <Card title="Your Island">
        <p>
          <strong>Player:</strong> {settings.playerName || "Not set"}
        </p>
        <p>
          <strong>Island:</strong> {settings.islandName || "Not set"}
        </p>
        <p>
          <strong>Hemisphere:</strong>{" "}
          {settings.hemisphere === "north" ? "Northern" : "Southern"}
        </p>
        <p>
          <strong>Native Fruit:</strong> {settings.nativeFruit || "Not set"}
        </p>
      </Card>

      <Card title="Island Overview">
        <p>
          <strong>Villagers needing attention:</strong>{" "}
          {villagersNeedingAttention.length}
        </p>
        <p>
          <strong>Daily tasks remaining:</strong> {remainingTasks.length}
        </p>
        <p>
          <strong>Critters available now:</strong> {availableCritters.length}
        </p>
      </Card>

      <Card title="Villagers Needing Attention">
        {villagersNeedingAttention.length > 0 ? (
          villagersNeedingAttention.map((v) => <p key={v.id}>{v.name}</p>)
        ) : (
          <p>All villagers talked to and gifted today ✓</p>
        )}
      </Card>

      <Card title="Daily Tasks Remaining">
        {remainingTasks.length > 0 ? (
          remainingTasks.map((task) => <p key={task.id}>{task.name}</p>)
        ) : (
          <p>All daily tasks complete ✓</p>
        )}
      </Card>

      <Card title="Critters Available Now">
        {availableCritters.length > 0 ? (
          availableCritters.map((c) => <p key={c.id}>{c.name}</p>)
        ) : (
          <p>No critters available right now.</p>
        )}
      </Card>
    </main>
  );
}