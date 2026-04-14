import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import './Home.css'


// ─── DATA ───────────────────────────────────────────────────────────────────

const upcomingEvents = [
  {
    id: 1,
    date: 'Apr 15',
    month: 'APR',
    day: '15',
    title: 'Annual Community Gathering',
    desc: 'Join us for our yearly get-together with cultural performances, food stalls, and exciting activities for all ages.',
    tag: 'Community',
    color: 'blue',
  },
  {
    id: 2,
    date: 'Apr 28',
    month: 'APR',
    day: '28',
    title: 'Cleanliness Drive',
    desc: 'A neighbourhood-wide initiative to keep our streets clean and green. Gloves and bags will be provided.',
    tag: 'Environment',
    color: 'green',
  },
  {
    id: 3,
    date: 'May 10',
    month: 'MAY',
    day: '10',
    title: 'Health and Wellness Camp',
    desc: 'Free health check-ups, yoga sessions, and consultations with doctors from leading hospitals.',
    tag: 'Health',
    color: 'orange',
  },
]

const galleryImages = [
  { id: 1, src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800', alt: 'Community event' },
  { id: 2, src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800', alt: 'Residents gathering' },
  { id: 3, src: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800', alt: 'Cultural celebration' },
  { id: 4, src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800', alt: 'Neighbourhood park' },
  { id: 5, src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800', alt: 'Meeting' },
]

const nearbyPlaces = [
  {
    id: 1,
    name: 'Attiguppe Metro Station',
    category: 'Transport',
    desc: 'Namma Metro Purple Line station connecting Attiguppe to the rest of Bengaluru seamlessly.',
    distance: '0.2 km',
    color: 'blue',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
        <line x1="12" y1="12" x2="12" y2="16"/>
        <line x1="8" y1="12" x2="16" y2="12"/>
      </svg>
    ),
  },
  {
    id: 2,
    name: 'Lakshmi Narasimha Temple',
    category: 'Heritage',
    desc: 'One of the oldest temples in the area, believed to be established by Rishi Durvasa and renovated in the 17th century.',
    distance: '0.4 km',
    color: 'orange',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    id: 3,
    name: 'Government Model High School',
    category: 'Education',
    desc: 'A well-established government school in Attiguppe serving the local community for decades.',
    distance: '0.6 km',
    color: 'green',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
      </svg>
    ),
  },
  {
    id: 4,
    name: 'Vijayanagar Market',
    category: 'Market',
    desc: 'A bustling local market near Vijayanagar with fresh produce, household goods, and street food.',
    distance: '0.8 km',
    color: 'red',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="9" cy="21" r="1"/>
        <circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 001.98-1.67L23 6H6"/>
      </svg>
    ),
  },
]

const values = [
  { title: 'Unity', desc: 'We believe in the power of a unified community working towards shared goals.', color: 'blue' },
  { title: 'Transparency', desc: 'All decisions and finances are open, honest and accessible to every member.', color: 'green' },
  { title: 'Inclusion', desc: 'Every resident, regardless of background, has a voice and a seat at the table.', color: 'orange' },
]

const historyHighlights = [
  {
    year: '15th–16th C',
    title: 'Vijayanagara Roots',
    desc: 'The name "Attiguppe" traces back to the Vijayanagara Empire. "Atti" (paddy) + "gupe" (heap) — a testament to its rich agricultural origins.',
    color: 'orange',
  },
  {
    year: '17th C',
    title: 'Lakshmi Narasimha Temple',
    desc: 'The iconic Lakshmi Narasimha Temple, family deity of the local shepherd community, was renovated — becoming a cornerstone of the area\'s cultural identity.',
    color: 'green',
  },
  {
    year: '1960s',
    title: 'Urban Expansion',
    desc: 'As Western Bengaluru grew with the development of Vijayanagar, Attiguppe transformed from a rural village into a thriving suburban residential area.',
    color: 'blue',
  },
  {
    year: 'Today',
    title: 'Connected & Vibrant',
    desc: 'Now well-connected by Namma Metro Purple Line, Outer Ring Road, and Mysore Road, Attiguppe is a sought-after locality for families and professionals alike.',
    color: 'mint',
  },
]

// ─── CAROUSEL HOOK ──────────────────────────────────────────────────────────

function useCarousel(total, auto = 4000) {
  const [idx, setIdx] = useState(0)
  const timer = useRef(null)

  const go = (n) => {
    setIdx((prev) => (prev + n + total) % total)
    reset()
  }

  const reset = () => {
    clearInterval(timer.current)
    timer.current = setInterval(() => setIdx(p => (p + 1) % total), auto)
  }

  useEffect(() => {
    reset()
    return () => clearInterval(timer.current)
  }, [total])

  return { idx, go }
}

// ─── COMPONENT ──────────────────────────────────────────────────────────────

export default function Home() {
  const { idx, go } = useCarousel(galleryImages.length)

  return (
    <div className="home-page">

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-video-wrapper">
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            poster="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1600"
          >
            <source src="/assets/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay" />
        </div>

        <div className="hero-content container hero-center">
          <h1 className="hero-title">
            Your Neighbourhood,<br />
            <span className="hero-accent">Your Community</span>
          </h1>
          <p className="hero-sub">
            Working together to build a cleaner, safer, and more vibrant neighbourhood for every resident of Attiguppe.
          </p>
          <div className="hero-actions hero-actions-center">
            <Link to="/about" className="btn btn-primary">Discover More</Link>
            <Link to="/contact" className="btn hero-btn-outline">Get in Touch</Link>
          </div>
        </div>
      </section>

      {/* ── ABOUT TEASER ── */}
      <section className="section about-teaser">
        <div className="container about-teaser-inner">
          <div className="about-teaser-text">
            <span className="badge badge-blue">Who We Are</span>
            <div className="divider" />
            <h2 className="section-title">A Community Built on Trust and Care</h2>
            <p className="about-para">
              The Attiguppe Residents Welfare Association has been the backbone of neighbourhood governance, welfare, and celebration. We represent every household in Attiguppe, working tirelessly to resolve civic issues, organise events, and foster lasting friendships.
            </p>
            <p className="about-para">
              From infrastructure grievances to cultural festivals, we bridge the gap between residents and local authorities while keeping the spirit of community alive.
            </p>
            <Link to="/about" className="btn btn-primary">Meet Our Team</Link>
          </div>
          <div className="about-teaser-stats">
            <div className="stat-card">
              <div className="stat-number" style={{ color: 'var(--calm-blue)' }}>32K+</div>
              <div className="stat-label">Residents in Attiguppe</div>
            </div>
            <div className="stat-card">
              <div className="stat-number" style={{ color: 'var(--mint-dark)' }}>1.13 km²</div>
              <div className="stat-label">Area Coverage</div>
            </div>
            <div className="stat-card">
              <div className="stat-number" style={{ color: 'var(--warm-orange)' }}>4.0</div>
              <div className="stat-label">Overall Locality Rating</div>
            </div>
            <div className="stat-card">
              <div className="stat-number" style={{ color: 'var(--soft-red)' }}>4.1</div>
              <div className="stat-label">Safety Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HISTORY HIGHLIGHTS ── */}
      <section className="section history-section">
        <div className="container">
          <div className="section-head center">
            <span className="badge badge-blue">Did You Know?</span>
            <div className="divider divider-center" />
            <h2 className="section-title">History of Attiguppe</h2>
            <p className="section-subtitle">From paddy fields of the Vijayanagara Empire to a vibrant urban neighbourhood.</p>
          </div>
          <div className="history-grid">
            {historyHighlights.map((h, i) => (
              <div className={`history-card history-${h.color}`} key={i}>
                <div className="history-year">{h.year}</div>
                <h3 className="history-title">{h.title}</h3>
                <p className="history-desc">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR VALUES ── */}
      <section className="section values-section">
        <div className="container">
          <div className="section-head center">
            <span className="badge badge-green">What We Stand For</span>
            <div className="divider divider-center" />
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-subtitle">The principles that guide every decision we make.</p>
          </div>
          <div className="values-grid">
            {values.map((v, i) => (
              <div className={`value-card value-${v.color}`} key={i}>
                <div className="value-number">0{i + 1}</div>
                <h3 className="value-title">{v.title}</h3>
                <p className="value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
          <div className="values-cta">
            <Link to="/our-values" className="btn btn-outline">Explore All Values</Link>
            <Link to="/core-principles" className="btn btn-secondary">Core Principles</Link>
          </div>
        </div>
      </section>

      {/* ── UPCOMING EVENTS ── */}
      <section className="section events-section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="badge badge-blue">Mark Your Calendar</span>
              <div className="divider" />
              <h2 className="section-title">Upcoming Events</h2>
              <p className="section-subtitle">Stay involved and be part of our vibrant community life.</p>
            </div>
            <Link to="/events" className="btn btn-outline">View All Events</Link>
          </div>

          <div className="events-grid">
            {upcomingEvents.map((ev) => (
              <Link to="/events" key={ev.id} className={`event-card event-${ev.color}`}>
                <div className="event-date-block">
                  <span className="event-month">{ev.month}</span>
                  <span className="event-day">{ev.day}</span>
                </div>
                <div className="event-body">
                  <span className={`event-tag tag-${ev.color}`}>{ev.tag}</span>
                  <h3 className="event-title">{ev.title}</h3>
                  <p className="event-desc">{ev.desc}</p>
                  <span className="event-more">View Details</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY CAROUSEL ── */}
      <section className="section gallery-section">
        <div className="container">
          <div className="section-head center">
            <span className="badge badge-green">Memories We Have Made</span>
            <div className="divider divider-center" />
            <h2 className="section-title">Gallery</h2>
            <p className="section-subtitle">A glimpse into our community events and celebrations.</p>
          </div>

          <div className="carousel">
            <div className="carousel-track" style={{ transform: `translateX(-${idx * 100}%)` }}>
              {galleryImages.map((img) => (
                <div key={img.id} className="carousel-slide">
                  <img src={img.src} alt={img.alt} loading="lazy" />
                  <div className="carousel-caption">{img.alt}</div>
                </div>
              ))}
            </div>
            <button className="carousel-btn prev" onClick={() => go(-1)} aria-label="Previous">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <button className="carousel-btn next" onClick={() => go(1)} aria-label="Next">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
            <div className="carousel-dots">
              {galleryImages.map((_, i) => (
                <button
                  key={i}
                  className={`dot${i === idx ? ' active' : ''}`}
                  onClick={() => go(i - idx)}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="gallery-cta center">
            <Link to="/gallery" className="btn btn-secondary">See Full Gallery</Link>
          </div>
        </div>
      </section>

      {/* ── NEARBY PLACES ── */}
      <section className="section places-section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="badge badge-blue">Around You</span>
              <div className="divider" />
              <h2 className="section-title">Nearby Attractions</h2>
              <p className="section-subtitle">Explore what Attiguppe has to offer.</p>
            </div>
            <Link to="/places" className="btn btn-outline">See All Places</Link>
          </div>

          <div className="places-grid">
            {nearbyPlaces.map((place) => (
              <Link to="/places" key={place.id} className={`place-card place-${place.color}`}>
                <div className={`place-icon-wrap icon-${place.color}`}>{place.icon}</div>
                <div className="place-body">
                  <div className="place-meta">
                    <span className="place-category">{place.category}</span>
                    <span className="place-distance">{place.distance}</span>
                  </div>
                  <h3 className="place-name">{place.name}</h3>
                  <p className="place-desc">{place.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT TEASER ── */}
      <section className="section contact-cta-section">
        <div className="container">
          <div className="contact-cta-card">
            <div className="contact-cta-text">
              <h2>Have Something on Your Mind?</h2>
              <p>Whether it is a civic issue, a suggestion, or just wanting to connect with us, we are always here for you.</p>
            </div>
            <div className="contact-cta-actions">
              <Link to="/contact" className="btn btn-primary">Send a Message</Link>
              <Link to="/membership" className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }}>
                Join the Association
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
