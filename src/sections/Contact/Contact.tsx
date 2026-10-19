import { useRef, useState, type FormEvent } from 'react'
import { Icon } from '../../components/Icon/Icon'
import { site, telHref } from '../../data/site'
import { useGsap } from '../../hooks/useGsap'
import { fadeUp } from '../../lib/motion'
import './Contact.css'

function whatsappMessage(form: HTMLFormElement) {
  const data = new FormData(form)
  return [
    `Hi Real Sight, I'd like a website.`,
    `Name: ${data.get('name')}`,
    `Business: ${data.get('business')}`,
    `Phone: ${data.get('phone')}`,
    `About the project: ${data.get('message')}`,
  ].join('\n')
}

export function Contact() {
  const root = useRef<HTMLElement>(null)
  const [sent, setSent] = useState(false)

  useGsap(root, () => {
    fadeUp('.contact-info > *, .contact-form', root.current, 0.06)
  })

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const text = whatsappMessage(e.currentTarget)
    window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
    setSent(true)
  }

  return (
    <section ref={root} className="section" id="contact">
      <div className="container">
        <div className="contact">
          <div className="contact-info">
            <span className="eyebrow">Contact</span>
            <h2>Let&rsquo;s build your website</h2>
            <p>Tell us a little about your business. We&rsquo;ll reply with ideas, a timeline and a clear quote, with no obligation.</p>

            <ul className="contact-list">
              <li>
                <span className="contact-icon">
                  <Icon name="phone" />
                </span>
                <div>
                  <small>Call us</small>
                  {site.phones.map((p) => (
                    <a key={p} href={telHref(p)}>
                      {p}
                    </a>
                  ))}
                </div>
              </li>
              <li>
                <span className="contact-icon">
                  <Icon name="whatsapp" />
                </span>
                <div>
                  <small>WhatsApp</small>
                  <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer">
                    {site.whatsappDisplay}
                  </a>
                </div>
              </li>
              <li>
                <span className="contact-icon">
                  <Icon name="mail" />
                </span>
                <div>
                  <small>Email</small>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </div>
              </li>
              <li>
                <span className="contact-icon">
                  <Icon name="pin" />
                </span>
                <div>
                  <small>Location</small>
                  <span>{site.location}</span>
                </div>
              </li>
            </ul>
          </div>

          <form className="contact-form" onSubmit={onSubmit}>
            <h3>Send us a message</h3>
            <div className="form-row">
              <label>
                Your name
                <input name="name" required autoComplete="name" placeholder="Full name" />
              </label>
              <label>
                Phone
                <input name="phone" type="tel" required autoComplete="tel" inputMode="tel" placeholder="+91" />
              </label>
            </div>
            <label>
              Business name
              <input name="business" autoComplete="organization" placeholder="Your company" />
            </label>
            <label>
              What do you need?
              <textarea name="message" rows={4} placeholder="e.g. A product catalogue site with WhatsApp enquiries" />
            </label>
            <button className="btn btn-primary" type="submit">
              Send on WhatsApp <span className="arrow">→</span>
            </button>
            {sent ? (
              <p className="form-note">Thanks! WhatsApp should have opened with your message ready to send.</p>
            ) : (
              <p className="form-note">Opens WhatsApp with your message filled in. Nothing is stored on this site.</p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
