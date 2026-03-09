"use client"

import { useState } from "react"
import FriendshipBar from "../../components/FriendshipBar"
import { villagers as initialVillagers } from "../../data/villagers"
import { getFriendshipLevel, hasPhotoChance } from "../../helpers/friendshipLevel"

export default function FriendshipPage() {
  const [villagers, setVillagers] = useState(initialVillagers)

  function talkToVillager(id: number) {
    setVillagers((prev) =>
      prev.map((v) =>
        v.id === id ? { ...v, friendship: v.friendship + 1 } : v
      )
    )
  }

  function giftVillager(id: number) {
    setVillagers((prev) =>
      prev.map((v) =>
        v.id === id ? { ...v, friendship: v.friendship + 3 } : v
      )
    )
  }

  return (
    <main style={{ padding: "40px" }}>
      <h1 style={{ fontSize: "2.4rem", marginBottom: "30px" }}>
        Villager Friendship Tracker
      </h1>

      <div style={{ display: "grid", gap: "20px" }}>
        {villagers.map((v) => (
          <div
            key={v.id}
            style={{
              border: "1px solid var(--card-border)",
              borderRadius: "20px",
              background: "var(--card)",
              padding: "20px",
              boxShadow: "var(--shadow)",
            }}
          >
            <h2 style={{ margin: 0 }}>{v.name}</h2>

            <p style={{ color: "var(--muted)", marginTop: "4px" }}>
              {v.personality} • {v.species}
            </p>

            <p>Birthday: {v.birthday}</p>

            <div style={{ fontWeight: 600 }}>
              Friendship: {v.friendship}
            </div>

            {/* NEW LEAF PROGRESS BAR */}
            <FriendshipBar points={v.friendship} max={100} />

            <p>
              Level: {getFriendshipLevel(v.friendship)}
            </p>

            <p>
              Photo Chance:{" "}
              {hasPhotoChance(v.friendship) ? "Possible ✓" : "Not yet"}
            </p>

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button onClick={() => talkToVillager(v.id)}>
                Talk Today
              </button>

              <button onClick={() => giftVillager(v.id)}>
                Gift Today
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}