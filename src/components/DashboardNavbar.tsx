import { NavLink } from 'react-router-dom'

const PAGES = [
  { path: '/air', label: 'Air' },
  { path: '/car', label: 'Car' },
  { path: '/hotel', label: 'Hotel' },
  { path: '/summary', label: 'Summary' },
  { path: '/data-hub', label: 'Data Hub' },
] as const

export function DashboardNavbar() {
  return (
    <nav className="relative flex h-14 w-full items-center justify-between bg-[#1e3a5f] px-6 shadow-md">
      {/* Subtle cityscape/pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='20' viewBox='0 0 60 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20v-5h5v5H0zm10 0v-8h5v8h-5zm10 0v-12h5v12h-5zm10 0v-6h5v6h-5zm10 0v-10h5v10h-5zm10 0v-15h5v15h-5z' fill='%23fff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="relative flex items-center gap-8">
        {PAGES.map(({ path, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `text-base font-semibold transition-colors ${
                isActive ? 'text-white' : 'text-white/80 hover:text-white'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>
      <div className="relative flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 4v16M4 8h16M4 16h16" strokeLinecap="round" />
          </svg>
        </div>
        <span className="text-sm font-medium text-white/95">connectionstravel group</span>
      </div>
    </nav>
  )
}
