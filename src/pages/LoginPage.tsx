import { useState } from 'react'
import type { FormEvent } from 'react'
import { PasswordField } from '../components/PasswordField'
import { LtLogo } from '../logo/LtLogo'

type LoginPageProps = {
  onLogin: () => void
}

/**
 * Login screen for the monitoring application.
 *
 * Credentials are validated locally because this frontend currently has no
 * backend authentication integration; successful validation notifies the
 * application shell through the supplied callback.
 */
export function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  /** Validate the demo credentials and expose a user-facing error on failure. */
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (username === 'admin' && password === 'Admin') {
      // Let the application shell switch to the dashboard after validation.
      onLogin()
      return
    }
    setError('Please check your employee ID and password.')
  }

  return (
    <main className="login-page">
      <div className="login-page__backdrop" />
      <div className="login-page__wash" />
      <header className="site-header">
        <LtLogo compact />
        {/* <span className="site-header__tag">Digital Construction Command Centre</span> */}
      </header>

      <section className="login-card" aria-labelledby="login-title">
        <div className="login-card__intro">
          <LtLogo />
          {/* <p className="eyebrow">Operations intelligence platform</p> */}
          <h1 id="login-title">L&T AI Construction Monitoring</h1>
          {/* <p className="login-card__subtitle">See every project clearly. Act before it becomes a delay.</p> */}
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="username">Username / Employee ID</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Enter your employee ID"
              autoComplete="username"
              required
            />
          </div>
          <PasswordField value={password} onChange={setPassword} hasError={Boolean(error)} />
          <div className="form-row">
            {/* <span className="form-hint">Secure access for authorised personnel</span> */}
            <button className="forgot-link" type="button" onClick={() => setError('Contact your project administrator to reset access.')}>Forgot password?</button>
          </div>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="submit-button" type="submit">
            Let&apos;s go
            <span aria-hidden="true">&#8594;</span>
          </button>
        </form>
        <p className="login-card__footer">Protected by L&T Digital Security <span>•</span> v2.4.0</p>
      </section>

      <footer className="page-footer">© 2026 Larsen &amp; Toubro Limited <span>•</span> Built for the future of construction</footer>
    </main>
  )
}
