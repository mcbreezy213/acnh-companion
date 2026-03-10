"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SetupPage() {
  const router = useRouter();

  const [playerName, setPlayerName] = useState("");
  const [islandName, setIslandName] = useState("");
  const [hemisphere, setHemisphere] = useState("Northern");
  const [nativeFruit, setNativeFruit] = useState("Apple");

  useEffect(() => {
    const setupComplete = localStorage.getItem("setupComplete");

    if (setupComplete) {
      router.push("/");
    }
  }, [router]);

  function handleFinish() {
    const settings = {
      playerName,
      islandName,
      hemisphere,
      nativeFruit,
    };

    localStorage.setItem("acnhSettings", JSON.stringify(settings));
    localStorage.setItem("setupComplete", "true");

    router.push("/");
  }

  const canContinue =
    playerName.trim() !== "" &&
    islandName.trim() !== "" &&
    hemisphere.trim() !== "" &&
    nativeFruit.trim() !== "";

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        color: "var(--text)",
        padding: "40px 20px",
        fontFamily: "sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "560px",
          background: "var(--card)",
          border: "1px solid var(--card-border)",
          borderRadius: "24px",
          padding: "28px",
          boxShadow: "var(--shadow)",
        }}
      >
        <p
          style={{
            marginTop: 0,
            marginBottom: "8px",
            color: "var(--muted)",
            fontWeight: 600,
          }}
        >
          First-time setup
        </p>

        <h1 style={{ fontSize: "2.2rem", marginTop: 0, marginBottom: "10px" }}>
          Welcome to ACNH Companion
        </h1>

        <p style={{ marginTop: 0, marginBottom: "24px", color: "var(--muted)" }}>
          Set up your island details before entering the app.
        </p>

        <div style={{ display: "grid", gap: "16px" }}>
          <div>
            <label
              htmlFor="playerName"
              style={{ display: "block", marginBottom: "6px", fontWeight: 600 }}
            >
              Player name
            </label>
            <input
              id="playerName"
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter your player name"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "12px",
                border: "1px solid var(--card-border)",
                background: "white",
              }}
            />
          </div>

          <div>
            <label
              htmlFor="islandName"
              style={{ display: "block", marginBottom: "6px", fontWeight: 600 }}
            >
              Island name
            </label>
            <input
              id="islandName"
              type="text"
              value={islandName}
              onChange={(e) => setIslandName(e.target.value)}
              placeholder="Enter your island name"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "12px",
                border: "1px solid var(--card-border)",
                background: "white",
              }}
            />
          </div>

          <div>
            <label
              htmlFor="hemisphere"
              style={{ display: "block", marginBottom: "6px", fontWeight: 600 }}
            >
              Hemisphere
            </label>
            <select
              id="hemisphere"
              value={hemisphere}
              onChange={(e) => setHemisphere(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "12px",
                border: "1px solid var(--card-border)",
                background: "white",
              }}
            >
              <option value="Northern">Northern</option>
              <option value="Southern">Southern</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="nativeFruit"
              style={{ display: "block", marginBottom: "6px", fontWeight: 600 }}
            >
              Native fruit
            </label>
            <select
              id="nativeFruit"
              value={nativeFruit}
              onChange={(e) => setNativeFruit(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "12px",
                border: "1px solid var(--card-border)",
                background: "white",
              }}
            >
              <option value="Apple">Apple</option>
              <option value="Cherry">Cherry</option>
              <option value="Orange">Orange</option>
              <option value="Pear">Pear</option>
              <option value="Peach">Peach</option>
            </select>
          </div>
        </div>

        <div
          style={{
            marginTop: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <p style={{ margin: 0, color: "var(--muted)", fontSize: "0.95rem" }}>
            You can change these later in Settings.
          </p>

          <button
            onClick={handleFinish}
            disabled={!canContinue}
            style={{
              padding: "12px 18px",
              borderRadius: "14px",
              border: "none",
              background: canContinue ? "var(--accent)" : "#bfc8b8",
              color: canContinue ? "white" : "#5a6554",
              fontWeight: 700,
              cursor: canContinue ? "pointer" : "not-allowed",
            }}
          >
            Enter Island
          </button>
        </div>
      </div>
    </main>
  );
}