import Image from "next/image";

type VillagerCardProps = {
  name: string;
  personality?: string;
  birthday?: string;
  species?: string;
  image?: string;
  talked?: boolean;
  gifted?: boolean;
  friendship?: number;
};

export default function VillagerCard({
  name,
  personality,
  birthday,
  species,
  image,
  talked = false,
  gifted = false,
  friendship = 0,
}: VillagerCardProps) {
  return (
    <section className="villager-card">
      <div className="villager-top">
        {image ? (
          <Image
            src={image}
            alt={name}
            width={72}
            height={72}
            className="villager-avatar"
          />
        ) : (
          <div className="villager-avatar placeholder">🍃</div>
        )}

        <div className="villager-info">
          <h3 className="villager-name">{name}</h3>
          <p className="villager-meta">{personality || "Unknown personality"}</p>
          <p className="villager-meta">{species || "Unknown species"}</p>
          <p className="villager-meta">{birthday || "Unknown birthday"}</p>
        </div>
      </div>

      <div className="villager-status">
        <span className={talked ? "status-pill done" : "status-pill"}>
          {talked ? "Talked ✓" : "Talk Today"}
        </span>

        <span className={gifted ? "status-pill done" : "status-pill"}>
          {gifted ? "Gifted ✓" : "Gift Today"}
        </span>
      </div>

      <div className="friendship-block">
        <div className="friendship-label-row">
          <span>Friendship</span>
          <span>{friendship}</span>
        </div>

        <div className="friendship-bar">
          <div
            className="friendship-fill"
            style={{ width: `${Math.max(0, Math.min(friendship, 100))}%` }}
          />
        </div>
      </div>
    </section>
  );
}