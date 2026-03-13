import Image from "next/image";

type VillagerCardProps = {
  name: string;
  personality?: string;
  birthday?: string;
  image?: string;
};

export default function VillagerCard({
  name,
  personality,
  birthday,
  image
}: VillagerCardProps) {
  return (
    <div className="card villager-card">

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
        <h3>{name}</h3>
        {personality && <p>{personality}</p>}
        {birthday && <p>{birthday}</p>}
      </div>

    </div>
  );
}