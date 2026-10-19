import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../../lib/motion'
import { Wave } from '../../three/Wave'

function hasWebGL() {
  try {
    return !!document.createElement('canvas').getContext('webgl2')
  } catch {
    return false
  }
}

/** The 3D particle wave behind the contact section: follows the pointer, pauses off-screen. */
export function WaveCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  const [supported] = useState(hasWebGL)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const reduced = prefersReducedMotion()
    const wave = new Wave(canvas, { reduced })

    const resize = new ResizeObserver(() => wave.resize())
    resize.observe(canvas)
    const visibility = new IntersectionObserver(([entry]) => (entry.isIntersecting && !reduced ? wave.start() : wave.stop()))
    visibility.observe(canvas)

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      wave.setPointer(((e.clientX - r.left) / r.width) * 2 - 1, ((e.clientY - r.top) / r.height) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove)

    return () => {
      window.removeEventListener('pointermove', onMove)
      visibility.disconnect()
      resize.disconnect()
      wave.dispose()
    }
  }, [])

  return supported ? <canvas ref={ref} className="contact-wave" aria-hidden="true" /> : null
}
