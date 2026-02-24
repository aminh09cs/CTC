import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
// TODO: Will open when has authen
// import { ProtectedRoute } from '@/components/ProtectedRoute'
import { DashboardLayout } from '@/components/DashboardLayout'
import { Air } from '@/pages/Air'
import { Car } from '@/pages/Car'
import { Hotel } from '@/pages/Hotel'
import { Summary } from '@/pages/Summary'
import { DataHub } from '@/pages/DataHub'
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/summary" replace />} />
          <Route path="air" element={<Air />} />
          <Route path="car" element={<Car />} />
          <Route path="hotel" element={<Hotel />} />
          <Route path="summary" element={<Summary />} />
          <Route path="data-hub" element={<DataHub />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
