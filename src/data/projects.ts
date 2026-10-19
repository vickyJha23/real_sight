import narmada from '../assets/work/narmada.webp'
import narmadaMobile from '../assets/work/narmada-mobile.webp'
import narmadaPage from '../assets/work/narmada-page.webp'
import jakharia from '../assets/work/jakharia.webp'
import jakhariaMobile from '../assets/work/jakharia-mobile.webp'
import jakhariaPage from '../assets/work/jakharia-page.webp'
import educationPoint from '../assets/work/education-point.webp'
import educationPointMobile from '../assets/work/education-point-mobile.webp'
import educationPointPage from '../assets/work/education-point-page.webp'
import agronex from '../assets/work/agronex.webp'
import agronexMobile from '../assets/work/agronex-mobile.webp'
import agronexPage from '../assets/work/agronex-page.webp'
import poojaPlastic from '../assets/work/pooja-plastic.webp'
import poojaPlasticMobile from '../assets/work/pooja-plastic-mobile.webp'
import poojaPlasticPage from '../assets/work/pooja-plastic-page.webp'
import rootsRays from '../assets/work/roots-rays.webp'
import rootsRaysMobile from '../assets/work/roots-rays-mobile.webp'
import rootsRaysPage from '../assets/work/roots-rays-page.webp'

/** Industry groups used by the work filter. */
export const sectors = ['Manufacturing', 'Education', 'Agriculture', 'Online stores'] as const
export type Sector = (typeof sectors)[number]

export interface Project {
  name: string
  industry: string
  location: string
  sector: Sector
  /** Finishes the hero line "A website that grows your …". */
  heroWord: string
  summary: string
  highlights: string[]
  stack: string[]
  /** Screenshots: home page (1200×750), phone view, and a long page for hover-scrolling. Omitted for drawn previews. */
  image?: string
  mobile?: string
  page?: string
  url?: string
  /** Shown instead of a link when the site isn't public. */
  note?: string
}

export const projects: Project[] = [
  {
    name: 'Narmada Engineering Works',
    industry: 'Industrial fabrication',
    location: 'Umbergaon, Gujarat',
    sector: 'Manufacturing',
    heroWord: 'factory',
    summary:
      'A seven-page site for a sheet-metal and fabrication workshop, built so buyers can send drawings and get quotes on WhatsApp.',
    highlights: [
      'Every page prerendered for Google',
      'Workshop photos cleaned and watermarked',
      'Analytics and structured data',
    ],
    stack: ['React', 'GSAP', 'SEO'],
    image: narmada,
    mobile: narmadaMobile,
    page: narmadaPage,
    url: 'https://www.narmadaengineeringworks.com',
  },
  {
    name: 'Jakharia Books',
    industry: 'Notebook manufacturing',
    location: 'Vapi, Gujarat',
    sector: 'Manufacturing',
    heroWord: 'wholesale business',
    summary:
      'A wholesale site for a notebook maker in business since 1987. It brings in distributor and bulk-order enquiries from across India.',
    highlights: ['Five-page site with product range', 'Distributor sign-up flow', 'Video hero and catalogue'],
    stack: ['React', 'React Router', 'Video'],
    image: jakharia,
    mobile: jakhariaMobile,
    page: jakhariaPage,
    url: 'https://jakharia.com',
  },
  {
    name: 'Education Point Classes',
    industry: 'Coaching institute',
    location: 'Silvassa, DNH',
    sector: 'Education',
    heroWord: 'coaching institute',
    summary:
      'An admissions-first site for a coaching institute covering Class 5–12, Commerce and RMS CET, with one-tap calls and demo-class bookings.',
    highlights: ['Admissions banner for each exam season', 'Course and results pages', 'Call and WhatsApp buttons'],
    stack: ['React', 'SEO', 'Video'],
    image: educationPoint,
    mobile: educationPointMobile,
    page: educationPointPage,
    url: 'https://www.edupointclasses.in',
  },
  {
    name: 'AGRONEX Crop Care',
    industry: 'Agrochemicals',
    location: 'Haryana',
    sector: 'Agriculture',
    heroWord: 'agri brand',
    summary:
      'A brand site for a crop-protection company, with a product catalogue, dealer network and an AI assistant that answers farmers’ questions.',
    highlights: ['Product catalogue with label art', '“Ask AGRONEX AI” chat assistant', 'Dealer enquiry form'],
    stack: ['React', 'Tailwind', 'AI'],
    image: agronex,
    mobile: agronexMobile,
    page: agronexPage,
    url: 'https://www.agronexcropcare.com',
  },
  {
    name: 'Pooja Plastic',
    industry: 'Plastic household goods',
    location: 'Mumbai, Maharashtra',
    sector: 'Manufacturing',
    heroWord: 'family business',
    summary:
      'A catalogue and price-list site for a wholesale maker of soap cases, pencil pouches and cutlery stands. Retailers can ask for rates on WhatsApp.',
    highlights: ['26+ designs in one catalogue', 'Carton-level price list', 'WhatsApp enquiries'],
    stack: ['React', 'Catalogue'],
    image: poojaPlastic,
    mobile: poojaPlasticMobile,
    page: poojaPlasticPage,
    note: 'Launching soon',
  },
  {
    name: 'ShopEasy',
    industry: 'Clothing store',
    location: 'Full-stack build',
    sector: 'Online stores',
    heroWord: 'clothing store',
    summary:
      'A complete online clothing store. Customers get a cart, accounts and order tracking; the owner gets an admin panel with sales charts.',
    highlights: ['Razorpay UPI and card payments, plus COD', 'Stock tracked per size', 'Admin dashboard and order emails'],
    stack: ['React', 'NestJS', 'PostgreSQL', 'Razorpay'],
    note: 'Demo on request',
  },
  {
    name: 'Roots & Rays Organic',
    industry: 'Organic food brand',
    location: 'Direct-to-consumer',
    sector: 'Online stores',
    heroWord: 'online store',
    summary:
      'A storefront for a small organic pantry brand, with a 3D hero, smooth scrolling and a bag that hands the order to WhatsApp.',
    highlights: ['Three.js product hero', 'GSAP and Lenis motion', 'Shop, rituals and story pages'],
    stack: ['React', 'Three.js', 'GSAP'],
    image: rootsRays,
    mobile: rootsRaysMobile,
    page: rootsRaysPage,
    note: 'Concept build',
  },
]
