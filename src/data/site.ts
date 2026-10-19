// TODO: replace the email placeholder with Real Sight's real address.
export const site = {
  name: 'Real Sight',
  email: 'hello@realsight.in',
  phones: ['+91 70201 97056', '+91 88304 31616'],
  /** WhatsApp is on the second number. Digits only, with country code, for wa.me links. */
  whatsapp: '918830431616',
  whatsappDisplay: '+91 88304 31616',
  location: 'Mumbai, India',
}

/** `tel:` href for a display-formatted phone number. */
export const telHref = (phone: string) => `tel:${phone.replace(/\s/g, '')}`

export const process = [
  { step: '01', title: 'Listen', body: 'A call about your business and customers. Send us your brochure, photos and price lists.' },
  { step: '02', title: 'Design', body: 'A homepage design in your brand colours, revised with you until it feels right.' },
  { step: '03', title: 'Build', body: 'Custom code, built for phones first, with a preview link so you can follow along.' },
  { step: '04', title: 'Launch', body: 'We connect your domain, set up search and analytics, and stay on call after launch.' },
]
