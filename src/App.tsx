import { useState } from 'react'
import { DashboardPage } from './pages/Admin/dashboardpage'
import { LoginPage } from './pages/LoginPage'

/**
 * Application shell that switches between the login experience and the
 * protected dashboard view for this client-side demonstration.
 */
function App() {
  // Keep authentication state at the application boundary so both pages
  // receive only the transition callbacks they need.
  const [isSignedIn, setIsSignedIn] = useState(false)

  return isSignedIn ? <DashboardPage onLogout={() => setIsSignedIn(false)} /> : <LoginPage onLogin={() => setIsSignedIn(true)} />
}

export default App
