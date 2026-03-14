"use client";

import { useMemo, useState } from "react";

import Page from "@/components/layout/Page";
import Tile from "@/components/ui/Tile";
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
    <Page title="Island Dashboard">
     <section className="tiles">
  <Tile title="Villagers" icon="👥" href="/villagers" />
  <Tile title="Critters" icon="🐟" href="/collections/critters" />
  <Tile title="Museum" icon="🏛️" href="/collections/critters" />
  <Tile title="Turnips" icon="💰" href="/planner/turnips" />
  <Tile title="Flowers" icon="🌸" href="/island" />
  <Tile title="Planner" icon="📅" href="/planner/daily" />
</section>
      <Card title="Your Island">
        <p><strong>Player:</strong> {settings.playerName || "Not set"}</p>
        <p><strong>Island:</strong> {settings.islandName || "Not set"}</p>
        <p><strong>Hemisphere:</strong> {settings.hemisphere}</p>
        <p><strong>Native Fruit:</strong> {settings.nativeFruit || "Not set"}</p>
      </Card>

      <Card title="Island Overview">
        <p><strong>Villagers needing attention:</strong> {villagersNeedingAttention.length}</p>
        <p><strong>Daily tasks remaining:</strong> {remainingTasks.length}</p>
        <p><strong>Critters available now:</strong> {availableCritters.length}</p>
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
    </Page>
  );
}