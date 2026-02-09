import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-3xl font-bold text-foreground">CTC</h1>
      <p className="text-muted-foreground">
        React 19 + Vite + Tailwind + shadcn/ui + React Router
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link to="/about">About</Link>
        </Button>
        <Button variant="outline" asChild>
          <a href="https://ui.shadcn.com" target="_blank" rel="noreferrer">
            shadcn/ui
          </a>
        </Button>
      </div>
    </div>
  )
}
