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

const FAKE_AUTH_KEY = 'ctc_fake_auth'

export interface AuthAccount {
  username: string
  name?: string
}

interface AuthContextType {
  account: AuthAccount | null
  isLoading: boolean
  isAuthenticated: boolean
  /** Only for fake auth: call to "log in" then navigate. TODO: remove when real MSAL is enabled. */
  loginFake: () => void
  /** Log out (clears fake session; TODO: use instance.logout when real MSAL). */
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

function getFakeAccountFromStorage(): AuthAccount | null {
  try {
    if (sessionStorage.getItem(FAKE_AUTH_KEY)) {
      return { username: 'fake@user', name: 'Fake User' }
    }
  } catch {
    /* ignore */
  }
  return null
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const { instance, accounts, inProgress } = useMsal()
  const [msalAccount, setMsalAccount] = useState<AuthAccount | null>(null)
  const [msalLoading, setMsalLoading] = useState(true)
  const [fakeAccount, setFakeAccount] = useState<AuthAccount | null>(getFakeAccountFromStorage)

  useEffect(() => {
    const activeAccount = instance.getActiveAccount()
    if (inProgress === InteractionStatus.None) {
      if (accounts.length > 0 && activeAccount) {
        setMsalAccount({
          username: activeAccount.username,
          name:
            (activeAccount.idTokenClaims?.name as string) ??
            activeAccount.name ??
            activeAccount.username,
        })
      } else {
        setMsalAccount(null)
      }
      setMsalLoading(false)
    }
  }, [instance, accounts, inProgress])

  const loginFake = () => {
    sessionStorage.setItem(FAKE_AUTH_KEY, '1')
    setFakeAccount({ username: 'fake@user', name: 'Fake User' })
  }

  const logout = () => {
    sessionStorage.removeItem(FAKE_AUTH_KEY)
    setFakeAccount(null)
    // TODO: When real MSAL is enabled, call instance.logout(...)
  }

  // TODO: When real MSAL is enabled, use msalAccount; for now prefer fake.
  const account = fakeAccount ?? msalAccount
  const isLoading = fakeAccount != null ? false : msalLoading

  const contextValue = useMemo(
    () => ({
      account,
      isLoading,
      isAuthenticated: account != null,
      loginFake,
      logout,
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
