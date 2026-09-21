import { useState } from 'react'

type PasswordFieldProps = {
  value: string
  onChange: (value: string) => void
  hasError?: boolean
}

export function PasswordField({ value, onChange, hasError = false }: PasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className={`field${hasError ? ' field--error' : ''}`}>
      <label htmlFor="password">Password</label>
      <div className="password-input">
        <input
          id="password"
          type={isVisible ? 'text' : 'password'}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Enter your password"
          autoComplete="current-password"
          aria-invalid={hasError}
          required
        />
        <button
          className="password-input__toggle"
          type="button"
          onClick={() => setIsVisible((visible) => !visible)}
          aria-label={isVisible ? 'Hide password' : 'Show password'}
        >
          {isVisible ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
    </div>
  )
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M2.5 12s3.2-5 9.5-5 9.5 5 9.5 5-3.2 5-9.5 5-9.5-5-9.5-5Z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  )
}

function EyeOffIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m3 3 18 18M10.6 6.1A10.8 10.8 0 0 1 12 6c6.3 0 9.5 6 9.5 6a16 16 0 0 1-3.2 3.5M6.3 6.8C3.8 8.1 2.5 12 2.5 12s3.2 6 9.5 6a9.8 9.8 0 0 0 3.2-.5" />
    </svg>
  )
}
