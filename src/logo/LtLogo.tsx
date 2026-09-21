import logoUrl from './lt-logo.svg'

type LtLogoProps = {
  compact?: boolean
}

export function LtLogo({ compact = false }: LtLogoProps) {
  return (
    <div className={`lt-logo${compact ? ' lt-logo--compact' : ''}`} aria-label="Larsen & Toubro">
      <img className="lt-logo__image" src={logoUrl} alt="L&T logo" />
      {!compact && <span className="lt-logo__wordmark">Larsen &amp; Toubro</span>}
    </div>
  )
}
