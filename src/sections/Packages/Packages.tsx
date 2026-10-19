import { useRef } from 'react'
import { Icon } from '../../components/Icon/Icon'
import { useGsap } from '../../hooks/useGsap'
import { fadeUp } from '../../lib/motion'
import './Packages.css'

// Plan cards in the style of Wix and Shopify pricing pages. Prices depend on each
// project, so every package ends in a quote rather than a number.
const packages = [
  {
    name: 'Starter',
    for: 'For a new business that needs to be found',
    features: ['One-page website', 'Built for phones first', 'WhatsApp and call buttons', 'Enquiry form', 'Google-ready basics'],
  },
  {
    name: 'Business',
    for: 'For manufacturers, institutes and service companies',
    featured: true,
    features: [
      'Multi-page website',
      'Product, service or course pages',
      'Catalogue or price list',
      'Analytics and structured data',
      'Copy from your brochure, photos cleaned up',
    ],
  },
  {
    name: 'Online store',
    for: 'For brands that sell directly to customers',
    features: [
      'Everything in Business',
      'Cart, accounts and checkout',
      'Razorpay UPI and cards, plus cash on delivery',
      'Admin panel for stock and orders',
      'Order confirmation emails',
    ],
  },
]

export function Packages() {
  const root = useRef<HTMLElement>(null)

  useGsap(root, () => {
    fadeUp('.section-head > *', root.current)
    fadeUp('.package', '.packages', 0.1)
  })

  return (
    <section ref={root} className="section section-subtle" id="packages">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">Packages</span>
          <h2>Pick a starting point</h2>
          <p>Every business is different, so every quote is too. Choose what sounds closest and we&rsquo;ll tailor it to you.</p>
        </div>

        <div className="packages">
          {packages.map((p) => (
            <article key={p.name} className={p.featured ? 'package is-featured' : 'package'}>
              {p.featured && <span className="package-flag">Best for most businesses</span>}
              <h3>{p.name}</h3>
              <p className="package-for">{p.for}</p>
              <p className="package-price">
                Custom quote
                <small>Based on pages and features</small>
              </p>
              <a href="#contact" className={p.featured ? 'btn btn-primary' : 'btn btn-secondary'}>
                Get a quote
              </a>
              <ul>
                {p.features.map((f) => (
                  <li key={f}>
                    <Icon name="check" size={16} />
                    {f}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
