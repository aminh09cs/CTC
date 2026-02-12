import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MsalAuthProvider } from '@/hooks/msal/auth'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MsalAuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MsalAuthProvider>
  </StrictMode>,
)
