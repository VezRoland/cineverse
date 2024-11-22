import type { MetaFunction } from "@remix-run/node"

export const meta: MetaFunction = () => {
  return [
    { title: "Cineverse" },
    { name: "description", content: "Welcome to Cineverse!" },
  ]
}

export default function Index() {
  return (
    <main className="h-full">
      <h1>Cineverse</h1>
    </main>
  )
}