"use client";

import { useMemo, useState } from "react";

import Card from "@/components/ui/Card";
import { useSettings } from "@/context/SettingsContext";
import { critters } from "@/data/critters";
import {
  getAvailableNow,
  getLeavingThisMonth,
  getNewThisMonth,
} from "@/lib/game/critterFilters";
import {
  getCritterProgress,
  saveCritterProgress,
} from "@/lib/storage/crittersStorage";
import { formatCritterHours } from "@/lib/game/formatCritterHours";

type CritterTypeFilter = "all" | "fish" | "bug" | "sea";

function getCritterIcon(type: "fish" | "bug" | "sea") {
  if (type === "fish") return "🐟";
  if (type === "bug") return "🐞";
  return "🦀";
}

export default function CrittersPage() {
  const { settings } = useSettings();

  const [typeFilter, setTypeFilter] = useState<CritterTypeFilter>("all");
  const [search, setSearch] = useState("");

  const [progress, setProgress] = useState(() => {
    try {
      return getCritterProgress();
    } catch {
      return { caught: [], donated: [] };
    }
  });

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentHour = now.getHours();

  const filteredCritters = useMemo(() => {
    return critters.filter((critter) => {
      const matchesType =
        typeFilter === "all" ? true : critter.type === typeFilter;

      const matchesSearch = critter.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesType && matchesSearch;
    });
  }, [typeFilter, search]);

  const availableNow = useMemo(() => {
    return getAvailableNow(
      filteredCritters,
      settings.hemisphere,
      currentMonth,
      currentHour
    );
  }, [filteredCritters, settings.hemisphere, currentMonth, currentHour]);

  const newThisMonth = useMemo(() => {
    return getNewThisMonth(critters, settings.hemisphere, currentMonth);
  }, [settings.hemisphere, currentMonth]);

  const leavingThisMonth = useMemo(() => {
    return getLeavingThisMonth(critters, settings.hemisphere, currentMonth);
  }, [settings.hemisphere, currentMonth]);

  function toggleCaught(id: number) {
    const next = progress.caught.includes(id)
      ? progress.caught.filter((value) => value !== id)
      : [...progress.caught, id];

    const updated = { ...progress, caught: next };
    setProgress(updated);
    saveCritterProgress(updated);
  }

  function toggleDonated(id: number) {
    const next = progress.donated.includes(id)
      ? progress.donated.filter((value) => value !== id)
      : [...progress.donated, id];

    const updated = { ...progress, donated: next };
    setProgress(updated);
    saveCritterProgress(updated);
  }

  return (
    <main className="page-shell">
      <h1 className="page-title">Critter Tracker</h1>

      <Card title="Overview">
        <p>
          <strong>Available now:</strong> {availableNow.length}
        </p>
        <p>
          <strong>New this month:</strong> {newThisMonth.length}
        </p>
        <p>
          <strong>Leaving this month:</strong> {leavingThisMonth.length}
        </p>
      </Card>

      <Card title="Filters">
        <div className="grid gap-3">
          <input
            type="text"
            placeholder="Search critters..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={typeFilter}
            onChange={(e) =>
              setTypeFilter(e.target.value as CritterTypeFilter)
            }
          >
            <option value="all">All</option>
            <option value="fish">Fish</option>
            <option value="bug">Bugs</option>
            <option value="sea">Sea Creatures</option>
          </select>
        </div>
      </Card>

      <div className="grid gap-5">
        {filteredCritters.map((critter) => (
          <Card
            key={critter.id}
            title={`${getCritterIcon(critter.type)} ${critter.name}`}
          >
            <p>
              <strong>Type:</strong> {critter.type}
            </p>
            <p>
              <strong>Price:</strong> {critter.price}
            </p>
            <p>
              <strong>Location:</strong> {critter.location}
            </p>
            <p>
              <strong>Hours:</strong> {formatCritterHours(critter.hours)}
            </p>

            {critter.shadowSize ? (
              <p>
                <strong>Shadow Size:</strong> {critter.shadowSize}
              </p>
            ) : null}

            {critter.speed ? (
              <p>
                <strong>Speed:</strong> {critter.speed}
              </p>
            ) : null}

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button onClick={() => toggleCaught(critter.id)}>
                {progress.caught.includes(critter.id) ? "Caught ✓" : "Mark Caught"}
              </button>

              <button onClick={() => toggleDonated(critter.id)}>
                {progress.donated.includes(critter.id)
                  ? "Donated ✓"
                  : "Mark Donated"}
              </button>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}