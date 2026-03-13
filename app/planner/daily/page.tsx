"use client";

import { useEffect, useState } from "react";
import { dailyTasks } from "../../data/dailyTasks";
import { shouldResetDaily } from "../../utils/dailyReset";

export default function DailyPage() {
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem("completedDailyTasks");

    if (savedTasks) {
      setCompletedTasks(JSON.parse(savedTasks));
    }

    if (shouldResetDaily()) {
      setCompletedTasks([]);
      localStorage.setItem("completedDailyTasks", JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("completedDailyTasks", JSON.stringify(completedTasks));
  }, [completedTasks]);

  function toggleTask(id: number) {
    setCompletedTasks((prev) =>
      prev.includes(id) ? prev.filter((taskId) => taskId !== id) : [...prev, id]
    );
  }

  return (
    <main style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>Daily Island Tasks</h1>

      {dailyTasks.map((task) => (
        <div
          key={task.id}
          style={{
            marginBottom: "15px",
            padding: "15px",
            border: "1px solid #ccc",
            borderRadius: "10px",
          }}
        >
          <button onClick={() => toggleTask(task.id)}>
            {completedTasks.includes(task.id) ? "✓" : "☐"}
          </button>

          <span style={{ marginLeft: "10px" }}>{task.name}</span>
        </div>
      ))}
    </main>
  );
}