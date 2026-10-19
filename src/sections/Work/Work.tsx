import { useRef, useState } from 'react'
import { Icon } from '../../components/Icon/Icon'
import { StorePreview } from '../../components/StorePreview/StorePreview'
import { projects, sectors, type Project, type Sector } from '../../data/projects'
import { useGsap } from '../../hooks/useGsap'
import { fadeUp, gsap, prefersReducedMotion } from '../../lib/motion'
import './Work.css'

type Filter = 'All' | Sector
const filters: Filter[] = ['All', ...sectors]
const countFor = (f: Filter) => (f === 'All' ? projects.length : projects.filter((p) => p.sector === f).length)

/** A gallery card: hovering the thumbnail scrolls through the whole page, like Wix's template gallery. */
function WorkCard({ project: p }: { project: Project }) {
  return (
    <article className="work-card">
      <div className="work-thumb">
        {p.page ? <img src={p.page} alt={`${p.name} website, full page`} loading="lazy" width={960} height={2400} /> : <StorePreview />}
        <div className="work-overlay">
          {p.url ? (
            <a className="btn btn-primary btn-sm" href={p.url} target="_blank" rel="noreferrer">
              Visit live site <Icon name="arrowUpRight" size={15} />
            </a>
          ) : (
            <span className="work-note">{p.note}</span>
          )}
        </div>
      </div>
      <div className="work-info">
        <div className="work-title">
          <h3>{p.name}</h3>
          {p.url && (
            <a href={p.url} target="_blank" rel="noreferrer" aria-label={`Visit ${p.name}`}>
              <Icon name="arrowUpRight" size={18} />
            </a>
          )}
        </div>
        <p className="work-meta">
          {p.industry} · {p.location}
        </p>
        <p className="work-summary">{p.summary}</p>
      </div>
    </article>
  )
}

export function Work() {
  const root = useRef<HTMLElement>(null)
  const [filter, setFilter] = useState<Filter>('All')
  const shown = filter === 'All' ? projects : projects.filter((p) => p.sector === filter)

  useGsap(root, () => {
    fadeUp('.section-head > *, .work-filters', root.current)
    fadeUp('.work-card', '.work-grid', 0.07)
  })

  function choose(f: Filter) {
    setFilter(f)
    if (prefersReducedMotion()) return
    // Fade the new set in once React has rendered it.
    requestAnimationFrame(() => {
      gsap.fromTo(root.current!.querySelectorAll('.work-card'), { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.05 })
    })
  }

  return (
    <section ref={root} className="section section-subtle" id="work">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">Our work</span>
          <h2>Websites built for every kind of business</h2>
          <p>Browse real sites we&rsquo;ve designed and launched. Hover a site to scroll through the full page.</p>
        </div>

        <div className="work-filters" role="group" aria-label="Filter by industry">
          {filters.map((f) => (
            <button key={f} className={f === filter ? 'chip is-active' : 'chip'} aria-pressed={f === filter} onClick={() => choose(f)}>
              {f}
              <span>{countFor(f)}</span>
            </button>
          ))}
        </div>

        <div className="work-grid">
          {shown.map((p) => (
            <WorkCard key={p.name} project={p} />
          ))}
          {filter === 'All' && (
            <article className="work-card work-cta">
              <div className="work-thumb work-cta-panel">
                <span className="eyebrow">Your business</span>
                <h3>Your website could be next</h3>
                <p>Tell us what you do and we&rsquo;ll send ideas, a timeline and a clear quote.</p>
                <a href="#contact" className="btn btn-primary">
                  Start your website <span className="arrow">→</span>
                </a>
              </div>
            </article>
          )}
        </div>
      </div>
    </section>
  )
}
