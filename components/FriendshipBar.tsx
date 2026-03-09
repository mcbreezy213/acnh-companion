type FriendshipBarProps = {
  points: number
  max?: number
}

export default function FriendshipBar({
  points,
  max = 100,
}: FriendshipBarProps) {
  const percent = Math.min((points / max) * 100, 100)

  return (
    <div style={{ marginTop: "10px", marginBottom: "14px" }}>
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "420px",
          height: "30px",
          background: "#f5ead7",
          border: "2px solid #d8c4a3",
          borderRadius: "999px",
          overflow: "hidden",
          boxShadow: "inset 0 2px 4px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            width: `${percent}%`,
            height: "100%",
            background:
              "linear-gradient(180deg,#b7e85f 0%,#8fd12f 55%,#76b723 100%)",
            borderRadius: "999px",
            transition: "width 0.25s ease",
          }}
        />

        {/* Leaf icon */}
        <div
          style={{
            position: "absolute",
            left: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "20px",
          }}
        >
          🍁
        </div>
      </div>

      <div
        style={{
          marginTop: "8px",
          display: "inline-block",
          padding: "6px 16px",
          borderRadius: "14px",
          background: "#f5ead7",
          border: "2px solid #d8c4a3",
          fontWeight: 700,
          color: "#5b3d1f",
          minWidth: "120px",
          textAlign: "center",
        }}
      >
        {points} / {max}
      </div>
    </div>
  )
}