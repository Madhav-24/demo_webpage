type NavIconProps = {
  name: string
}

/** Selects the small inline SVG used by a dashboard navigation item. */
export function NavIcon({ name }: NavIconProps) {
  if (name === 'Dashboard') {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" /></svg>
  }

  if (name === 'Camera') {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8.5h3l1.4-2h7.2l1.4 2h3v10H4v-10Z" /><circle cx="12" cy="13.5" r="3" /></svg>
  }

  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
}
