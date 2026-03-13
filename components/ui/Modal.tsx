import Link from "next/link";

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      <Link href="/">🏝 Home</Link>
      <Link href="/critters">🐟 Critters</Link>
      <Link href="/daily">📅 Daily</Link>
      <Link href="/friendship">👥 Villagers</Link>
      <Link href="/turnips">💰 Turnips</Link>
      <Link href="/settings">⚙ Settings</Link>
    </nav>
  );
}