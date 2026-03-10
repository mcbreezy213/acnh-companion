"use client";
import { sortVillagersByPriority } from "../../helpers/sortVillagersByPriority";
import { useEffect, useState } from "react";
import FriendshipBar from "../../components/FriendshipBar";
import { villagers as initialVillagers } from "../../data/villagers";
import {getFriendshipLevel, hasPhotoChance,} from "../../helpers/friendshipLevel";

export default function FriendshipPage() {
  const [villagers, setVillagers] = useState(initialVillagers);
  const [talked, setTalked] = useState<number[]>([]);
  const [gifted, setGifted] = useState<number[]>([]);

  useEffect(() => {
    const savedVillagers = localStorage.getItem("villagerFriendships");
    const savedTalked = localStorage.getItem("talkedVillagers");
    const savedGifted = localStorage.getItem("giftedVillagers");

    if (savedVillagers) {
      setVillagers(JSON.parse(savedVillagers));
    }

    if (savedTalked) {
      setTalked(JSON.parse(savedTalked));
    }

    if (savedGifted) {
      setGifted(JSON.parse(savedGifted));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("villagerFriendships", JSON.stringify(villagers));
  }, [villagers]);

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

  return (
    <main style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "2.4rem", marginBottom: "30px" }}>
        Villager Friendship Tracker
      </h1>

      <div style={{ display: "grid", gap: "20px" }}>
        {sortVillagersByPriority(villagers, talked, gifted).map((v) => (
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
            }}
          >
            <div
              style={{
                width: "110px",
                height: "110px",
                borderRadius: "20px",
                overflow: "hidden",
                border: "1px solid var(--card-border)",
                background: "#fff",
                flexShrink: 0,
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
            </div>

            <div style={{ flex: 1 }}>
              <h2 style={{ marginTop: 0, marginBottom: "8px" }}>{v.name}</h2>

              <p style={{ marginTop: 0, color: "var(--muted)" }}>
                {v.personality} • {v.species}
              </p>

              <p>Birthday: {v.birthday}</p>

              <div style={{ marginBottom: "8px", fontWeight: 600 }}>
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