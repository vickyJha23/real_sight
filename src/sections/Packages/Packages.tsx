import { useRef } from 'react'
import { Icon } from '../../components/Icon/Icon'
import { useGsap } from '../../hooks/useGsap'
import { useTilt } from '../../hooks/useTilt'
import { fadeUp } from '../../lib/motion'
import './Packages.css'

// Plans, prices and add-ons match the Website Packages page of the company profile
// (public/realsight-catalogue.pdf). Update both together.
const packages = [
  {
    name: 'Static Website',
    for: 'For startups, small businesses and basic websites',
    price: '₹6,999',
    delivery: '5–7 days',
    features: [
      '4–5 pages',
      'Mobile responsive design',
      'Contact / enquiry form',
      'Google Maps integration',
      'Basic SEO setup',
      'Domain, hosting and SSL (1 year)',
      '1 revision',
    ],
  },
  {
    name: 'Static Professional',
    for: 'A better website for growing businesses',
    price: '₹11,999',
    delivery: '7–10 days',
    features: [
      '6–8 pages',
      'Custom design',
      'WhatsApp integration',
      'Contact form and Google Maps',
      'Image gallery',
      'Basic SEO setup',
      'Domain, hosting and SSL (1 year)',
      '2 revisions',
    ],
  },
  {
    name: 'Dynamic Business',
    for: 'Manage your content easily with an admin panel',
    price: '₹24,999',
    delivery: '10–15 days',
    featured: true,
    features: [
      '10–15 pages',
      'Custom design',
      'Admin panel to add and edit pages, images and content',
      'WhatsApp, contact form and Google Maps',
      'Basic SEO and analytics',
      'Domain, hosting and SSL (1 year)',
      '3 revisions',
    ],
  },
  {
    name: 'Dynamic Premium',
    for: 'Complete solution for enterprises and large organisations',
    price: '₹34,999',
    delivery: '15–20 days',
    features: [
      '15–25 pages',
      'Premium UI/UX design',
      'Advanced admin panel',
      'Product / service management',
      'Blog, news and events',
      'Lead generation, WhatsApp and live chat',
      'Advanced SEO, analytics and reporting',
      'Multi-language support (optional)',
      'Domain, hosting and SSL (1 year)',
      '4 revisions',
    ],
  },
]

const industries = [
  { name: 'School / Education', price: '₹6,999', plan: 'Static' },
  { name: 'Small Business', price: '₹6,999', plan: 'Static' },
  { name: 'Restaurant / Food', price: '₹6,999', plan: 'Static / Dynamic' },
  { name: 'Clinic / Doctor', price: '₹11,999', plan: 'Static / Dynamic' },
  { name: 'Real Estate', price: '₹11,999', plan: 'Dynamic' },
  { name: 'Manufacturer', price: '₹24,999', plan: 'Dynamic' },
  { name: 'NGO / Trust', price: '₹11,999', plan: 'Static / Dynamic' },
  { name: 'E-commerce', price: '₹24,999', plan: 'Dynamic' },
]

const addons = [
  { name: 'Extra page', price: '₹1,000 / page' },
  { name: 'Product catalogue', price: '₹2,000+' },
  { name: 'Booking system', price: '₹3,000+' },
  { name: 'Payment gateway', price: '₹3,000+' },
  { name: 'Basic chatbot', price: '₹3,000+' },
  { name: 'AI chatbot', price: '₹10,000+' },
  { name: 'Website maintenance', price: '₹1,000 / month' },
  { name: 'Basic SEO', price: '₹3,000 / month' },
  { name: 'SEO + Google Business', price: '₹5,000 / month' },
  { name: 'Photoshoot, video, custom features', price: 'On request' },
]

export function Packages() {
  const root = useRef<HTMLElement>(null)

  useGsap(root, () => {
    fadeUp('.section-head > *', root.current)
    fadeUp('.package', '.packages', 0.1)
    fadeUp('.pricing-extra', root.current, 0.1)
  })
  useTilt(root, '.package', 6)

  return (
    <section ref={root} className="section section-subtle" id="packages">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">Packages</span>
          <h2>Simple, transparent pricing</h2>
          <p>Choose the plan that fits your business. No hidden charges, and domain, hosting and SSL for the first year are included.</p>
          <a href="/realsight-catalogue.pdf" className="btn btn-secondary" download>
            <Icon name="catalog" size={16} />
            Download our catalogue (PDF)
          </a>
        </div>

        <div className="packages">
          {packages.map((p) => (
            <article key={p.name} className={p.featured ? 'package is-featured' : 'package'}>
              {p.featured && <span className="package-flag">Most popular</span>}
              <h3>{p.name}</h3>
              <p className="package-for">{p.for}</p>
              <p className="package-price">
                {p.price}
                <small>Delivery in {p.delivery}</small>
              </p>
              <a href="#contact" className={p.featured ? 'btn btn-primary' : 'btn btn-secondary'}>
                Get started
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

        <div className="pricing-extra">
          <h3>Starting prices by industry</h3>
          <ul className="industries">
            {industries.map((i) => (
              <li key={i.name}>
                <span>{i.name}</span>
                <strong>{i.price}</strong>
                <small>{i.plan}</small>
              </li>
            ))}
          </ul>
        </div>

        <div className="pricing-extra">
          <h3>Additional services</h3>
          <ul className="addons">
            {addons.map((a) => (
              <li key={a.name}>
                <span>{a.name}</span>
                <strong>{a.price}</strong>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
