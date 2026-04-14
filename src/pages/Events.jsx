import { useState } from 'react'
import './Events.css'


const allEvents = [
  {
    id: 1,
    status: 'upcoming',
    title: 'Annual Community Gathering',
    date: '15 April 2025',
    time: '5:00 PM onwards',
    venue: 'Community Hall, Block A',
    category: 'Community',
    color: 'blue',
    summary: 'Join us for our yearly get-together with cultural performances, food stalls, and exciting activities for all ages.',
    description: `Our Annual Community Gathering is the most awaited event of the year. This year, we have planned a spectacular evening featuring traditional dance performances, live music, a community food festival showcasing dishes from families across our neighbourhood, and exciting games for children and adults alike.

The event will also include a felicitation ceremony to honour residents who have made exceptional contributions to our community this year. Local vendors will be setting up stalls, making it a vibrant evening bazaar.

Entry is free for all registered members. Non-members can register at the gate for a nominal fee. We request all residents to come in traditional attire to celebrate the spirit of our cultural diversity.`,
    organiser: 'Cultural Committee',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800',
  },
  {
    id: 2,
    status: 'upcoming',
    title: 'Cleanliness Drive',
    date: '28 April 2025',
    time: '7:00 AM to 10:00 AM',
    venue: 'Starting from Central Park Gate',
    category: 'Environment',
    color: 'green',
    summary: 'A neighbourhood-wide initiative to keep our streets clean and green.',
    description: `Join hundreds of your fellow residents in our biggest cleanliness drive of the year. Armed with gloves, bags, and community spirit, we will clean all major streets, lanes, and public spaces in our area.

This year we are also planting 200 saplings across the neighbourhood to mark Earth Day. Participants will receive a commemorative badge and a free sapling to take home.

All equipment will be provided. Just bring your enthusiasm! Light refreshments will be served to all volunteers post the drive. Children are encouraged to participate with parental supervision.`,
    organiser: 'Environment Committee',
    image: 'https://images.unsplash.com/photo-1559067096-49ebca3406aa?w=800',
  },
  {
    id: 3,
    status: 'upcoming',
    title: 'Health and Wellness Camp',
    date: '10 May 2025',
    time: '9:00 AM to 2:00 PM',
    venue: 'Multi-purpose Ground, Block C',
    category: 'Health',
    color: 'orange',
    summary: 'Free health check-ups, yoga sessions, and consultations with doctors.',
    description: `In collaboration with City Medical College, we are organising a comprehensive health camp for all residents. Services include free blood pressure, blood sugar, and BMI checks; eye tests; dental screenings; and one-on-one consultations with specialist doctors.

A yoga session will be conducted from 9:00 AM to 10:00 AM by a certified yoga instructor. Nutrition counselling and mental health awareness sessions will also be held throughout the day.

All services are completely free of charge for residents. Bring your health booklet or any prior medical records if available.`,
    organiser: 'Health Committee',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
  },
  {
    id: 4,
    status: 'past',
    title: 'Republic Day Celebration',
    date: '26 January 2025',
    time: '8:00 AM',
    venue: 'Community Hall, Block A',
    category: 'National',
    color: 'blue',
    summary: 'Flag hoisting ceremony and patriotic cultural programmes.',
    description: `We celebrated Republic Day with great patriotic fervour. The flag hoisting was followed by renditions of patriotic songs, a march past by children, and speeches by our President and guest dignitaries from the local municipal council.

The event concluded with distribution of sweets to all attendees and a special prize ceremony for winners of the Republic Day poster-making competition held the previous week.`,
    organiser: 'Cultural Committee',
    image: 'https://images.unsplash.com/photo-1601758177266-bc599de87707?w=800',
  },
  {
    id: 5,
    status: 'past',
    title: 'Winter Sports Meet',
    date: '18 December 2024',
    time: '8:00 AM to 6:00 PM',
    venue: 'Community Grounds',
    category: 'Sports',
    color: 'green',
    summary: 'Inter-block cricket, badminton, carrom, and chess competitions.',
    description: `Our annual sports meet witnessed fierce but friendly competition between teams from all six blocks of our neighbourhood. Over 300 participants registered across different sports categories.

Block D clinched the overall championship trophy while Block B won the spirit award. Medals and certificates were distributed to all participants. The event was followed by a grand dinner for all players and their families.`,
    organiser: 'Sports Committee',
    image: 'https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?w=800',
  },
  {
    id: 6,
    status: 'past',
    title: 'Diwali Mela',
    date: '1 November 2024',
    time: '6:00 PM onwards',
    venue: 'Central Park',
    category: 'Festival',
    color: 'orange',
    summary: 'A grand festival of lights with fireworks, food, and cultural events.',
    description: `This year's Diwali Mela was a spectacular celebration attended by over 2000 residents. The park was lit up with thousands of diyas and decorative lights, creating a magical atmosphere.

Highlights included a rangoli competition, folk dance performances, food stalls by resident families, and a stunning fireworks display at 9:00 PM. The event raised funds for the community welfare fund through a charity auction.`,
    organiser: 'Cultural Committee',
    image: 'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=800',
  },
]

export default function Events() {
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)

  const filtered = allEvents.filter(e =>
    filter === 'all' ? true : e.status === filter
  )

  return (
    <div className="events-page">

      <section className="page-hero">
        <div className="container">
          <span className="badge badge-green">Stay Connected</span>
          <h1>Events</h1>
          <p>Upcoming and past events from our community calendar.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">

          {/* Filter tabs */}
          <div className="events-filter">
            {['all', 'upcoming', 'past'].map(tab => (
              <button
                key={tab}
                className={`filter-btn${filter === tab ? ' active' : ''}`}
                onClick={() => setFilter(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)} Events
              </button>
            ))}
          </div>

          {/* Events list */}
          <div className="events-list">
            {filtered.map(event => (
              <div
                key={event.id}
                className={`event-list-card ev-${event.color}${event.status === 'past' ? ' past' : ''}`}
                onClick={() => setSelected(event)}
              >
                <div className="elc-image">
                  <img src={event.image} alt={event.title} loading="lazy" />
                  {event.status === 'upcoming' && (
                    <span className="ev-upcoming-badge">Upcoming</span>
                  )}
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
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                      {event.date}
                    </div>
                    <div className="elc-detail-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                      </svg>
                      {event.time}
                    </div>
                    <div className="elc-detail-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      {event.venue}
                    </div>
                  </div>
                  <button className="elc-readmore">Read Full Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Detail Modal */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)} aria-label="Close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
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
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  {selected.date}
                </div>
                <div className="modal-info-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  {selected.time}
                </div>
                <div className="modal-info-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  {selected.venue}
                </div>
                <div className="modal-info-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 00-3-3.87"/>
                    <path d="M16 3.13a4 4 0 010 7.75"/>
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