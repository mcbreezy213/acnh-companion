type CardProps = {
  title: string;
  children: React.ReactNode;
};

export default function Card({ title, children }: CardProps) {
  return (
    <section className="soft-card">
      <h2 style={{ marginTop: 0, marginBottom: "14px", fontSize: "1.5rem" }}>
        {title}
      </h2>
      <div>{children}</div>
    </section>
  );
}