import { Link } from 'react-router-dom'
import { useMsal } from '@azure/msal-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'

export function Home() {
  const { instance } = useMsal()
  const { account } = useAuth()

  const handleLogout = async () => {
    try {
      await instance.logout({ onRedirectNavigate: () => false })
      window.location.href = '/login'
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-3xl font-bold text-foreground">CTC</h1>
      <p className="text-muted-foreground">
        React 19 + Vite + Tailwind + shadcn/ui + React Router
      </p>
      {account && (
        <p className="text-sm text-muted-foreground">
          Signed in as <span className="font-medium text-foreground">{account.name ?? account.username}</span>
        </p>
      )}
      <div className="flex flex-wrap justify-center gap-4">
        <Button asChild>
          <Link to="/about">About</Link>
        </Button>
        <Button variant="outline" asChild>
          <a href="https://ui.shadcn.com" target="_blank" rel="noreferrer">
            shadcn/ui
          </a>
        </Button>
        {account && (
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </div>
    </div>
  )
}
