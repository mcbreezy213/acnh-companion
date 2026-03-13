type CardProps = {
  title?: string
  children: React.ReactNode
}

export default function Card({ title, children }: CardProps) {
  return (
    <div className="rounded-xl border p-4 shadow-sm bg-white">
      {title && (
        <h2 className="text-lg font-semibold mb-2">
          {title}
        </h2>
      )}
      {children}
    </div>
  )
}