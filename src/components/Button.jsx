/**
 * Button: the one call-to-action primitive. Renders an <a> when given `href`, otherwise a <button>.
 *
 *   variant  'solid' | 'outline'   lime action pill, or secondary outlined pill
 *   tone     'default' | 'onTrust' on the page, or on the dark `trust` band
 *   size     'md' | 'lg'
 *
 * Always a pill. Focus ring comes from the global :focus-visible rule (the onTrust tone swaps its color).
 */
const BASE = 'inline-block rounded-full font-semibold transition-colors'

const SIZE = {
  md: 'px-6 py-2.5',
  lg: 'px-8 py-4 text-lg',
}

const LOOK = {
  default: {
    solid: 'bg-lime text-on-lime hover:bg-trust hover:text-on-trust',
    outline: 'border border-ink text-ink hover:bg-soft',
  },
  onTrust: {
    solid: 'bg-lime text-on-lime hover:bg-on-trust hover:text-trust focus-visible:outline-on-trust',
    outline: 'border border-on-trust text-on-trust hover:bg-on-trust hover:text-trust focus-visible:outline-on-trust',
  },
}

export default function Button({ variant = 'solid', tone = 'default', size = 'md', className = '', href, children, ...rest }) {
  const cls = `${BASE} ${SIZE[size]} ${LOOK[tone][variant]} ${className}`.trim()
  if (href) return <a href={href} className={cls} {...rest}>{children}</a>
  return <button type="button" className={cls} {...rest}>{children}</button>
}
