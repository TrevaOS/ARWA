import { useMemo, useState } from 'react'
import './Career.css'
import { careerOpportunities } from '../data/content'

export default function Career() {
  const [filter, setFilter] = useState('all')

  const filtered = useMemo(
    () => careerOpportunities.filter((item) => (filter === 'all' ? true : item.status === filter)),
    [filter],
  )

  return (
    <div className="career-page">
      <section className="page-hero">
        <div className="container">
          <span className="badge badge-green">Join The Mission</span>
          <h1>Career Opportunities</h1>
          <p>All ARWA job and internship opportunities will be posted here.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="career-filter">
            {['all', 'open', 'closed'].map((tab) => (
              <button
                key={tab}
                className={`filter-btn${filter === tab ? ' active' : ''}`}
                onClick={() => setFilter(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="career-list">
            {filtered.map((item) => (
              <article key={item.id} className="career-card">
                <div className="career-image-wrap">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = item.fallbackImage
                    }}
                  />
                  <span className={`career-status ${item.status}`}>{item.status}</span>
                </div>

                <div className="career-content">
                  <div className="career-meta">
                    <span className="career-type">{item.type}</span>
                    <span>Posted: {item.postedOn}</span>
                  </div>

                  <h2>{item.title}</h2>
                  <p className="career-team">{item.team}</p>
                  <p>{item.summary}</p>
                  <p>{item.description}</p>

                  <div className="career-info-grid">
                    <div><strong>Location:</strong> {item.location}</div>
                    <div><strong>Mode:</strong> {item.mode}</div>
                    <div><strong>Duration:</strong> {item.duration}</div>
                  </div>

                  <div className="career-block">
                    <h3>Who Can Apply?</h3>
                    <ul>
                      {item.whoCanApply.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="career-block">
                    <h3>What You Gain</h3>
                    <ul>
                      {item.gains.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="career-contact">
                    <p>
                      <strong>{item.contactName}</strong> ({item.contactRole})
                    </p>
                    <a href={`tel:${item.contactPhone.replace(/\s+/g, '')}`}>{item.contactPhone}</a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="career-empty">No opportunities in this status right now. Please check back soon.</div>
          )}
        </div>
      </section>
    </div>
  )
}
