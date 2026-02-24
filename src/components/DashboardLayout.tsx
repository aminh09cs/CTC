import { Outlet } from 'react-router-dom'
import { DashboardNavbar } from './DashboardNavbar'

export function DashboardLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
