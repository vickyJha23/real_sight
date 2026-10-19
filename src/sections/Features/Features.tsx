import { useRef, type ReactNode } from 'react'
import { Icon } from '../../components/Icon/Icon'
import { useGsap } from '../../hooks/useGsap'
import { gsap } from '../../lib/motion'
import { DesignVisual, SearchVisual, StoreVisual, WhatsAppVisual } from './visuals'
import './Features.css'

interface Feature {
  eyebrow: string
  title: string
  body: string
  points: string[]
  visual: ReactNode
}

const features: Feature[] = [
  {
    eyebrow: 'Design',
    title: 'A website that looks as good as your business',
    body: 'Custom designs in your brand colours, built for phones first. We turn your brochure into clear website copy and clean up your product photos.',
    points: ['Designed from scratch, never a template', 'Looks right on every phone and laptop', 'Copy written from your brochure, photos cleaned up'],
    visual: <DesignVisual />,
  },
  {
    eyebrow: 'Sell online',
    title: 'Take orders and payments, day and night',
    body: 'A complete online store with cart, customer accounts and checkout, plus an admin panel to manage stock and orders yourself.',
    points: ['UPI and card payments through Razorpay, plus cash on delivery', 'Stock tracked per size', 'Order emails and a sales dashboard'],
    visual: <StoreVisual />,
  },
  {
    eyebrow: 'Enquiries',
    title: 'Turn visitors into WhatsApp enquiries',
    body: 'Many customers would rather message than fill in a form. Every page we build makes it one tap to reach you.',
    points: ['WhatsApp and call buttons on every page', 'Forms that arrive as a ready-written WhatsApp message', 'Dealer, distributor and bulk-order forms'],
    visual: <WhatsAppVisual />,
  },
  {
    eyebrow: 'Get found',
    title: 'Built for Google from day one',
    body: 'Pages that search engines can read, with the right titles, descriptions and structured data, plus analytics so you can see who visits.',
    points: ['Search-ready titles, descriptions and sitemaps', 'Google Analytics set up for you', 'Domain, hosting and SSL handled at launch'],
    visual: <SearchVisual />,
  },
]

export function Features() {
  const root = useRef<HTMLElement>(null)

  useGsap(root, () => {
    gsap.utils.toArray<HTMLElement>('.feature').forEach((f) => {
      gsap.from(f.querySelectorAll('.feature-copy > *'), { y: 24, opacity: 0, stagger: 0.07, scrollTrigger: { trigger: f, start: 'top 80%' } })
      gsap.from(f.querySelector('.feature-visual'), { y: 40, opacity: 0, duration: 1, scrollTrigger: { trigger: f, start: 'top 80%' } })
    })
  })

  return (
    <section ref={root} className="section" id="services">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">Services</span>
          <h2>Everything your business needs online</h2>
          <p>Design, selling, enquiries and search, handled by one team so nothing falls through the cracks.</p>
        </div>

        <div className="features">
          {features.map((f) => (
            <article key={f.title} className="feature">
              <div className="feature-copy">
                <span className="eyebrow">{f.eyebrow}</span>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
                <ul>
                  {f.points.map((pt) => (
                    <li key={pt}>
                      <span className="feature-check">
                        <Icon name="check" size={14} />
                      </span>
                      {pt}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className="feature-link">
                  Talk to us about this <span aria-hidden="true">→</span>
                </a>
              </div>
              <div className="feature-visual">{f.visual}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
