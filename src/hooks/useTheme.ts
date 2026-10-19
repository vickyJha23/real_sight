import { useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const query = '(prefers-color-scheme: dark)'

function saved(): Theme | null {
  try {
    const t = localStorage.getItem('theme')
    return t === 'light' || t === 'dark' ? t : null
  } catch {
    return null
  }
}

function apply(theme: Theme) {
  document.documentElement.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0b0f1a' : '#ffffff')
}

/** Light/dark theme: starts from the value index.html already applied, follows the OS until the visitor picks one. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'))

  useEffect(() => {
    const mq = matchMedia(query)
    const onChange = () => {
      if (saved()) return
      const t: Theme = mq.matches ? 'dark' : 'light'
      apply(t)
      setTheme(t)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    apply(next)
    setTheme(next)
    try {
      localStorage.setItem('theme', next)
    } catch {
      // Private mode or blocked storage: the choice just won't persist.
    }
  }

  return { theme, toggle }
}
