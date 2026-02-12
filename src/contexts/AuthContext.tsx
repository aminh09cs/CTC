import { useMsal } from '@azure/msal-react'
import { InteractionStatus } from '@azure/msal-browser'
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react'
export interface AuthAccount {
  username: string
  name?: string
}

interface AuthContextType {
  account: AuthAccount | null
  isLoading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { instance, accounts, inProgress } = useMsal()
  const [account, setAccount] = useState<AuthAccount | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const activeAccount = instance.getActiveAccount()

    if (inProgress === InteractionStatus.None) {
      if (accounts.length > 0 && activeAccount) {
        setAccount({
          username: activeAccount.username,
          name:
            (activeAccount.idTokenClaims?.name as string) ??
            activeAccount.name ??
            activeAccount.username,
        })
      } else {
        setAccount(null)
      }
      setIsLoading(false)
    }
  }, [instance, accounts, inProgress])

  const contextValue = useMemo(
    () => ({
      account,
      isLoading,
      isAuthenticated: account != null,
    }),
    [account, isLoading]
  )

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
