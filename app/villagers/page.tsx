"use client";

import { useMemo, useState } from "react";

import Page from "@/components/layout/Page";
import VillagerCard from "@/components/domain/villagers/VillagerCard";
import { villagers } from "@/data/villagers";
import {
  getGiftedVillagers,
  getTalkedVillagers,
  saveGiftedVillagers,
  saveTalkedVillagers,
} from "@/lib/storage/villagerStorage";

type VillagerFriendshipState = {
  id: number;
  friendship: number;
};

export default function VillagersPage() {
  const [friendships, setFriendships] = useState<VillagerFriendshipState[]>(
    () =>
      villagers.map((villager) => ({
        id: villager.id,
        friendship: 0,
      }))
  );

  const [talkedVillagers, setTalkedVillagers] = useState<number[]>(() => {
    try {
      return getTalkedVillagers();
    } catch {
      return [];
    }
  });

  const [giftedVillagers, setGiftedVillagers] = useState<number[]>(() => {
    try {
      return getGiftedVillagers();
    } catch {
      return [];
    }
  });

  function handleTalk(villagerId: number) {
    if (talkedVillagers.includes(villagerId)) return;

    const updatedTalked = [...talkedVillagers, villagerId];
    setTalkedVillagers(updatedTalked);
    saveTalkedVillagers(updatedTalked);

    setFriendships((prev) =>
      prev.map((entry) =>
        entry.id === villagerId
          ? { ...entry, friendship: Math.min(entry.friendship + 1, 100) }
          : entry
      )
    );
  }

  function handleGift(villagerId: number) {
    if (giftedVillagers.includes(villagerId)) return;

    const updatedGifted = [...giftedVillagers, villagerId];
    setGiftedVillagers(updatedGifted);
    saveGiftedVillagers(updatedGifted);

    setFriendships((prev) =>
      prev.map((entry) =>
        entry.id === villagerId
          ? { ...entry, friendship: Math.min(entry.friendship + 3, 100) }
          : entry
      )
    );
  }

  const villagerCards = useMemo(() => {
    return villagers.map((villager) => {
      const friendshipEntry = friendships.find(
        (entry) => entry.id === villager.id
      );

      return {
        ...villager,
        friendship: friendshipEntry?.friendship ?? 0,
        talked: talkedVillagers.includes(villager.id),
        gifted: giftedVillagers.includes(villager.id),
      };
    });
  }, [friendships, talkedVillagers, giftedVillagers]);

  return (
    <Page title="Villagers">
      <div className="villager-grid">
        {villagerCards.map((villager) => (
          <div key={villager.id}>
            <VillagerCard
              name={villager.name}
              personality={villager.personality}
              birthday={villager.birthday}
              species={villager.species}
              image={villager.image}
              talked={villager.talked}
              gifted={villager.gifted}
              friendship={villager.friendship}
            />

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "10px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                type="button"
                className="btn"
                onClick={() => handleTalk(villager.id)}
                disabled={villager.talked}
              >
                {villager.talked ? "Talked ✓" : "Talk Today"}
              </button>

              <button
                type="button"
                className="btn"
                onClick={() => handleGift(villager.id)}
                disabled={villager.gifted}
              >
                {villager.gifted ? "Gifted ✓" : "Gift Today"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </Page>
  );
}