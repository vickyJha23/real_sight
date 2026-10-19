import { site, telHref } from '../../data/site'
import { Logo } from '../Logo/Logo'
import './Footer.css'

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo />
            <p>Custom websites for manufacturers, coaching institutes, brands and online stores across India.</p>
          </div>
          <div>
            <h3>Explore</h3>
            <a href="#work">Our work</a>
            <a href="#services">Services</a>
            <a href="#process">Process</a>
            <a href="#packages">Packages</a>
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact</a>
          </div>
          <div>
            <h3>Contact</h3>
            {site.phones.map((p) => (
              <a key={p} href={telHref(p)}>
                {p}
              </a>
            ))}
            <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {year} Real Sight. All rights reserved.</p>
          <p>{site.location}</p>
        </div>
      </div>
    </footer>
  )
}
