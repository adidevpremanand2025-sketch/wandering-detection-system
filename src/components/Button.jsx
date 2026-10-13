/**
 * Button: the one call-to-action primitive. Renders an <a> when given `href`, otherwise a <button>.
 *
 *   variant  'solid' | 'outline'   magenta primary action, or secondary outlined sign
 *   tone     'default' | 'onTrust' on the page, or on the dark ink band
 *   size     'md' | 'lg'
 *
 * Shaped like a small sign (6px corners), not a pill. Only one solid button per view.
 * Focus ring comes from the global :focus-visible rule (the onTrust tone swaps its color).
 */
const BASE = 'inline-block rounded-card font-bold transition-colors'

const SIZE = {
  md: 'px-5 py-2.5',
  lg: 'px-7 py-3.5 text-lg',
}

const LOOK = {
  default: {
    solid: 'bg-stray text-on-stray hover:bg-ink hover:text-paper',
    outline: 'border-2 border-ink text-ink hover:bg-soft',
  },
  onTrust: {
    solid: 'bg-stray text-on-stray hover:bg-on-trust hover:text-trust focus-visible:outline-on-trust',
    outline: 'border-2 border-on-trust text-on-trust hover:bg-on-trust hover:text-trust focus-visible:outline-on-trust',
  },
}

export default function Button({ variant = 'solid', tone = 'default', size = 'md', className = '', href, children, ...rest }) {
  const cls = `${BASE} ${SIZE[size]} ${LOOK[tone][variant]} ${className}`.trim()
  if (href) return <a href={href} className={cls} {...rest}>{children}</a>
  return <button type="button" className={cls} {...rest}>{children}</button>
}
