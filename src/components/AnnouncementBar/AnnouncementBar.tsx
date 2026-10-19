import { site, telHref } from '../../data/site'
import './AnnouncementBar.css'

/** Thin strip above the nav, like the promo bar on Shopify and Wix home pages. */
export function AnnouncementBar() {
  return (
    <div className="announce">
      <p>
        <span className="announce-dot" aria-hidden="true" />
        Now taking new website projects.
        <a href={telHref(site.phones[0])}>
          Call {site.phones[0]} <span aria-hidden="true">→</span>
        </a>
      </p>
    </div>
  )
}
