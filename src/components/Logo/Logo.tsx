import './Logo.css'

export function LogoMark({ size = 30 }: { size?: number }) {
  return (
    <svg className="logo-mark" width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="var(--primary)" />
      <path
        d="M5 16c3.2-5.6 6.8-8.2 11-8.2s7.8 2.6 11 8.2c-3.2 5.6-6.8 8.2-11 8.2S8.2 21.6 5 16Z"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="16" r="4" fill="#fff" />
    </svg>
  )
}

export function Logo() {
  return (
    <span className="logo">
      <LogoMark />
      <span className="logo-word">Real Sight</span>
    </span>
  )
}
