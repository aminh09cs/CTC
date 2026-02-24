import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'

export function Login() {
  const { account, isLoading, loginFake } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && account) {
      navigate('/', { replace: true })
    }
  }, [account, isLoading, navigate])

  const handleLogin = () => {
    // TODO: When real MSAL is enabled, call instance.loginRedirect(loginRequest)
    loginFake()
    navigate('/', { replace: true })
  }

  if (isLoading || account) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-3xl font-bold text-foreground">CTC</h1>
      <p className="text-muted-foreground">Sign in with your account</p>
      <Button onClick={handleLogin} size="lg">
        Login
      </Button>
    </div>
  )
}
