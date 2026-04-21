import { useState } from 'react'
import './Events.css'
import { allEvents } from '../data/content'

export default function Events() {
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)

  const filtered = allEvents.filter((e) => (filter === 'all' ? true : e.status === filter))

  return (
    <div className="events-page">
      <section className="page-hero">
        <div className="container">
          <span className="badge badge-green">Stay Connected</span>
          <h1>Events</h1>
          <p>Community events and activities organised by ARWA for the residents of Attiguppe.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="events-filter">
            {['all', 'upcoming', 'past'].map((tab) => (
              <button
                key={tab}
                className={`filter-btn${filter === tab ? ' active' : ''}`}
                onClick={() => setFilter(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)} Events
              </button>
            ))}
          </div>

          <div className="events-list">
            {filtered.map((event) => (
              <div
                key={event.id}
                className={`event-list-card ev-${event.color}${event.status === 'past' ? ' past' : ''}`}
                onClick={() => setSelected(event)}
              >
                <div className="elc-image">
                  <img src={event.image} alt={event.title} loading="lazy" />
                  {event.status === 'upcoming' && <span className="ev-upcoming-badge">Upcoming</span>}
                  {event.status === 'past' && <span className="ev-past-badge">Completed</span>}
                </div>
                <div className="elc-body">
                  <div className="elc-meta">
                    <span className={`event-tag tag-${event.color}`}>{event.category}</span>
                    <span className="elc-status">{event.status === 'past' ? 'Completed' : 'Upcoming'}</span>
                  </div>
                  <h3 className="elc-title">{event.title}</h3>
                  <p className="elc-summary">{event.summary}</p>
                  <div className="elc-details">
                    <div className="elc-detail-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      {event.date}
                    </div>
                    <div className="elc-detail-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      {event.time}
                    </div>
                    <div className="elc-detail-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {event.venue}
                    </div>
                  </div>
                  <button className="elc-readmore">Read Full Details</button>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="events-empty">
              <p>No {filter} events at the moment. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)} aria-label="Close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="modal-img">
              <img src={selected.image} alt={selected.title} />
              <div className="modal-img-overlay" />
            </div>
            <div className="modal-content">
              <div className="modal-meta">
                <span className={`event-tag tag-${selected.color}`}>{selected.category}</span>
                <span className={`modal-status${selected.status === 'upcoming' ? ' upcoming' : ''}`}>
                  {selected.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                </span>
              </div>
              <h2 className="modal-title">{selected.title}</h2>
              <div className="modal-info-row">
                <div className="modal-info-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  {selected.date}
                </div>
                <div className="modal-info-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {selected.time}
                </div>
                <div className="modal-info-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {selected.venue}
                </div>
                <div className="modal-info-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87" />
                    <path d="M16 3.13a4 4 0 010 7.75" />
                  </svg>
                  {selected.organiser}
                </div>
              </div>
              <div className="modal-description">
                {selected.description.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
