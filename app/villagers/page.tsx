"use client";

import { useMemo, useState } from "react";

import Card from "@/components/ui/Card";
import FriendshipBar from "@/components/domain/villagers/FriendshipBar";
import { villagers } from "@/data/villagers";
import { getFriendshipLabel } from "@/lib/game/friendshipLevel";
import {
  getGiftedVillagers,
  getTalkedVillagers,
  saveGiftedVillagers,
  saveTalkedVillagers,
} from "@/lib/storage/villagerStorage";

type VillagerState = {
  id: number;
  friendship: number;
};

const initialFriendship: VillagerState[] = villagers.map((villager) => ({
  id: villager.id,
  friendship: 0,
}));

export default function VillagersPage() {
  const [friendships, setFriendships] =
    useState<VillagerState[]>(initialFriendship);

  const [talked, setTalked] = useState<number[]>(() => {
    try {
      return getTalkedVillagers();
    } catch {
      return [];
    }
  });

  const [gifted, setGifted] = useState<number[]>(() => {
    try {
      return getGiftedVillagers();
    } catch {
      return [];
    }
  });

  function talkToVillager(id: number) {
    if (talked.includes(id)) return;

    const nextTalked = [...talked, id];
    setTalked(nextTalked);
    saveTalkedVillagers(nextTalked);

    setFriendships((prev) =>
      prev.map((villager) =>
        villager.id === id
          ? { ...villager, friendship: Math.min(villager.friendship + 1, 100) }
          : villager
      )
    );
  }

  function giftVillager(id: number) {
    if (gifted.includes(id)) return;

    const nextGifted = [...gifted, id];
    setGifted(nextGifted);
    saveGiftedVillagers(nextGifted);

    setFriendships((prev) =>
      prev.map((villager) =>
        villager.id === id
          ? { ...villager, friendship: Math.min(villager.friendship + 3, 100) }
          : villager
      )
    );
  }

  const villagerCards = useMemo(() => {
    return villagers.map((villager) => {
      const friendship = friendships.find((item) => item.id === villager.id);

      return {
        ...villager,
        friendship: friendship?.friendship ?? 0,
      };
    });
  }, [friendships]);

  return (
    <main className="page-shell">
      <h1 className="page-title">Villager Friendship Tracker</h1>

      <div className="grid gap-5">
        {villagerCards.map((villager) => (
          <Card key={villager.id} title={villager.name}>
            <p>
              <strong>Personality:</strong> {villager.personality}
            </p>
            <p>
              <strong>Species:</strong> {villager.species || "Unknown"}
            </p>
            <p>
              <strong>Birthday:</strong> {villager.birthday || "Unknown"}
            </p>
            <p>
              <strong>Friendship:</strong> {villager.friendship}
            </p>
            <p>
              <strong>Level:</strong> {getFriendshipLabel(villager.friendship)}
            </p>

            <FriendshipBar points={villager.friendship} max={100} />

            <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
              <button onClick={() => talkToVillager(villager.id)}>
                {talked.includes(villager.id) ? "Talked ✓" : "Talk Today"}
              </button>

              <button onClick={() => giftVillager(villager.id)}>
                {gifted.includes(villager.id) ? "Gifted ✓" : "Gift Today"}
              </button>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}