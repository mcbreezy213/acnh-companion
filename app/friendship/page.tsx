"use client";

import { useEffect, useState } from "react";
import { shouldResetDaily } from "../../utils/dailyReset";
import { villagers as initialVillagers } from "../../data/villagers";
import {
  getFriendshipLevel,
  hasPhotoChance,
} from "../../helpers/friendshipLevel";
import { sortVillagersByPriority } from "../../helpers/sortVillagers";

export default function FriendshipPage() {
  const [villagers, setVillagers] = useState(initialVillagers);
  const [talked, setTalked] = useState<number[]>([]);
  const [gifted, setGifted] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [personalityFilter, setPersonalityFilter] = useState("");

  useEffect(() => {
    const savedTalked = localStorage.getItem("talkedVillagers");
    const savedGifted = localStorage.getItem("giftedVillagers");
    const savedVillagers = localStorage.getItem("villagerFriendships");

    if (savedTalked) {
      setTalked(JSON.parse(savedTalked));
    }

    if (savedGifted) {
      setGifted(JSON.parse(savedGifted));
    }

    if (savedVillagers) {
      setVillagers(JSON.parse(savedVillagers));
    }

    if (shouldResetDaily()) {
      setTalked([]);
      setGifted([]);
      localStorage.setItem("talkedVillagers", JSON.stringify([]));
      localStorage.setItem("giftedVillagers", JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("talkedVillagers", JSON.stringify(talked));
  }, [talked]);

  useEffect(() => {
    localStorage.setItem("giftedVillagers", JSON.stringify(gifted));
  }, [gifted]);

  useEffect(() => {
    localStorage.setItem("villagerFriendships", JSON.stringify(villagers));
  }, [villagers]);

  function toggleTalk(id: number) {
    const alreadyTalked = talked.includes(id);

    setTalked((prev) =>
      alreadyTalked ? prev.filter((v) => v !== id) : [...prev, id]
    );

    if (!alreadyTalked) {
      setVillagers((prev) =>
        prev.map((villager) =>
          villager.id === id
            ? { ...villager, friendship: villager.friendship + 1 }
            : villager
        )
      );
    }
  }

  function toggleGift(id: number) {
    const alreadyGifted = gifted.includes(id);

    setGifted((prev) =>
      alreadyGifted ? prev.filter((v) => v !== id) : [...prev, id]
    );

    if (!alreadyGifted) {
      setVillagers((prev) =>
        prev.map((villager) =>
          villager.id === id
            ? { ...villager, friendship: villager.friendship + 3 }
            : villager
        )
      );
    }
  }

  const sortedVillagers = sortVillagersByPriority(
    villagers,
    talked,
    gifted
  );

  const filteredVillagers = sortedVillagers.filter((v) => {
    const matchesSearch = v.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesPersonality =
      personalityFilter === "" || v.personality === personalityFilter;

    return matchesSearch && matchesPersonality;
  });

  return (
    <main style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>Villager Friendship Tracker</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search villagers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px",
            marginRight: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        <select
          value={personalityFilter}
          onChange={(e) => setPersonalityFilter(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        >
          <option value="">All Personalities</option>
          <option value="Smug">Smug</option>
          <option value="Normal">Normal</option>
          <option value="Jock">Jock</option>
          <option value="Peppy">Peppy</option>
          <option value="Lazy">Lazy</option>
          <option value="Cranky">Cranky</option>
          <option value="Snooty">Snooty</option>
          <option value="Sisterly">Sisterly</option>
        </select>
      </div>

      {filteredVillagers.map((v) => (
        <div
          key={v.id}
          style={{
            marginBottom: "20px",
            padding: "15px",
            border: "1px solid #ccc",
            borderRadius: "10px",
          }}
        >
          <h3>{v.name}</h3>

          <p>
            {v.personality} • {v.species}
          </p>

          <p>Birthday: {v.birthday}</p>

          <p>Friendship: {v.friendship}</p>

          <p>Level: {getFriendshipLevel(v.friendship)}</p>

          <p>
            Photo Chance:{" "}
            {hasPhotoChance(v.friendship) ? "Possible ✓" : "Not yet"}
          </p>

          <button onClick={() => toggleTalk(v.id)}>
            {talked.includes(v.id) ? "Talked ✓" : "Talk Today"}
          </button>

          <button
            style={{ marginLeft: "10px" }}
            onClick={() => toggleGift(v.id)}
          >
            {gifted.includes(v.id) ? "Gifted ✓" : "Gift Today"}
          </button>
        </div>
      ))}
    </main>
  );
}