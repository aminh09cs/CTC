/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AZURE_APP_CLIENT_ID: string
  readonly VITE_AZURE_APP_TENANT_ID: string
  readonly VITE_AZURE_APP_AUTHORITY?: string
  readonly VITE_APP_URL?: string
  readonly VITE_APP_REDIRECT_URI?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
