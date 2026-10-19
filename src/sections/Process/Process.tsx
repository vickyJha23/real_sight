import { useRef } from 'react'
import { process } from '../../data/site'
import { useGsap } from '../../hooks/useGsap'
import { fadeUp, gsap } from '../../lib/motion'
import './Process.css'

export function Process() {
  const root = useRef<HTMLElement>(null)

  useGsap(root, () => {
    fadeUp('.section-head > *', root.current)
    gsap
      .timeline({ scrollTrigger: { trigger: '.steps', start: 'top 85%' } })
      .from('.steps-line span', { scaleX: 0, duration: 1.4, ease: 'power2.inOut' }, 0)
      .from('.step', { y: 24, opacity: 0, stagger: 0.12 }, 0.1)
  })

  return (
    <section ref={root} className="section section-subtle" id="process">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">How it works</span>
          <h2>From first call to live website in four steps</h2>
          <p>You see the work at every stage, and nothing goes live until you&rsquo;re happy with it.</p>
        </div>
        <div className="steps-wrap">
          <div className="steps-line" aria-hidden="true">
            <span />
          </div>
          <ol className="steps">
            {process.map((p) => (
              <li key={p.step} className="step">
                <span className="step-num">{Number(p.step)}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
