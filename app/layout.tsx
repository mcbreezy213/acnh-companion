import "./globals.css";

import BottomNav from "@/components/layout/BottomNav";
import { SettingsProvider } from "@/context/SettingsContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SettingsProvider>
          <div className="app-shell">
            <main className="app-content">
              {children}
            </main>

            <BottomNav />
          </div>
        </SettingsProvider>
      </body>
    </html>
  );
}