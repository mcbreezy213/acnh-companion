"use client";

import { useEffect, useMemo, useState } from "react";
import { useSettings } from "../../context/SettingsContext";
import { critters } from "../../data/critters";
import {
  getAvailableNow,
  getLeavingThisMonth,
  getNewThisMonth,
} from "../../helpers/critterFilters";

type CritterTypeFilter = "all" | "fish" | "bug" | "sea";

function getCritterIcon(type: "fish" | "bug" | "sea") {
  if (type === "fish") return "🐟";
  if (type === "bug") return "🐞";
  return "🦀";
}

function formatHour(hour: number): string {
  const suffix = hour >= 12 ? "PM" : "AM";
  const normalized = hour % 12 === 0 ? 12 : hour % 12;
  return `${normalized}${suffix}`;
}

function formatCritterHours(hours: number[]): string {
  if (hours.length === 24) return "All day";
  if (hours.length === 0) return "Unknown";

  const sorted = [...hours].sort((a, b) => a - b);
  const start = sorted[0];
  const end = sorted[sorted.length - 1];

  return `${formatHour(start)} – ${formatHour(end)}`;
}

function badgeStyle(background: string) {
  return {
    padding: "6px 10px",
    borderRadius: "999px",
    background,
    border: "1px solid var(--border)",
    fontSize: "0.9rem",
  } as const;
}

export default function CrittersPage() {
  const { settings } = useSettings();

  const hemisphere = settings.hemisphere || "Northern";
  const currentMonth = new Date().getMonth() + 1;
  const currentHour = new Date().getHours();

  const [typeFilter, setTypeFilter] = useState<CritterTypeFilter>("all");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [search, setSearch] = useState("");

  const [caught, setCaught] = useState<number[]>([]);
  const [donated, setDonated] = useState<number[]>([]);

  useEffect(() => {
    const savedCaught = localStorage.getItem("caughtCritters");
    const savedDonated = localStorage.getItem("donatedCritters");

    if (savedCaught) {
      try {
        setCaught(JSON.parse(savedCaught));
      } catch {
        localStorage.removeItem("caughtCritters");
      }
    }

    if (savedDonated) {
      try {
        setDonated(JSON.parse(savedDonated));
      } catch {
        localStorage.removeItem("donatedCritters");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("caughtCritters", JSON.stringify(caught));
  }, [caught]);

  useEffect(() => {
    localStorage.setItem("donatedCritters", JSON.stringify(donated));
  }, [donated]);

  function toggleCaught(id: number) {
    setCaught((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  function toggleDonated(id: number) {
    setDonated((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  const availableNow = useMemo(
    () => getAvailableNow(critters, hemisphere, currentMonth, currentHour),
    [hemisphere, currentMonth, currentHour]
  );

  const newThisMonth = useMemo(
    () => getNewThisMonth(critters, hemisphere, currentMonth),
    [hemisphere, currentMonth]
  );

  const leavingThisMonth = useMemo(
    () => getLeavingThisMonth(critters, hemisphere, currentMonth),
    [hemisphere, currentMonth]
  );

  const availableNowIds = new Set(availableNow.map((c) => c.id));
  const newThisMonthIds = new Set(newThisMonth.map((c) => c.id));
  const leavingThisMonthIds = new Set(leavingThisMonth.map((c) => c.id));

  const filteredCritters = critters.filter((critter) => {
    const matchesType =
      typeFilter === "all" ? true : critter.type === typeFilter;

    const matchesSearch = critter.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesAvailable = showAvailableOnly
      ? availableNowIds.has(critter.id)
      : true;

    return matchesType && matchesSearch && matchesAvailable;
  });

  const caughtCount = caught.length;
  const donatedCount = donated.length;
  const totalCritters = critters.length;

  return (
    <main>
      <h1>Critters Guide</h1>

      <div
        className="card"
        style={{
          marginBottom: "20px",
          display: "grid",
          gap: "14px",
        }}
      >
        <p style={{ margin: 0 }}>
          <strong>Hemisphere:</strong> {hemisphere}
        </p>

        <p style={{ margin: 0 }}>
          <strong>Caught:</strong> {caughtCount} / {totalCritters}
        </p>

        <p style={{ margin: 0 }}>
          <strong>Donated:</strong> {donatedCount} / {totalCritters}
        </p>

        <input
          type="text"
          placeholder="Search critters..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button onClick={() => setTypeFilter("all")}>All</button>
          <button onClick={() => setTypeFilter("fish")}>🐟 Fish</button>
          <button onClick={() => setTypeFilter("bug")}>🐞 Bugs</button>
          <button onClick={() => setTypeFilter("sea")}>🦀 Sea</button>
          <button onClick={() => setShowAvailableOnly((prev) => !prev)}>
            {showAvailableOnly ? "Show All" : "Available Now Only"}
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gap: "20px" }}>
        {filteredCritters.map((critter) => {
          const isAvailable = availableNowIds.has(critter.id);
          const isNew = newThisMonthIds.has(critter.id);
          const isLeaving = leavingThisMonthIds.has(critter.id);
          const isCaught = caught.includes(critter.id);
          const isDonated = donated.includes(critter.id);

          return (
            <div
              key={critter.id}
              className="card"
              style={{
                border: isAvailable
                  ? "2px solid var(--accent)"
                  : "1px solid var(--border)",
                opacity: isDonated ? 0.82 : 1,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "12px",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <h2 style={{ marginBottom: "8px" }}>
                    {getCritterIcon(critter.type)} {critter.name}
                  </h2>

                  <p style={{ margin: "0 0 6px 0", color: "var(--muted)" }}>
                    {critter.type} • {critter.location}
                  </p>

                  <p style={{ margin: "0 0 6px 0" }}>
                    <strong>Price:</strong> {critter.price.toLocaleString()} bells
                  </p>

                  <p style={{ margin: 0 }}>
                    <strong>Time:</strong> {formatCritterHours(critter.hours)}
                  </p>
                </div>

                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {isAvailable && (
                    <span style={badgeStyle("#e7f5ea")}>Available now</span>
                  )}

                  {isNew && (
                    <span style={badgeStyle("#eef4ff")}>New this month</span>
                  )}

                  {isLeaving && (
                    <span style={badgeStyle("#fff4e8")}>Leaving soon</span>
                  )}
                </div>
              </div>

              <div
                style={{
                  marginTop: "16px",
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                <button onClick={() => toggleCaught(critter.id)}>
                  {isCaught ? "Caught ✓" : "Mark Caught"}
                </button>

                <button onClick={() => toggleDonated(critter.id)}>
                  {isDonated ? "Donated ✓" : "Mark Donated"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}