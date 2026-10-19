import type { ReactNode } from 'react'
import './DeviceMockup.css'

interface Props {
  /** Address shown in the browser bar. */
  host: string
  /** Desktop view: a screenshot URL, or custom content (e.g. a drawn preview). */
  desktop: string | ReactNode
  /** Phone view screenshot; omit to show the desktop window alone. */
  mobile?: string
  alt: string
}

/** A desktop browser window with a phone overlapping its lower corner. */
export function DeviceMockup({ host, desktop, mobile, alt }: Props) {
  return (
    <div className={mobile ? 'devices' : 'devices devices-solo'}>
      <div className="device-browser">
        <div className="device-bar">
          <span />
          <span />
          <span />
          <em>{host}</em>
        </div>
        <div className="device-screen">
          {typeof desktop === 'string' ? <img src={desktop} alt={alt} width={1200} height={750} loading="lazy" /> : desktop}
        </div>
      </div>
      {mobile && (
        <div className="device-phone" aria-hidden="true">
          <div className="device-phone-screen">
            <img src={mobile} alt="" width={540} height={1169} loading="lazy" />
          </div>
        </div>
      )}
    </div>
  )
}
