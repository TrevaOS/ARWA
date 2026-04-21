import { useMemo, useState } from 'react'
import './Gallery.css'
import { websiteImages } from '../data/content'

export default function Gallery() {
  const [cat, setCat] = useState('All')
  const [lightbox, setLightbox] = useState(null)

  const categories = useMemo(() => {
    const dynamic = Array.from(new Set(websiteImages.map((img) => img.cat)))
    return ['All', ...dynamic]
  }, [])

  const filtered = websiteImages.filter((img) => cat === 'All' || img.cat === cat)

  const open = (img) => setLightbox(img)
  const close = () => setLightbox(null)
  const prev = () => {
    const i = filtered.findIndex((x) => x.id === lightbox.id)
    setLightbox(filtered[(i - 1 + filtered.length) % filtered.length])
  }
  const next = () => {
    const i = filtered.findIndex((x) => x.id === lightbox.id)
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
            {categories.map((c) => (
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
            {filtered.map((img) => (
              <div key={img.id} className="gallery-item" onClick={() => open(img)}>
                <img src={img.src} alt={img.alt} loading="lazy" />
                <div className="gallery-item-overlay">
                  <span className="gallery-item-label">{img.alt}</span>
                  <span className="gallery-item-cat">{img.cat}</span>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && <div className="gallery-empty">No photos in this category yet.</div>}

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
          <div className="lightbox-box" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={close} aria-label="Close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <button className="lightbox-nav prev" onClick={prev} aria-label="Previous">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <img src={lightbox.src} alt={lightbox.alt} className="lightbox-img" />
            <button className="lightbox-nav next" onClick={next} aria-label="Next">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
            <div className="lightbox-caption">{lightbox.alt}</div>
          </div>
        </div>
      )}
    </div>
  )
}
