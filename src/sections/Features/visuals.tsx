// Illustrations for the feature blocks. They show how things look on a site,
// not real data: no figures or results are implied.
import { DeviceMockup } from '../../components/DeviceMockup/DeviceMockup'
import { Icon } from '../../components/Icon/Icon'
import { StorePreview } from '../../components/StorePreview/StorePreview'
import { projects } from '../../data/projects'

const agronex = projects.find((p) => p.name === 'AGRONEX Crop Care')!
const education = projects.find((p) => p.name === 'Education Point Classes')!

export function DesignVisual() {
  return <DeviceMockup host="agronexcropcare.com" desktop={agronex.image!} mobile={agronex.mobile} alt="AGRONEX Crop Care website" />
}

export function StoreVisual() {
  return (
    <div className="fv-store">
      <DeviceMockup host="your-store.in" desktop={<StorePreview />} alt="" />
      <div className="fv-toast">
        <span className="fv-toast-icon">
          <Icon name="check" size={16} />
        </span>
        <div>
          <b>New order</b>
          <small>Paid via UPI</small>
        </div>
      </div>
      <div className="fv-pay" aria-hidden="true">
        <span>UPI</span>
        <span>Cards</span>
        <span>Cash on delivery</span>
      </div>
    </div>
  )
}

export function WhatsAppVisual() {
  return (
    <div className="fv-chat">
      <div className="fv-chat-head">
        <span className="fv-chat-avatar">
          <Icon name="whatsapp" size={18} />
        </span>
        <div>
          <b>New website enquiry</b>
          <small>via WhatsApp</small>
        </div>
      </div>
      <div className="fv-chat-body">
        <p className="in">
          Hi, I saw your catalogue on the website. Can you share rates for soap cases?
          <time>10:42</time>
        </p>
        <p className="out">
          Sure! Sending our price list now.
          <time>10:44</time>
        </p>
        <p className="in">
          Thanks. Do you deliver to Pune?
          <time>10:45</time>
        </p>
      </div>
      <div className="fv-chat-buttons" aria-hidden="true">
        <span>
          <Icon name="whatsapp" size={16} /> WhatsApp us
        </span>
        <span>
          <Icon name="phone" size={16} /> Call now
        </span>
      </div>
    </div>
  )
}

export function SearchVisual() {
  return (
    <div className="fv-search">
      <div className="fv-serp">
        <small className="fv-serp-label">How your page appears on Google</small>
        <div className="fv-serp-site">
          <span className="fv-serp-fav">E</span>
          <div>
            <b>Education Point Classes</b>
            <small>https://www.edupointclasses.in</small>
          </div>
        </div>
        <p className="fv-serp-title">{education.name}, Silvassa | Coaching for Class 5–12 &amp; Entrance Exams</p>
        <p className="fv-serp-desc">
          Coaching for Class 6th to 12th, Commerce (11th &amp; 12th) and RMS CET 2026 preparation. Your Success Is Our Mission.
        </p>
      </div>
      <div className="fv-analytics" aria-hidden="true">
        <small>Visitors this week</small>
        <div className="fv-bars">
          {[40, 55, 48, 70, 62, 85, 78].map((h, i) => (
            <span key={i} style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    </div>
  )
}
