import Link from "next/link";

const navItems = [
  { href: "/", label: "Home", icon: "🏝" },
  { href: "/collections/critters", label: "Critters", icon: "🐟" },
  { href: "/planner/daily", label: "Daily", icon: "📅" },
  { href: "/villagers", label: "Villagers", icon: "👥" },
  { href: "/planner/turnips", label: "Turnips", icon: "💰" },
  { href: "/settings", label: "Settings", icon: "⚙" },
];

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <Link key={item.href} href={item.href} className="nav-item">
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-label">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}