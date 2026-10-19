import { useRef } from 'react'
import { projects } from '../../data/projects'
import { useGsap } from '../../hooks/useGsap'
import { fadeUp } from '../../lib/motion'
import './Clients.css'

// Online-store entries describe the build, not a place.
const regions = new Set(projects.filter((p) => p.sector !== 'Online stores').map((p) => p.location.split(',').pop()!.trim()))

const stats = [
  { value: String(projects.length), label: 'Websites launched this year' },
  { value: String(regions.size), label: 'States & UTs served' },
  { value: '100%', label: 'Custom code, no templates' },
]

/** Client names as a quiet wordmark row, with three headline numbers. */
export function Clients() {
  const root = useRef<HTMLElement>(null)

  useGsap(root, () => {
    fadeUp('.clients-names li', root.current, 0.05)
    fadeUp('.stat', '.stats', 0.1)
  })

  return (
    <section ref={root} className="clients" aria-label="Clients">
      <div className="container">
        <p className="clients-label">Businesses that trust us with their website</p>
        <ul className="clients-names">
          {projects.map((p) => (
            <li key={p.name}>{p.name}</li>
          ))}
        </ul>
        <dl className="stats">
          {stats.map((s) => (
            <div key={s.label} className="stat">
              <dt>{s.value}</dt>
              <dd>{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
