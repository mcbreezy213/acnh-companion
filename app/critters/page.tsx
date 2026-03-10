"use client";

import { useSettings } from "../../context/SettingsContext";
import { critters } from "../../data/critters";
import {
  getAvailableNow,
  getLeavingThisMonth,
  getNewThisMonth,
} from "../../helpers/critterFilters";

export default function CrittersPage() {
  const { settings } = useSettings();

  const hemisphere = settings.hemisphere || "Northern";
  const currentMonth = new Date().getMonth() + 1;
  const currentHour = new Date().getHours();

  const availableNow = getAvailableNow(
    critters,
    hemisphere,
    currentMonth,
    currentHour
  );

  const newThisMonth = getNewThisMonth(critters, hemisphere, currentMonth);
  const leavingThisMonth = getLeavingThisMonth(
    critters,
    hemisphere,
    currentMonth
  );

  return (
    <main style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>Critters Guide</h1>

      <p>Hemisphere: {hemisphere}</p>

      <section style={{ marginTop: "30px" }}>
        <h2>Available Right Now</h2>
        {availableNow.length > 0 ? (
          availableNow.map((critter) => (
            <div
              key={critter.id}
              style={{
                marginBottom: "12px",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "10px",
              }}
            >
              <strong>{critter.name}</strong> ({critter.type})
            </div>
          ))
        ) : (
          <p>No critters available right now.</p>
        )}
      </section>

      <section style={{ marginTop: "30px" }}>
        <h2>New This Month</h2>
        {newThisMonth.length > 0 ? (
          newThisMonth.map((critter) => (
            <div
              key={critter.id}
              style={{
                marginBottom: "12px",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "10px",
              }}
            >
              <strong>{critter.name}</strong> ({critter.type})
            </div>
          ))
        ) : (
          <p>No new critters this month.</p>
        )}
      </section>

      <section style={{ marginTop: "30px" }}>
        <h2>Leaving After This Month</h2>
        {leavingThisMonth.length > 0 ? (
          leavingThisMonth.map((critter) => (
            <div
              key={critter.id}
              style={{
                marginBottom: "12px",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "10px",
              }}
            >
              <strong>{critter.name}</strong> ({critter.type})
            </div>
          ))
        ) : (
          <p>No critters leaving this month.</p>
        )}
      </section>
    </main>
  );
}