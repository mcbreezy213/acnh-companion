"use client";

import { useMemo, useState } from "react";

import Card from "@/components/ui/Card";
import { dailyTasks } from "@/data/dailyTasks";
import {
  getCompletedDailyTasks,
  saveCompletedDailyTasks,
} from "@/lib/storage/dailyStorage";

export default function DailyPlannerPage() {
  const [completedTaskIds, setCompletedTaskIds] = useState<number[]>(() => {
    try {
      return getCompletedDailyTasks();
    } catch {
      return [];
    }
  });

  function toggleTask(taskId: number) {
    const updated = completedTaskIds.includes(taskId)
      ? completedTaskIds.filter((id) => id !== taskId)
      : [...completedTaskIds, taskId];

    setCompletedTaskIds(updated);
    saveCompletedDailyTasks(updated);
  }

  const completedCount = completedTaskIds.length;
  const totalTasks = dailyTasks.length;

  const remainingTasks = useMemo(() => {
    return dailyTasks.filter((task) => !completedTaskIds.includes(task.id));
  }, [completedTaskIds]);

  return (
    <main className="page-shell">
      <h1 className="page-title">Daily Planner</h1>

      <div className="grid gap-5">
        <Card title="Daily Progress">
          <p>
            <strong>Completed:</strong> {completedCount} / {totalTasks}
          </p>
          <p>
            <strong>Remaining:</strong> {remainingTasks.length}
          </p>
        </Card>

        <Card title="Today's Tasks">
          {dailyTasks.length > 0 ? (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {dailyTasks.map((task) => {
                const isCompleted = completedTaskIds.includes(task.id);

                return (
                  <li
                    key={task.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "12px",
                      padding: "10px 0",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <span
                      style={{
                        textDecoration: isCompleted ? "line-through" : "none",
                        opacity: isCompleted ? 0.7 : 1,
                      }}
                    >
                      {task.name}
                    </span>

                    <button
                      type="button"
                      onClick={() => toggleTask(task.id)}
                    >
                      {isCompleted ? "Completed ✓" : "Mark Done"}
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>No daily tasks found.</p>
          )}
        </Card>
      </div>
    </main>
  );
}