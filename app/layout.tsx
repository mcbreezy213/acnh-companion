"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SettingsProvider } from "../context/SettingsContext";
import BottomNav from "../components/BottomNav";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isSetupPage = pathname === "/setup";

  return (
    <html lang="en">
      <body>
        <SettingsProvider>
          {!isSetupPage && (
            <nav
              style={{
                padding: "18px 24px",
                borderBottom: "1px solid var(--border)",
                background: "#edf7ef",
                display: "flex",
                gap: "14px",
                flexWrap: "wrap",
              }}
            >
              <Link href="/">Dashboard</Link>
              <Link href="/friendship">Friendship</Link>
              <Link href="/daily">Daily</Link>
              <Link href="/critters">Critters</Link>
              <Link href="/inventory">Inventory</Link>
              <Link href="/turnips">Turnips</Link>
              <Link href="/backup">Backup</Link>
              <Link href="/settings">Settings</Link>
            </nav>
          )}

          {children}

          {!isSetupPage && <BottomNav />}
        </SettingsProvider>
      </body>
    </html>
  );
}