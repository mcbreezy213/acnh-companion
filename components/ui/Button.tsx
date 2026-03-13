export default function Button({
  children,
  onClick,
  type = "button",
}: {
  children: React.ReactNode
  onClick?: () => void
  type?: "button" | "submit"
}) {
  return (
    <button className="btn" onClick={onClick} type={type}>
      {children}
    </button>
  );
}