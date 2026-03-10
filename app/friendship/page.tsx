"use client";

import { useEffect, useState } from "react";
import { useSettings } from "../../context/SettingsContext";
import { villagers } from "../../data/villagers";
import FriendshipBar from "../../components/FriendshipBar";
import {
  getFriendshipLevel,
  hasPhotoChance,
} from "../../helpers/friendshipLevel";
import { sortVillagersByPriority } from "../../helpers/sortVillagersByPriority";
import { shouldResetDaily } from "../../utils/dailyReset";

export default function FriendshipPage() {
  const { settings } = useSettings();

  const [villagersState, setVillagers] = useState(villagers);
  const [talked, setTalked] = useState<number[]>([]);
  const [gifted, setGifted] = useState<number[]>([]);

  useEffect(() => {
    const savedVillagers = localStorage.getItem("villagerFriendships");
    const savedTalked = localStorage.getItem("talkedVillagers");
    const savedGifted = localStorage.getItem("giftedVillagers");

    if (savedVillagers) {
      try {
        setVillagers(JSON.parse(savedVillagers));
      } catch {
        localStorage.removeItem("villagerFriendships");
      }
    }

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

    if (shouldResetDaily()) {
      setTalked([]);
      setGifted([]);
      localStorage.setItem("talkedVillagers", JSON.stringify([]));
      localStorage.setItem("giftedVillagers", JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("villagerFriendships", JSON.stringify(villagersState));
  }, [villagersState]);

  useEffect(() => {
    localStorage.setItem("talkedVillagers", JSON.stringify(talked));
  }, [talked]);

  useEffect(() => {
    localStorage.setItem("giftedVillagers", JSON.stringify(gifted));
  }, [gifted]);

  function talkToVillager(id: number) {
    if (talked.includes(id)) return;

    setTalked((prev) => [...prev, id]);

    setVillagers((prev) =>
      prev.map((v) =>
        v.id === id
          ? { ...v, friendship: Math.min(v.friendship + 1, 100) }
          : v
      )
    );
  }

  function giftVillager(id: number) {
    if (gifted.includes(id)) return;

    setGifted((prev) => [...prev, id]);

    setVillagers((prev) =>
      prev.map((v) =>
        v.id === id
          ? { ...v, friendship: Math.min(v.friendship + 3, 100) }
          : v
      )
    );
  }

  const sortedVillagers = sortVillagersByPriority(
    villagersState,
    talked,
    gifted
  );

  return (
    <main style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "2.4rem", marginBottom: "20px" }}>
        Villager Friendship Tracker
      </h1>

      <div style={{ display: "grid", gap: "20px" }}>
        {sortedVillagers.map((v) => (
          <div
            key={v.id}
            style={{
              border: "1px solid var(--card-border)",
              borderRadius: "20px",
              background: "var(--card)",
              padding: "20px",
              boxShadow: "var(--shadow)",
              display: "flex",
              gap: "20px",
              alignItems: "flex-start",
              opacity:
                talked.includes(v.id) && gifted.includes(v.id) ? 0.75 : 1,
            }}
          >
            <img
              src={v.portrait}
              alt={v.name}
              style={{
                width: "110px",
                height: "110px",
                objectFit: "cover",
                borderRadius: "16px",
              }}
            />

            <div style={{ flex: 1 }}>
              <h2 style={{ marginTop: 0 }}>{v.name}</h2>

              <p style={{ color: "var(--muted)" }}>
                {v.personality} • {v.species}
              </p>

              <p>Birthday: {v.birthday}</p>

              <div style={{ fontWeight: 600 }}>
                Friendship: {v.friendship}
              </div>

              <FriendshipBar points={v.friendship} max={100} />

              <p>Level: {getFriendshipLevel(v.friendship)}</p>

              <p>
                Photo Chance:{" "}
                {hasPhotoChance(v.friendship) ? "Possible ✓" : "Not yet"}
              </p>

              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button onClick={() => talkToVillager(v.id)}>
                  {talked.includes(v.id) ? "Talked ✓" : "Talk Today"}
                </button>

                <button onClick={() => giftVillager(v.id)}>
                  {gifted.includes(v.id) ? "Gifted ✓" : "Gift Today"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}