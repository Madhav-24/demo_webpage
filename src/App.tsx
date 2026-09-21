import { useState } from 'react'
import { DashboardPage } from './pages/Admin/dashboardpage'
import { LoginPage } from './pages/LoginPage'

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false)

  return isSignedIn ? <DashboardPage onLogout={() => setIsSignedIn(false)} /> : <LoginPage onLogin={() => setIsSignedIn(true)} />
}

export default App
