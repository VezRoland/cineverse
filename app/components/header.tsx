export const Header = ({
  title,
  description
}: {
  title: string,
  description: string
}) => {
  return (
    <header className="w-full max-w-4xl p-8">
      <h1 className="w-max py-2 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{title}</h1>
      <h2>{description}</h2>
    </header>
  )
}