"use client";

import { useMemo, useState } from "react";

import Card from "@/components/ui/Card";
import { useSettings } from "@/context/SettingsContext";
import { critters } from "@/data/critters";
import { dailyTasks } from "@/data/dailyTasks";
import { villagers } from "@/data/villagers";
import { getAvailableNow } from "@/lib/game/critterFilters";
import { getCompletedDailyTasks } from "@/lib/storage/dailyStorage";
import {
  getGiftedVillagers,
  getTalkedVillagers,
} from "@/lib/storage/villagerStorage";

export default function HomePage() {
  const { settings } = useSettings();

  const [talkedVillagers] = useState<number[]>(() => {
    try {
      return getTalkedVillagers();
    } catch {
      return [];
    }
  });

  const [giftedVillagers] = useState<number[]>(() => {
    try {
      return getGiftedVillagers();
    } catch {
      return [];
    }
  });

  const [completedTaskIds] = useState<number[]>(() => {
    try {
      return getCompletedDailyTasks();
    } catch {
      return [];
    }
  });

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentHour = now.getHours();

  const availableCritters = useMemo(() => {
    return getAvailableNow(
      critters,
      settings.hemisphere,
      currentMonth,
      currentHour
    );
  }, [settings.hemisphere, currentMonth, currentHour]);

  const villagersNeedingAttention = useMemo(() => {
    return villagers.filter(
      (villager) =>
        !talkedVillagers.includes(villager.id) ||
        !giftedVillagers.includes(villager.id)
    );
  }, [talkedVillagers, giftedVillagers]);

  const remainingTasks = useMemo(() => {
    return dailyTasks.filter((task) => !completedTaskIds.includes(task.id));
  }, [completedTaskIds]);

  return (
    <main className="page-shell">
      <h1 className="page-title">Island Dashboard</h1>

      <div className="grid gap-5">
        <Card title="Your Island">
          <p>
            <strong>Player:</strong> {settings.playerName || "Not set"}
          </p>
          <p>
            <strong>Island:</strong> {settings.islandName || "Not set"}
          </p>
          <p>
            <strong>Hemisphere:</strong> {settings.hemisphere}
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
            <ul>
              {villagersNeedingAttention.map((villager) => (
                <li key={villager.id}>{villager.name}</li>
              ))}
            </ul>
          ) : (
            <p>All villagers handled today ✓</p>
          )}
        </Card>

        <Card title="Daily Tasks Remaining">
          {remainingTasks.length > 0 ? (
            <ul>
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
            <ul>
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