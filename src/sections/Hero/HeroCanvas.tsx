import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion, ScrollTrigger } from '../../lib/motion'
import { Iris } from '../../three/Iris'

function hasWebGL() {
  try {
    return !!document.createElement('canvas').getContext('webgl2')
  } catch {
    return false
  }
}

/** The Three.js eye as a soft background accent: follows the pointer, pauses off-screen. */
export function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  const [supported] = useState(hasWebGL)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const iris = new Iris(canvas, { reduced: prefersReducedMotion(), minimal: true })

    const resize = new ResizeObserver(() => iris.resize())
    resize.observe(canvas)
    const visibility = new IntersectionObserver(([entry]) => (entry.isIntersecting ? iris.start() : iris.stop()))
    visibility.observe(canvas)

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      iris.setPointer((e.clientX - (r.left + r.width / 2)) / (r.width / 2), -(e.clientY - (r.top + r.height / 2)) / (r.height / 2))
    }
    window.addEventListener('pointermove', onMove)

    const scroll = ScrollTrigger.create({
      trigger: canvas.closest('section'),
      start: 'top top',
      end: 'bottom top',
      onUpdate: (self) => iris.setScroll(self.progress),
    })

    return () => {
      scroll.kill()
      window.removeEventListener('pointermove', onMove)
      visibility.disconnect()
      resize.disconnect()
      iris.dispose()
    }
  }, [])

  // Decorative only; without WebGL the hero's gradient glow carries the look on its own.
  return supported ? <canvas ref={ref} className="hero-canvas" aria-hidden="true" /> : null
}
