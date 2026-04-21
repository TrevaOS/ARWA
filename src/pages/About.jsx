import './About.css'

export default function About() {
  return (
    <div className="about-page">
      <section className="page-hero">
        <div className="container">
          <span className="badge badge-green">Our Story</span>
          <h1>About Our Association</h1>
          <p>By the people, for the people, and with the people serving the residents of Attiguppe, Bengaluru.</p>
        </div>
      </section>

      <section className="section">
        <div className="container about-story">
          <div className="story-text">
            <span className="badge badge-blue">Who We Are</span>
            <div className="divider" />
            <h2 className="section-title">Built by Residents, for Residents</h2>
            <p>
              The Attiguppe Residents Welfare Association (ARWA) is a registered community organisation serving the residents of Attiguppe, West Bengaluru. We are committed to building a well organised, safe, clean, and inclusive neighbourhood where every resident enjoys overall well being and a strong sense of belonging.
            </p>
            <p>
              From free health camps and cultural festivals to the Women's Wing, ARWA engages with residents to address civic issues, celebrate milestones, and foster lasting community bonds.
            </p>
            <p>
              Our structure is democratic and transparent. Every decision is made collectively. Every rupee is accounted for. Every voice matters.
            </p>
          </div>
          <div className="story-visual">
            <div className="story-img-wrap">
              <img
                src="/assets/arwa-logo.png"
                alt="ARWA Logo"
                loading="lazy"
                className="about-logo-img"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section team-section">
        <div className="container">
          <div className="section-head center">
            <span className="badge badge-green">Leadership</span>
            <div className="divider divider-center" />
            <h2 className="section-title">Our Leadership</h2>
            <p className="section-subtitle">Dedicated individuals leading the community forward.</p>
          </div>

          <div className="team-grid team-grid-centered">
            <div className="team-card team-blue">
              <div className="team-avatar avatar-blue">
                <span>CP</span>
              </div>
              <div className="team-info">
                <div className="team-role role-blue">President</div>
                <h3 className="team-name">Dr. Chandana Pradeep</h3>
                <p className="team-bio">
                  Leading the association with a vision to build a stronger, healthier, and more connected community. Dr. Chandana Pradeep leads the Internship Programme, Women's Wing, and community welfare initiatives.
                </p>
                <div className="team-contact">
                  <a href="tel:+919986020447" className="team-phone">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                    </svg>
                    +91 9986020447
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section womens-wing-about">
        <div className="container">
          <div className="section-head center">
            <span className="badge badge-green">Newly Launched</span>
            <div className="divider divider-center" />
            <h2 className="section-title">Women's Wing</h2>
            <p className="section-subtitle">A platform for women to lead, share, and grow together.</p>
          </div>
          <div className="ww-about-card">
            <div className="ww-about-header">
              <span className="ww-about-icon" aria-hidden="true">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="7" cy="7" r="2.5" />
                  <circle cx="17" cy="7" r="2.5" />
                  <path d="M3 20v-2a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v2" />
                  <path d="M13 20v-2a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v2" />
                </svg>
              </span>
              <div>
                <h3>Empower | Inspire | Connect</h3>
                <p>ARWA has launched its Women's Wing, a dedicated platform for the women of Attiguppe to come together, lead community initiatives, and support each other.</p>
              </div>
            </div>
            <div className="ww-about-pillars">
              <div className="ww-pillar-item">
                <span className="ww-pillar-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19h16"/><path d="M4 5l8 6 8-6"/><path d="M8 11v8"/><path d="M16 11v8"/></svg></span>
                <div><strong>Community and Cultural Activities</strong><p>Celebrate traditions, festivals, and cultural milestones together.</p></div>
              </div>
              <div className="ww-pillar-item">
                <span className="ww-pillar-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z"/></svg></span>
                <div><strong>Safety and Support Initiatives</strong><p>Advocate for women's safety and welfare in the neighbourhood.</p></div>
              </div>
              <div className="ww-pillar-item">
                <span className="ww-pillar-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 4h6v16H9z"/><path d="M4 9h16v6H4z"/></svg></span>
                <div><strong>Health and Wellness Programs</strong><p>Organise health camps, screenings, and wellness workshops.</p></div>
              </div>
              <div className="ww-pillar-item">
                <span className="ww-pillar-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="7" width="18" height="12" rx="2"/><path d="M8 7V5h8v2"/></svg></span>
                <div><strong>Skill Development and Empowerment</strong><p>Foster growth through skill building and leadership programmes.</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head center">
            <span className="badge badge-blue">Our Purpose</span>
            <div className="divider divider-center" />
            <h2 className="section-title">Vision and Mission</h2>
          </div>
          <div className="about-vm-grid">
            <div className="about-vm-card">
              <div className="about-vm-icon"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m12 2 2.8 5.7L21 8.6l-4.5 4.4 1.1 6.2L12 16.8 6.4 19.2l1.1-6.2L3 8.6l6.2-.9L12 2z" /></svg></div>
              <h3>Our Vision</h3>
              <p>To build a well organised, safe, clean, and inclusive neighbourhood where every resident enjoys overall well being, mutual respect, and a strong sense of belonging.</p>
            </div>
            <div className="about-vm-card">
              <div className="about-vm-icon"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/></svg></div>
              <h3>Our Mission</h3>
              <ul className="about-mission-list">
                <li>Community unity through active participation.</li>
                <li>Effective representation between residents and authorities.</li>
                <li>Collective voice to protect residents' rights and welfare.</li>
                <li>Clean and green living through sustainability.</li>
                <li>Community engagement through cultural and social activities.</li>
                <li>Social responsibility for seniors and vulnerable groups.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
