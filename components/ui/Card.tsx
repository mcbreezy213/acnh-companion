export default function Card({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="card">
      {title && <h2 className="card-title">{title}</h2>}
      <div>{children}</div>
    </section>
  );
}