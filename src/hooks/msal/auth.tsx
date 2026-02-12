import { msalConfig } from '@/config/msal-auth-config'
import {
  type AuthenticationResult,
  EventType,
  PublicClientApplication,
} from '@azure/msal-browser'
import { MsalProvider } from '@azure/msal-react'
import { type ReactNode, useEffect, useState } from 'react'

interface MsalAuthProviderProps {
  children: ReactNode
}

export const msalInstance = new PublicClientApplication(msalConfig)

export function MsalAuthProvider({ children }: MsalAuthProviderProps) {
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    async function initMsal() {
      await msalInstance.initialize()

      if (
        !msalInstance.getActiveAccount() &&
        msalInstance.getAllAccounts().length > 0
      ) {
        msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0])
      }
      setInitialized(true)
    }
    initMsal()

    const callbackId = msalInstance.addEventCallback((event) => {
      const payload = event.payload as AuthenticationResult
      const account = payload?.account
      if (event.eventType === EventType.LOGIN_SUCCESS && account) {
        msalInstance.setActiveAccount(account)
      }
    })

    return () => {
      if (callbackId) msalInstance.removeEventCallback(callbackId)
    }
  }, [])

  if (!initialized) return null

  return <MsalProvider instance={msalInstance}>{children}</MsalProvider>
}
