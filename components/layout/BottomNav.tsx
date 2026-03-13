import Link from "next/link";

type NavItem = {
  href: string;
  label: string;
  icon: string;
};

const navItems: NavItem[] = [
  { href: "/", label: "Home", icon: "🏝" },
  { href: "/critters", label: "Critters", icon: "🐟" },
  { href: "/daily", label: "Daily", icon: "📅" },
  { href: "/friendship", label: "Villagers", icon: "👥" },
  { href: "/turnips", label: "Turnips", icon: "💰" },
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