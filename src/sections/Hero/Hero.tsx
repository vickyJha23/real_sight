import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { DeviceMockup } from '../../components/DeviceMockup/DeviceMockup'
import { Icon } from '../../components/Icon/Icon'
import { projects } from '../../data/projects'
import { useGsap } from '../../hooks/useGsap'
import { gsap, prefersReducedMotion } from '../../lib/motion'
import './Hero.css'

// Three.js is the heaviest dependency, so it loads in its own chunk after the text.
const HeroCanvas = lazy(() => import('./HeroCanvas').then((m) => ({ default: m.HeroCanvas })))

const featured = projects.filter((p) => p.image && p.mobile)
const towns = ['Umbergaon', 'Vapi', 'Silvassa', 'Mumbai', 'Haryana']
const ROTATE_MS = 3200

const hostOf = (url?: string) => (url ? url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '') : 'preview')

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  // Cycle the headline word and the matching site, Wix-style, until someone picks one.
  useEffect(() => {
    if (paused || prefersReducedMotion()) return
    const t = setInterval(() => setActive((i) => (i + 1) % featured.length), ROTATE_MS)
    return () => clearInterval(t)
  }, [paused])

  useGsap(root, () => {
    gsap.from('.hero-copy > *', { y: 20, opacity: 0, duration: 0.9, stagger: 0.08, delay: 0.1 })
    gsap.from('.hero-stage', { y: 48, opacity: 0, duration: 1.1, delay: 0.45 })
    // The mockups lie back slightly and stand up as they scroll into view.
    gsap.fromTo(
      '.hero-stage-inner',
      { rotateX: 14, scale: 0.95 },
      { rotateX: 0, scale: 1, ease: 'none', scrollTrigger: { trigger: '.hero-stage', start: 'top 90%', end: 'top 30%', scrub: true } },
    )
  })

  const current = featured[active]

  return (
    <section ref={root} className="hero" id="top">
      <div className="hero-bg" aria-hidden="true">
        <Suspense fallback={null}>
          <HeroCanvas />
        </Suspense>
      </div>

      <div className="container">
        <div className="hero-copy">
          <a href="#work" className="hero-badge">
            <span className="hero-badge-tag">New</span>
            {projects.length} websites launched this year
            <Icon name="arrowUpRight" size={14} />
          </a>
          <h1>
            A website that grows
            <br />
            your{' '}
            <span className="hero-word" key={current.heroWord}>
              {current.heroWord}
            </span>
          </h1>
          <p className="hero-sub">
            Real Sight designs and builds fast, custom websites for manufacturers, coaching institutes, brands and online
            stores across India. You run the business; we make sure customers find it.
          </p>
          <div className="hero-ctas">
            <a href="#contact" className="btn btn-primary btn-lg">
              Start your website <span className="arrow">→</span>
            </a>
            <a href="#work" className="btn btn-secondary btn-lg">
              Explore our work
            </a>
          </div>
          <p className="hero-trust">
            Trusted by businesses in{' '}
            {towns.map((t, i) => (
              <span key={t}>
                <b>{t}</b>
                {i < towns.length - 1 && <span className="sep">·</span>}
              </span>
            ))}
          </p>
        </div>

        <div className="hero-stage">
          <div className="hero-stage-inner">
            {featured.map((p, i) => (
              <div key={p.name} className={i === active ? 'hero-slide is-active' : 'hero-slide'} aria-hidden={i !== active}>
                <DeviceMockup host={hostOf(p.url)} desktop={p.image!} mobile={p.mobile} alt={`${p.name} website`} />
              </div>
            ))}
          </div>

          <div className="hero-caption">
            <p>
              <b>{current.name}</b>
              <span>
                {current.industry} · {current.location}
              </span>
            </p>
            <div className="hero-dots" role="tablist" aria-label="Featured websites">
              {featured.map((p, i) => (
                <button
                  key={p.name}
                  role="tab"
                  aria-selected={i === active}
                  aria-label={p.name}
                  className={i === active ? 'is-active' : ''}
                  onClick={() => {
                    setActive(i)
                    setPaused(true)
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
