import Lenis from 'lenis'
import { useEffect } from 'react'
import { gsap, prefersReducedMotion, ScrollTrigger } from '../lib/motion'

/** Height of the sticky nav, so anchored sections don't land underneath it. */
const NAV_OFFSET = -72

/** Lenis smooth scrolling, driven by the GSAP ticker so ScrollTrigger stays in sync. */
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return
    const lenis = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 4) })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    // In-page anchors go through Lenis so they glide instead of jumping.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]')
      const hash = link?.getAttribute('href')
      if (!hash || hash === '#') return
      const target = hash === '#top' ? 0 : document.querySelector<HTMLElement>(hash)
      if (target === null) return
      e.preventDefault()
      lenis.scrollTo(target, { offset: NAV_OFFSET })
      history.replaceState(null, '', hash)
    }
    document.addEventListener('click', onClick)

    // Honour a hash in the URL on first load (e.g. a shared /#contact link).
    const initial = location.hash ? document.querySelector<HTMLElement>(location.hash) : null
    const raf = initial ? requestAnimationFrame(() => lenis.scrollTo(initial, { offset: NAV_OFFSET, immediate: true })) : 0

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('click', onClick)
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])
}
