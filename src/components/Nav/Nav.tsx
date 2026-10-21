import { useEffect, useRef, useState } from 'react'
import { site, telHref } from '../../data/site'
import { useTheme } from '../../hooks/useTheme'
import { ScrollTrigger } from '../../lib/motion'
import { Icon } from '../Icon/Icon'
import { Logo } from '../Logo/Logo'
import './Nav.css'

const links = [
  { href: '#work', label: 'Work' },
  { href: '#services', label: 'Services' },
  { href: '#packages', label: 'Packages' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
]

export function Nav() {
  const [open, setOpen] = useState(false)
  const header = useRef<HTMLElement>(null)
  const close = () => setOpen(false)
  const { theme, toggle } = useTheme()

  // Add a border and backdrop once the page has scrolled.
  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 'top top',
      end: 'max',
      onUpdate: (self) => header.current?.classList.toggle('is-scrolled', self.scroll() > 8),
    })
    return () => st.kill()
  }, [])

  return (
    <header ref={header} className={open ? 'nav is-open' : 'nav'}>
      <div className="container nav-inner">
        <a href="#top" aria-label="Realsight home" onClick={close}>
          <Logo />
        </a>
        <nav id="nav-links" className="nav-links" aria-label="Main">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={close}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <a className="nav-phone" href={telHref(site.phones[0])}>
            {site.phones[0]}
          </a>
          <button
            className="nav-theme"
            onClick={toggle}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={18} />
          </button>
          <a href="#contact" className="btn btn-primary btn-sm" onClick={close}>
            Get a quote
          </a>
          <button className="nav-toggle" aria-expanded={open} aria-controls="nav-links" onClick={() => setOpen(!open)}>
            <span />
            <span />
            <span className="sr-only">Menu</span>
          </button>
        </div>
      </div>
    </header>
  )
}
