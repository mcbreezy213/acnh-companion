"use client";

export default function BackupPage() {
  function exportData() {
    const data = {
      acnhSettings: localStorage.getItem("acnhSettings"),
      talkedVillagers: localStorage.getItem("talkedVillagers"),
      giftedVillagers: localStorage.getItem("giftedVillagers"),
      villagerFriendships: localStorage.getItem("villagerFriendships"),
      completedDailyTasks: localStorage.getItem("completedDailyTasks"),
      lastOpened: localStorage.getItem("lastOpened"),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "acnh-companion-backup.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function importData(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const data = JSON.parse(text);

        Object.entries(data).forEach(([key, value]) => {
          if (typeof value === "string") {
            localStorage.setItem(key, value);
          }
        });

        alert("Backup imported successfully! Refresh the app to see changes.");
      } catch {
        alert("Invalid backup file.");
      }
    };

    reader.readAsText(file);
  }

  return (
    <main style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>Backup & Restore</h1>

      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "12px",
          padding: "20px",
          maxWidth: "500px",
          marginTop: "20px",
        }}
      >
        <h2>Export Save Data</h2>
        <p>Download your companion app data as a JSON backup file.</p>
        <button
          onClick={exportData}
          style={{
            padding: "10px 16px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        >
          Export Backup
        </button>
      </div>

      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "12px",
          padding: "20px",
          maxWidth: "500px",
          marginTop: "20px",
        }}
      >
        <h2>Import Save Data</h2>
        <p>Restore a previously exported backup file.</p>
        <input type="file" accept=".json" onChange={importData} />
      </div>
    </main>
  );
}