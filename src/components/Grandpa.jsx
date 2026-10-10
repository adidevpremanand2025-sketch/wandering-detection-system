/**
 * Grandpa: the project's mascot, the team's own reference illustration cut out as a circle
 * (public/images/grandpa.png). It already includes the lime disc and its outline, so place it
 * directly; do not wrap it in another disc.
 *
 * Replace the file with a higher-resolution export of the same illustration at any time.
 */
export const GRANDPA_SRC = '/images/grandpa.png'

export default function Grandpa({ className = '', title }) {
  return (
    <img
      src={GRANDPA_SRC}
      alt={title || ''}
      aria-hidden={title ? undefined : 'true'}
      width="858"
      height="858"
      decoding="async"
      className={className}
    />
  )
}
