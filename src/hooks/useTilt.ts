import { useLayoutEffect, type RefObject } from 'react'
import { gsap, MOTION_OK } from '../lib/motion'

/** Mouse-only: touch screens have no hover to drive the tilt. */
const TILT_OK = `${MOTION_OK} and (hover: hover) and (pointer: fine)`

/**
 * Tilts each `selector` element inside `scope` toward the pointer in 3D and sets
 * `--gx`/`--gy` (0–100%) so CSS can draw a glare that follows it. Delegated, so it
 * keeps working when the elements re-render (e.g. after a filter change).
 */
export function useTilt(scope: RefObject<HTMLElement | null>, selector: string, max = 8) {
  useLayoutEffect(() => {
    const root = scope.current
    if (!root) return
    const mm = gsap.matchMedia()
    mm.add(TILT_OK, () => {
      let current: HTMLElement | null = null

      const reset = (el: HTMLElement) =>
        gsap.to(el, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.6, ease: 'power3.out', overwrite: 'auto' })

      const onMove = (e: PointerEvent) => {
        const el = (e.target as Element).closest<HTMLElement>(selector)
        if (current && current !== el) reset(current)
        current = el && root.contains(el) ? el : null
        if (!current) return
        const r = current.getBoundingClientRect()
        const x = (e.clientX - r.left) / r.width
        const y = (e.clientY - r.top) / r.height
        current.style.setProperty('--gx', `${x * 100}%`)
        current.style.setProperty('--gy', `${y * 100}%`)
        gsap.to(current, {
          rotateY: (x - 0.5) * 2 * max,
          rotateX: -(y - 0.5) * 2 * max,
          scale: 1.02,
          transformPerspective: 900,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      }
      const onLeave = () => {
        if (current) reset(current)
        current = null
      }

      root.addEventListener('pointermove', onMove)
      root.addEventListener('pointerleave', onLeave)
      return () => {
        root.removeEventListener('pointermove', onMove)
        root.removeEventListener('pointerleave', onLeave)
        root.querySelectorAll<HTMLElement>(selector).forEach((el) => gsap.set(el, { clearProps: 'transform' }))
      }
    })
    return () => mm.revert()
  }, [scope, selector, max])
}
