import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMsal, UnauthenticatedTemplate } from '@azure/msal-react'
import { loginRequest } from '@/config/msal-auth-config'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'

export function Login() {
  const { account, isLoading } = useAuth()
  const { instance } = useMsal()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && account) {
      navigate('/', { replace: true })
    }
  }, [account, isLoading, navigate])

  const handleLogin = async () => {
    try {
      await instance.loginRedirect(loginRequest)
    } catch (error) {
      console.error('Login failed:', error)
    }
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

      <UnauthenticatedTemplate>
        <Button onClick={handleLogin} size="lg">
          Login
        </Button>
      </UnauthenticatedTemplate>
    </div>
  )
}
