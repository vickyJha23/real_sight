import { useEffect, useRef, useState } from 'react'
import { site } from '../../data/site'
import { useGsap } from '../../hooks/useGsap'
import { fadeUp, ScrollTrigger } from '../../lib/motion'
import './Faq.css'

const faqs = [
  {
    q: 'How much does a website cost?',
    a: 'Plans start at ₹6,999 for a 4–5 page static website and go up to ₹34,999 for a 15–25 page dynamic website with an advanced admin panel. Domain, hosting and SSL for the first year are included. See the pricing section above or download our catalogue for the full list.',
  },
  {
    q: 'What do I need to give you to get started?',
    a: 'Your logo, a brochure or price list, and some product or workplace photos. We write the website copy from your brochure and clean up the photos, so you don’t need to prepare text.',
  },
  {
    q: 'Will my website work on mobile phones?',
    a: 'Yes. Every site is designed for phones first and then checked on laptops and tablets, since many visitors arrive on a phone.',
  },
  {
    q: 'Can customers contact me on WhatsApp from the website?',
    a: 'Yes. We add WhatsApp and call buttons to every page, and enquiry forms can arrive as a ready-written WhatsApp message.',
  },
  {
    q: 'Can you build an online store with payments?',
    a: 'Yes. We build stores with a cart, customer accounts and checkout, taking UPI and card payments through Razorpay as well as cash on delivery, with an admin panel to manage stock and orders.',
  },
  {
    q: 'Will my website show up on Google?',
    a: 'We build every page so search engines can read it, with proper titles, descriptions, sitemaps and structured data, and set up analytics. Where you rank also depends on your competition, so nobody can honestly guarantee a position.',
  },
  {
    q: 'Do you take care of the domain and hosting?',
    a: 'Yes. We connect your domain, set up hosting and SSL, and stay available for updates after launch.',
  },
]

// FAQPage structured data, built from the same list so it always matches the page.
const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
})

export function Faq() {
  const root = useRef<HTMLElement>(null)
  const [open, setOpen] = useState(0)

  useGsap(root, () => {
    fadeUp('.faq-intro > *, .faq-item', root.current, 0.05)
  })

  // Opening an answer changes the page height; re-measure scroll triggers after the transition.
  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 400)
    return () => clearTimeout(t)
  }, [open])

  return (
    <section ref={root} className="section" id="faq">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <div className="container faq">
        <div className="faq-intro">
          <span className="eyebrow">FAQ</span>
          <h2>Questions, answered</h2>
          <p>
            Can&rsquo;t find what you&rsquo;re looking for? Message us on{' '}
            <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer">
              WhatsApp
            </a>{' '}
            and we&rsquo;ll answer directly.
          </p>
        </div>
        <div className="faq-list">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={f.q} className={isOpen ? 'faq-item is-open' : 'faq-item'}>
                <h3>
                  <button aria-expanded={isOpen} aria-controls={`faq-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                    {f.q}
                    <span className="faq-icon" aria-hidden="true" />
                  </button>
                </h3>
                <div className="faq-answer" id={`faq-${i}`} role="region">
                  <div>
                    <p>{f.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
