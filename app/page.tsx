"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Card from "../components/Card";
import { useSettings } from "../context/SettingsContext";
import { villagers } from "../data/villagers";
import { dailyTasks } from "../data/dailyTasks";
import { critters } from "../data/critters";
import { getAvailableNow } from "../helpers/critterFilters";

export default function Home() {
  const { settings } = useSettings();
  const router = useRouter();

  const [talked, setTalked] = useState<number[]>([]);
  const [gifted, setGifted] = useState<number[]>([]);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);

  useEffect(() => {
    const setupComplete = localStorage.getItem("setupComplete");

    if (!setupComplete) {
      router.push("/setup");
    }
  }, [router]);

  useEffect(() => {
    const savedTalked = localStorage.getItem("talkedVillagers");
    const savedGifted = localStorage.getItem("giftedVillagers");
    const savedCompletedTasks = localStorage.getItem("completedTasks");

    if (savedTalked) {
      try {
        setTalked(JSON.parse(savedTalked));
      } catch {
        localStorage.removeItem("talkedVillagers");
      }
    }

    if (savedGifted) {
      try {
        setGifted(JSON.parse(savedGifted));
      } catch {
        localStorage.removeItem("giftedVillagers");
      }
    }

    if (savedCompletedTasks) {
      try {
        setCompletedTasks(JSON.parse(savedCompletedTasks));
      } catch {
        localStorage.removeItem("completedTasks");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("talkedVillagers", JSON.stringify(talked));
  }, [talked]);

  useEffect(() => {
    localStorage.setItem("giftedVillagers", JSON.stringify(gifted));
  }, [gifted]);

  useEffect(() => {
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  }, [completedTasks]);

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
    <main className="page-shell">
      <h1 className="page-title">Island Dashboard</h1>

      <div style={{ display: "grid", gap: "20px" }}>
        <Card title="Your Island">
          <p>
            <strong>Player:</strong> {settings.playerName || "Not set"}
          </p>
          <p>
            <strong>Island:</strong> {settings.islandName || "Not set"}
          </p>
          <p>
            <strong>Hemisphere:</strong> {settings.hemisphere || "Northern"}
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
            <ul style={{ paddingLeft: "20px", margin: 0 }}>
              {villagersNeedingAttention.map((v) => (
                <li key={v.id}>{v.name}</li>
              ))}
            </ul>
          ) : (
            <p>All villagers are done for today ✓</p>
          )}
        </Card>

        <Card title="Daily Tasks Remaining">
          {remainingTasks.length > 0 ? (
            <ul style={{ paddingLeft: "20px", margin: 0 }}>
              {remainingTasks.map((task) => (
                <li key={task.id}>{task.name}</li>
              ))}
            </ul>
          ) : (
            <p>All daily tasks complete ✓</p>
          )}
        </Card>

        <Card title="Critters Available Now">
          {availableCritters.length > 0 ? (
            <ul style={{ paddingLeft: "20px", margin: 0 }}>
              {availableCritters.slice(0, 10).map((critter) => (
                <li key={critter.id}>
                  {critter.name} ({critter.type})
                </li>
              ))}
            </ul>
          ) : (
            <p>No critters available right now.</p>
          )}
        </Card>
      </div>
    </main>
  );
}