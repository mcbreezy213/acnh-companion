type CardProps = {
  title: string;
  children: React.ReactNode;
};

export default function Card({ title, children }: CardProps) {
  return (
    <div
      style={{
        border: "1px solid var(--card-border)",
        borderRadius: "20px",
        padding: "22px",
        marginTop: "20px",
        background: "var(--card)",
        boxShadow: "var(--shadow)",
      }}
    >
      <h2
        style={{
          marginTop: 0,
          marginBottom: "14px",
          fontSize: "1.2rem",
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}