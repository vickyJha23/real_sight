import logoDark from '../../assets/brand/logo-dark.webp'
import logoFull from '../../assets/brand/logo-full-dark.webp'
import logoLight from '../../assets/brand/logo-light.webp'
import './Logo.css'

/**
 * The Realsight logo. `compact` (nav) swaps between a light-theme and dark-theme
 * version, since "Real" is navy in the original; `full` adds the BUILD • DESIGN • GROW
 * tagline and is drawn for dark backgrounds (the footer is always dark).
 */
export function Logo({ variant = 'compact' }: { variant?: 'compact' | 'full' }) {
  if (variant === 'full') {
    return <img className="logo logo-full" src={logoFull} alt="Realsight: Build, Design, Grow" width={656} height={160} />
  }
  return (
    <span className="logo">
      <img className="logo-img logo-on-light" src={logoLight} alt="Realsight" width={459} height={112} />
      <img className="logo-img logo-on-dark" src={logoDark} alt="" aria-hidden="true" width={459} height={112} />
    </span>
  )
}
