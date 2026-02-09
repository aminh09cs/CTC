import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function About() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-3xl font-bold text-foreground">About CTC</h1>
      <p className="max-w-md text-center text-muted-foreground">
        React 19 application with Vite, Tailwind CSS, shadcn/ui, ESLint, Prettier and React Router.
        Chart.js can be added later for KPIs and dashboard.
      </p>
      <Button variant="secondary" asChild>
        <Link to="/">Home</Link>
      </Button>
    </div>
  )
}
