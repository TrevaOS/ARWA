import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import './Home.css'

// ─── DATA ───────────────────────────────────────────────────────────────────

const pastEvents = [
  {
    id: 1,
    date: 'Feb 21',
    month: 'FEB',
    day: '21',
    title: 'Free Health Camp',
    desc: 'Free health services including Eye Screening, Dental Check-up, Blood Donation, Breast Cancer Screening, Homeopathic Consultation, General Physician & Gynaecological Consultation.',
    tag: 'Health',
    color: 'blue',
    year: '2026',
  },
  {
    id: 2,
    date: 'Mar 8',
    month: 'MAR',
    day: '08',
    title: "Women's Day Celebration",
    desc: 'A special celebration honouring the women of Attiguppe with cultural programmes, games, and a heartfelt community gathering.',
    tag: 'Community',
    color: 'green',
    year: '2026',
  },
  {
    id: 3,
    date: 'Mar 29',
    month: 'MAR',
    day: '29',
    title: 'Saree Walkathon',
    desc: 'A unique walkathon celebrating the grace of the saree and bringing families together to honour tradition and promote togetherness.',
    tag: 'Cultural',
    color: 'orange',
    year: '2026',
  },
]

const galleryImages = [
  {
    id: 1,
    src: 'https://content.jdmagicbox.com/comp/bangalore/w7/080pxx80.xx80.191120193649.y4w7/catalogue/lakshminarasimha-temple-chandra-layout-bangalore-temples-5j4p5sda9x.jpg',
    alt: 'Lakshmi Narasimha Temple, Attiguppe',
  },
  {
    id: 2,
    src: 'https://i.ytimg.com/vi/W7Y46BawnhM/maxresdefault.jpg',
    alt: 'Lakshmi Narasimha Swami Temple',
  },
  {
    id: 3,
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Attiguppe_metro_station.jpg/1200px-Attiguppe_metro_station.jpg',
    alt: 'Attiguppe Metro Station',
  },
  {
    id: 4,
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Vidhana_Soudha%2C_Bangalore.jpg/1280px-Vidhana_Soudha%2C_Bangalore.jpg',
    alt: 'Vidhana Soudha, Bengaluru',
  },
  {
    id: 5,
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/KR_Market_Bangalore.jpg/1280px-KR_Market_Bangalore.jpg',
    alt: 'KR Market, Bengaluru',
  },
]

const nearbyPlaces = [
  {
    id: 1,
    name: 'Attiguppe Metro Station',
    category: 'Transport',
    desc: 'Namma Metro Purple Line station connecting Attiguppe to the rest of Bengaluru seamlessly.',
    detail: 'Part of Namma Metro Purple Line (Line 4), connecting Mysuru Road to Whitefield. The station provides seamless connectivity to Majestic, MG Road, and Whitefield. Auto-rickshaws and buses are easily available outside.',
    distance: '0.2 km',
    color: 'blue',
    frontImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Attiguppe_metro_station.jpg/1200px-Attiguppe_metro_station.jpg',
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
    desc: 'One of the oldest temples in the area and the family deity of the local shepherd community.',
    detail: 'The iconic Lakshmi Narasimha Swami Temple is a cornerstone of Attiguppe\'s cultural identity. Believed to be established by Rishi Durvasa, the temple was renovated in the 17th century and remains the spiritual heart of the community.',
    distance: '0.4 km',
    color: 'orange',
    frontImg: 'https://content.jdmagicbox.com/comp/bangalore/w7/080pxx80.xx80.191120193649.y4w7/catalogue/lakshminarasimha-temple-chandra-layout-bangalore-temples-5j4p5sda9x.jpg',
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
    detail: 'Government Model High School, Attiguppe also known as Government High School PU College, RP Layout, Vijayanagar has been educating the local community for generations. Venue for the Free Health Camp organised by ARWA.',
    distance: '0.6 km',
    color: 'green',
    frontImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Vijayanagar%2C_Bangalore.jpg/1280px-Vijayanagar%2C_Bangalore.jpg',
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
    detail: 'The vibrant Vijayanagar Market is one of the busiest commercial hubs in west Bengaluru, offering everything from fresh vegetables and fruits to clothing, hardware, and street food. Easily accessible from Attiguppe.',
    distance: '0.8 km',
    color: 'red',
    frontImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/KR_Market_Bangalore.jpg/1280px-KR_Market_Bangalore.jpg',
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
  { title: 'Community Unity', desc: 'Encouraging cooperation and active participation among all residents of Attiguppe.', color: 'blue' },
  { title: 'Clean & Green Living', desc: 'Promoting cleanliness and sustainability in our neighbourhood for a better tomorrow.', color: 'green' },
  { title: 'Social Responsibility', desc: 'Supporting seniors, vulnerable groups, and standing together in times of need.', color: 'orange' },
]

const historyHighlights = [
  {
    year: '15th–16th C',
    title: 'Vijayanagara Roots',
    desc: 'The name Attiguppe traces back to the Vijayanagara Empire. Atti means paddy and Gupe means heap, reflecting its agricultural roots.',
    color: 'orange',
  },
  {
    year: '17th C',
    title: 'Lakshmi Narasimha Temple',
    desc: 'The Lakshmi Narasimha Temple was renovated and became a cornerstone of Attiguppe cultural identity.',
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total])

  return { idx, go }
}

// ─── COMPONENT ──────────────────────────────────────────────────────────────

export default function Home() {
  const { idx, go } = useCarousel(galleryImages.length)
  const [showInternship, setShowInternship] = useState(false)
  const [flippedCard, setFlippedCard] = useState(null)
  const touchStarted = useRef(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowInternship(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="home-page">

      {/* ── INTERNSHIP POPUP ── */}
      {showInternship && (
        <div className="internship-overlay" onClick={() => setShowInternship(false)}>
          <div className="internship-popup" onClick={e => e.stopPropagation()}>
            <button className="internship-close" onClick={() => setShowInternship(false)} aria-label="Close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            <div className="internship-popup-body">
              <div className="internship-popup-badge">Internship Opportunity</div>
              <h2 className="internship-popup-title">Join ARWA as an Intern!</h2>
              <p className="internship-popup-sub">
                Are you passionate about community development, civic engagement, and creating real impact at the grassroots level?
              </p>
              <div className="internship-popup-gains">
                <div className="intern-gain-item">
                  <span className="intern-gain-icon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22V10" />
                      <path d="M6 14c0-4 2-6 6-8 4 2 6 4 6 8" />
                    </svg>
                  </span>
                  <span>Practical exposure to community challenges</span>
                </div>
                <div className="intern-gain-item">
                  <span className="intern-gain-icon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M8 12l3 3 5-5" />
                      <path d="M4 12a8 8 0 0 1 16 0" />
                    </svg>
                  </span>
                  <span>Work closely with community leaders</span>
                </div>
                <div className="intern-gain-item">
                  <span className="intern-gain-icon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="9" r="4" />
                      <path d="M10 17h4" />
                      <path d="M9 21h6" />
                    </svg>
                  </span>
                  <span>Develop leadership &amp; communication skills</span>
                </div>
              </div>
              <p className="internship-popup-contact">
                <strong>Dr. Chandana Pradeep</strong> President<br />
                <a href="tel:+919986020447">+91 9986020447</a>
              </p>
              <div className="internship-popup-actions">
                <a href="tel:+919986020447" className="btn btn-primary">Get in Touch</a>
                <button className="btn btn-outline" onClick={() => setShowInternship(false)}>Maybe Later</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-video-wrapper">
          <img
            className="hero-bg-img"
            src="https://assets-news.housing.com/news/wp-content/uploads/2020/12/01163300/Bengaluru%E2%80%99s-Vidhana-Soudha-could-be-worth-over-Rs-3900-crores-FB-1200x700-compressed.jpg"
            alt="Attiguppe neighbourhood"
            onError={e => { e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Vidhana_Soudha%2C_Bangalore.jpg/1280px-Vidhana_Soudha%2C_Bangalore.jpg' }}
          />
          <div className="hero-overlay" />
        </div>

        <div className="hero-content container hero-center">
          <div className="hero-logo-wrap">
            <img
              src="/assets/arwa-logo.png"
              alt="ARWA"
              className="hero-logo-img"
              onError={e => { e.target.style.display = 'none' }}
            />
          </div>
          <h1 className="hero-title">
            Your Neighbourhood,<br />
            <span className="hero-accent">Your Community</span>
          </h1>
          <p className="hero-sub">
            Working together to build a cleaner, safer, and more vibrant neighbourhood for every resident of Attiguppe. By the people, for the people, and with the people.
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
              The Attiguppe Residents Welfare Association (ARWA) is the backbone of neighbourhood governance, welfare, and celebration. We represent every household in Attiguppe, working tirelessly to resolve civic issues, organise events, and foster lasting friendships.
            </p>
            <p className="about-para">
              From free health camps to cultural festivals and Women's Wing initiatives, we bridge the gap between residents and local authorities while keeping the spirit of community alive.
            </p>
            <Link to="/about" className="btn btn-primary">Learn More About Us</Link>
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

      {/* ── OUR VISION & MISSION ── */}
      <section className="section mission-section">
        <div className="container">
          <div className="section-head center">
            <span className="badge badge-green">What Drives Us</span>
            <div className="divider divider-center" />
            <h2 className="section-title">Our Vision &amp; Mission</h2>
          </div>
          <div className="mission-grid">
            <div className="mission-card mission-vision">
              <div className="mission-icon" aria-hidden="true">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m12 2 2.8 5.7L21 8.6l-4.5 4.4 1.1 6.2L12 16.8 6.4 19.2l1.1-6.2L3 8.6l6.2-.9L12 2z" />
                </svg>
              </div>
              <h3>Our Vision</h3>
              <p>To build a well-organised, safe, clean, and inclusive neighbourhood where every resident enjoys overall well-being, mutual respect, and a strong sense of belonging, while fostering sustainable living and social harmony.</p>
            </div>
            <div className="mission-card mission-mission">
              <div className="mission-icon" aria-hidden="true">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="12" cy="12" r="1.5" />
                </svg>
              </div>
              <h3>Our Mission</h3>
              <ul className="mission-list">
                <li><span>01</span> Community unity through active resident participation.</li>
                <li><span>02</span> Effective representation between residents and authorities.</li>
                <li><span>03</span> Collective voice to protect resident rights and welfare.</li>
                <li><span>04</span> Clean and green living through sustainable habits.</li>
                <li><span>05</span> Cultural and social engagement across all groups.</li>
                <li><span>06</span> Social responsibility for seniors and vulnerable residents.</li>
              </ul>
            </div>
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

      {/* ── PAST EVENTS ── */}
      <section className="section events-section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="badge badge-blue">Recent Activities</span>
              <div className="divider" />
              <h2 className="section-title">Past Events</h2>
              <p className="section-subtitle">A look at what we have been doing for the community.</p>
            </div>
            <Link to="/events" className="btn btn-outline">View All Events</Link>
          </div>

          <div className="events-grid">
            {pastEvents.map((ev) => (
              <Link to="/events" key={ev.id} className={`event-card event-${ev.color}`}>
                <div className="event-date-block">
                  <span className="event-month">{ev.month}</span>
                  <span className="event-day">{ev.day}</span>
                  <span className="event-year">{ev.year}</span>
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

      {/* ── NEARBY PLACES FLIP CARDS ── */}
      <section className="section places-section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="badge badge-blue">Around You</span>
              <div className="divider" />
              <h2 className="section-title">Nearby Attractions</h2>
              <p className="section-subtitle">Tap on mobile or hover on desktop to explore what Attiguppe has to offer.</p>
            </div>
            <Link to="/places" className="btn btn-outline">See All Places</Link>
          </div>

          <div className="places-flip-grid">
            {nearbyPlaces.map((place) => (
              <div
                key={place.id}
                className={`flip-card${flippedCard === place.id ? ' flipped' : ''}`}
                onClick={() => {
                  if (touchStarted.current) {
                    touchStarted.current = false
                    return
                  }
                  setFlippedCard(flippedCard === place.id ? null : place.id)
                }}
                onTouchStart={() => {
                  touchStarted.current = true
                  setFlippedCard(flippedCard === place.id ? null : place.id)
                }}
                onMouseEnter={() => setFlippedCard(place.id)}
                onMouseLeave={() => setFlippedCard(null)}
              >
                <div className="flip-card-inner">
                  {/* Front */}
                  <div className="flip-front">
                    <img src={place.frontImg} alt={place.name} loading="lazy" className="flip-front-img" />
                    <div className="flip-front-overlay">
                      <div className={`place-icon-wrap icon-${place.color}`}>{place.icon}</div>
                      <div className="flip-front-meta">
                        <span className="place-category">{place.category}</span>
                        <span className="place-distance">{place.distance}</span>
                      </div>
                      <h3 className="flip-front-name">{place.name}</h3>
                      <p className="flip-front-desc">{place.desc}</p>
                    </div>
                  </div>
                  {/* Back */}
                  <div className={`flip-back flip-back-${place.color}`}>
                    <div className={`flip-back-icon icon-${place.color}`}>{place.icon}</div>
                    <h3 className="flip-back-name">{place.name}</h3>
                    <span className="place-distance flip-back-dist">{place.distance} away</span>
                    <p className="flip-back-detail">{place.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WOMEN'S WING ── */}
      <section className="section womens-wing-section">
        <div className="container">
          <div className="womens-wing-card">
            <div className="ww-text">
              <span className="badge badge-green">Newly Launched</span>
              <h2>Women's Wing</h2>
              <p>ARWA proudly announces the formation of the <strong>Women's Wing</strong>, a platform for women to lead, share, and grow together. Empower. Inspire. Connect.</p>
              <ul className="ww-pillars">
                <li>Community &amp; Cultural Activities</li>
                <li>Safety &amp; Support Initiatives</li>
                <li>Health &amp; Wellness Programs</li>
                <li>Skill Development &amp; Empowerment</li>
              </ul>
              <p className="ww-invite">All interested women residents are welcome!</p>
              <a href="https://www.instagram.com/attiguppe_residents/" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Follow Us on Instagram</a>
            </div>
            <div className="ww-visual">
              <div className="ww-icon-wrap">
                <span className="ww-big-icon" aria-hidden="true">
                  <svg width="84" height="84" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="7" cy="7" r="2.5" />
                    <circle cx="17" cy="7" r="2.5" />
                    <path d="M3 20v-2a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v2" />
                    <path d="M13 20v-2a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v2" />
                  </svg>
                </span>
                <div className="ww-badge">New</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INSTAGRAM FEED CTA ── */}
      <section className="section insta-section">
        <div className="container">
          <div className="section-head center">
            <span className="badge badge-blue">Stay Connected</span>
            <div className="divider divider-center" />
            <h2 className="section-title">Follow Us on Instagram</h2>
            <p className="section-subtitle">Stay updated with our latest events and community news.</p>
          </div>
          <div className="insta-cta-wrap">
            <a
              href="https://www.instagram.com/attiguppe_residents/"
              target="_blank"
              rel="noopener noreferrer"
              className="insta-cta-btn"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
              @attiguppe_residents
            </a>
            <p className="insta-handle-note">51+ followers | 9 posts | Events, health camps, and community updates</p>
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
