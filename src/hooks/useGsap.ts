import { useLayoutEffect, type DependencyList, type RefObject } from 'react'
import { gsap, MOTION_OK } from '../lib/motion'

/**
 * Runs GSAP setup scoped to `scope` (so selector strings only match inside it),
 * only when the user hasn't asked for reduced motion, and reverts everything on cleanup.
 */
export function useGsap(scope: RefObject<HTMLElement | null>, setup: () => void | (() => void), deps: DependencyList = []) {
  useLayoutEffect(() => {
    if (!scope.current) return
    const mm = gsap.matchMedia(scope.current)
    mm.add(MOTION_OK, setup)
    return () => mm.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
