import logoUrl from './lt-logo.svg'

type LtLogoProps = {
  compact?: boolean
}

/**
 * Shared L&T branding component used in both the login and dashboard shells.
 * The compact variant is intended for navigation areas with limited width.
 */
export function LtLogo({ compact = false }: LtLogoProps) {
  return (
    <div className={`lt-logo${compact ? ' lt-logo--compact' : ''}`} aria-label="Larsen & Toubro">
      <img className="lt-logo__image" src={logoUrl} alt="L&T logo" />
      {!compact && <span className="lt-logo__wordmark">Larsen &amp; Toubro</span>}
    </div>
  )
}
