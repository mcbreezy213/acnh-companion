export default function Page({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="page">
      {title && <h1 className="page-title">{title}</h1>}
      <div className="page-content">{children}</div>
    </main>
  );
}