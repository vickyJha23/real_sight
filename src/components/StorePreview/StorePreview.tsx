import './StorePreview.css'
import type { CSSProperties } from 'react'

const bars = [38, 52, 44, 70, 58, 82, 64, 90, 76, 95]

/** Drawn stand-in for ShopEasy, which needs its backend running to screenshot. */
export function StorePreview() {
  return (
    <div className="store-preview" aria-hidden="true">
      <div className="sp-bar">
        <b>ShopEasy</b>
        <span />
        <span />
        <span />
        <i>Cart · 2</i>
      </div>
      <div className="sp-body">
        <div className="sp-grid">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="sp-item">
              <div className="sp-img" style={{ '--h': `${(i * 47) % 360}` } as CSSProperties} />
              <div className="sp-line" />
              <div className="sp-line short" />
            </div>
          ))}
        </div>
        <div className="sp-admin">
          <small>Revenue · 14 days</small>
          <div className="sp-chart">
            {bars.map((h, i) => (
              <span key={i} style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="sp-pay">UPI · Card · COD</div>
        </div>
      </div>
    </div>
  )
}
