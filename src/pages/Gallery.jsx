import { useState } from 'react'
import './Gallery.css'

const categories = ['All', 'Events', 'Community', 'Health', 'Cultural', 'Heritage']

const images = [
  { id: 1, src: 'https://content.jdmagicbox.com/comp/bangalore/w7/080pxx80.xx80.191120193649.y4w7/catalogue/lakshminarasimha-temple-chandra-layout-bangalore-temples-5j4p5sda9x.jpg', alt: 'Lakshmi Narasimha Temple, Attiguppe', cat: 'Heritage' },
  { id: 2, src: 'https://i.ytimg.com/vi/W7Y46BawnhM/maxresdefault.jpg', alt: 'Lakshmi Narasimha Swami Temple', cat: 'Heritage' },
  { id: 3, src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800', alt: 'Free Health Camp 2026', cat: 'Health' },
  { id: 4, src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800', alt: "Women's Day Celebration", cat: 'Cultural' },
  { id: 5, src: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800', alt: 'Saree Walkathon 2026', cat: 'Cultural' },
  { id: 6, src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', alt: "Women's Wing Launch", cat: 'Community' },
  { id: 7, src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800', alt: 'Community Gathering', cat: 'Events' },
  { id: 8, src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800', alt: 'Community Meeting', cat: 'Community' },
  { id: 9, src: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800', alt: 'Government School, Attiguppe', cat: 'Community' },
  { id: 10, src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800', alt: 'ARWA Planning Session', cat: 'Community' },
  { id: 11, src: 'https://images.unsplash.com/photo-1559067096-49ebca3406aa?w=800', alt: 'Cleanliness Drive', cat: 'Events' },
  { id: 12, src: 'https://images.unsplash.com/photo-1601758177266-bc599de87707?w=800', alt: 'Republic Day Celebration', cat: 'Events' },
]

export default function Gallery() {
  const [cat, setCat] = useState('All')
  const [lightbox, setLightbox] = useState(null)

  const filtered = images.filter(img => cat === 'All' || img.cat === cat)

  const open = (img) => setLightbox(img)
  const close = () => setLightbox(null)
  const prev = () => {
    const i = filtered.findIndex(x => x.id === lightbox.id)
    setLightbox(filtered[(i - 1 + filtered.length) % filtered.length])
  }
  const next = () => {
    const i = filtered.findIndex(x => x.id === lightbox.id)
    setLightbox(filtered[(i + 1) % filtered.length])
  }

  return (
    <div className="gallery-page">

      <section className="page-hero">
        <div className="container">
          <span className="badge badge-blue">Our Memories</span>
          <h1>Photo Gallery</h1>
          <p>Moments captured from our events, celebrations, and community initiatives in Attiguppe.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">

          <div className="gallery-cats">
            {categories.map(c => (
              <button
                key={c}
                className={`filter-btn${cat === c ? ' active' : ''}`}
                onClick={() => setCat(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="gallery-grid">
            {filtered.map(img => (
              <div
                key={img.id}
                className="gallery-item"
                onClick={() => open(img)}
              >
                <img src={img.src} alt={img.alt} loading="lazy" />
                <div className="gallery-item-overlay">
                  <span className="gallery-item-label">{img.alt}</span>
                  <span className="gallery-item-cat">{img.cat}</span>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="gallery-empty">No photos in this category yet.</div>
          )}

          <div className="gallery-insta-note">
            <p>
              See more photos and updates on our Instagram.{' '}
              <a href="https://www.instagram.com/attiguppe_residents/" target="_blank" rel="noopener noreferrer">
                @attiguppe_residents
              </a>
            </p>
          </div>
        </div>
      </section>

      {lightbox && (
        <div className="lightbox-overlay" onClick={close}>
          <div className="lightbox-box" onClick={e => e.stopPropagation()}>
            <button className="lightbox-close" onClick={close} aria-label="Close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            <button className="lightbox-nav prev" onClick={prev} aria-label="Previous">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <img src={lightbox.src} alt={lightbox.alt} className="lightbox-img" />
            <button className="lightbox-nav next" onClick={next} aria-label="Next">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
            <div className="lightbox-caption">{lightbox.alt}</div>
          </div>
        </div>
      )}
    </div>
  )
}

