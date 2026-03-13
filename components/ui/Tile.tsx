import Link from "next/link";

type TileProps = {
  title: string;
  icon: string;
  href: string;
};

export default function Tile({ title, icon, href }: TileProps) {
  return (
    <Link href={href} className="tile">
      <span className="tile-icon">{icon}</span>
      <span className="tile-title">{title}</span>
    </Link>
  );
}