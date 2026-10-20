import { useRef } from 'react'
import { projects } from '../../data/projects'
import { useGsap } from '../../hooks/useGsap'
import { fadeUp, gsap, ScrollTrigger } from '../../lib/motion'
import './Clients.css'

// Online-store entries describe the build, not a place.
const regions = new Set(projects.filter((p) => p.sector !== 'Online stores').map((p) => p.location.split(',').pop()!.trim()))

const stats = [
  { value: '100+', label: 'Websites launched this year' },
  { value: String(regions.size), label: 'States & UTs served' },
  { value: '100%', label: 'Custom code, no templates' },
]

/** Degrees per second the ring turns on its own. */
const SPIN = 14

/** Client names on a slowly turning 3D ring (a flat row without motion), with three headline numbers. */
export function Clients() {
  const root = useRef<HTMLElement>(null)

  useGsap(root, () => {
    const list = root.current!.querySelector<HTMLElement>('.clients-names')!
    const items = gsap.utils.toArray<HTMLElement>('.clients-names li')
    list.classList.add('is-ring')

    let angle = 0
    let speed = SPIN
    let boost = 0
    let hovering = false
    let radius = 0
    const measure = () => (radius = Math.min(list.clientWidth * 0.42, 420))
    measure()
    window.addEventListener('resize', measure)

    // Each frame: place every name around the ring. The front sits at z = 0 (true size), the back
    // recedes, rises slightly (so the ring reads as tilted) and fades; names turn with the ring but
    // never past 35°, so the far side stays readable instead of mirrored.
    const tick = (_: number, dt: number) => {
      speed += ((hovering ? 0 : SPIN) - speed) * 0.05
      boost *= 0.94
      angle += ((speed + boost) * dt) / 1000
      items.forEach((li, i) => {
        const a = ((angle + (360 / items.length) * i) * Math.PI) / 180
        const sin = Math.sin(a)
        const cos = Math.cos(a)
        const front = (cos + 1) / 2
        li.style.transform = `translate(-50%, -50%) translate3d(${sin * radius}px, ${(cos - 1) * 10}px, ${(cos - 1) * radius * 0.9}px) rotateY(${sin * 35}deg)`
        li.style.opacity = String(0.05 + 0.95 * front ** 2.5)
        li.style.zIndex = String(Math.round(front * 100))
      })
    }
    gsap.ticker.add(tick)

    // Scrolling flicks the ring round faster, in the scroll direction.
    const st = ScrollTrigger.create({
      trigger: list,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => (boost = gsap.utils.clamp(-240, 240, self.getVelocity() / 6)),
    })
    const enter = () => (hovering = true)
    const leave = () => (hovering = false)
    list.addEventListener('pointerenter', enter)
    list.addEventListener('pointerleave', leave)

    gsap.from(list, { opacity: 0, rotateX: 40, duration: 1.2, scrollTrigger: { trigger: list, start: 'top 90%' } })

    // Numbers flip up and count to their value.
    const numbers = gsap.utils.toArray<HTMLElement>('.stat dt')
    numbers.forEach((dt) => {
      const [, num, suffix] = dt.textContent!.match(/^(\d+)(.*)$/) ?? []
      if (!num) return
      const n = { v: 0 }
      gsap
        .timeline({ scrollTrigger: { trigger: '.stats', start: 'top 88%' } })
        .from(dt, { rotateX: -90, opacity: 0, transformPerspective: 500, transformOrigin: '50% 100%', duration: 0.8 })
        .to(n, { v: Number(num), duration: 1.6, ease: 'power2.out', onUpdate: () => (dt.textContent = Math.round(n.v) + suffix) }, 0)
    })
    fadeUp('.stat', '.stats', 0.1)

    return () => {
      gsap.ticker.remove(tick)
      st.kill()
      window.removeEventListener('resize', measure)
      list.removeEventListener('pointerenter', enter)
      list.removeEventListener('pointerleave', leave)
      list.classList.remove('is-ring')
      items.forEach((li) => li.removeAttribute('style'))
      numbers.forEach((dt, i) => (dt.textContent = stats[i].value))
    }
  })

  return (
    <section ref={root} className="clients" aria-label="Clients">
      <div className="container">
        <p className="clients-label">Businesses that trust us with their website</p>
        <div className="clients-stage">
          <ul className="clients-names">
            {projects.map((p) => (
              <li key={p.name}>{p.name}</li>
            ))}
          </ul>
        </div>
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
