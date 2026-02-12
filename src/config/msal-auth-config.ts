const tenantId = import.meta.env.VITE_AZURE_APP_TENANT_ID ?? ''
const baseUrl = import.meta.env.VITE_APP_URL ?? 'http://localhost:5173'

export const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_APP_CLIENT_ID ?? '',
    authority:
      (import.meta.env.VITE_AZURE_APP_AUTHORITY as string | undefined) ??
      `https://login.microsoftonline.com/${tenantId || 'common'}/v2.0`,
    postLogoutRedirectUri: baseUrl,
    redirectUri: (import.meta.env.VITE_APP_REDIRECT_URI as string | undefined) ?? `${baseUrl}/login`,
  },
  cache: {
    cacheLocation: 'localStorage' as const,
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {},
  },
}

export const loginRequest = {
  scopes: ['openid', 'profile', 'offline_access'],
}
