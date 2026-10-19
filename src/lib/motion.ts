import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
gsap.defaults({ ease: 'power3.out', duration: 0.8 })

export { gsap, ScrollTrigger }

export const MOTION_OK = '(prefers-reduced-motion: no-preference)'

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Fades elements up into place, tipping forward in 3D, staggered, as `trigger` scrolls into view. */
export function fadeUp(targets: gsap.TweenTarget, trigger: Element | string | null, stagger = 0.08) {
  if (!trigger) return
  gsap.from(targets, {
    y: 32,
    opacity: 0,
    rotateX: 18,
    transformPerspective: 900,
    transformOrigin: '50% 100%',
    duration: 0.9,
    stagger,
    scrollTrigger: { trigger, start: 'top 88%' },
  })
}
