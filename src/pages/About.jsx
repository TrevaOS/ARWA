import './About.css'

/*
 * NOTE: Team member details and full founding year are pending confirmation.
 * The confirmed president is Dr. Chandana Pradeep (per official communication).
 * Update this file with full committee details once available from ARWA leadership.
 */

export default function About() {
  return (
    <div className="about-page">

      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <span className="badge badge-green">Our Story</span>
          <h1>About Our Association</h1>
          <p>By the people, for the people, with the people serving the residents of Attiguppe, Bengaluru.</p>
        </div>
      </section>

      {/* Logo + Story */}
      <section className="section">
        <div className="container about-story">
          <div className="story-text">
            <span className="badge badge-blue">Who We Are</span>
            <div className="divider" />
            <h2 className="section-title">Built by Residents, for Residents</h2>
            <p>
              The Attiguppe Residents Welfare Association (ARWA) is a registered community organisation serving the residents of Attiguppe, West Bengaluru. We are committed to building a well-organised, safe, clean, and inclusive neighbourhood where every resident enjoys overall well-being and a strong sense of belonging.
            </p>
            <p>
              From organising free health camps and cultural festivals to launching the Women's Wing, ARWA actively engages with residents to address civic issues, celebrate milestones, and foster lasting community bonds.
            </p>
            <p>
              Our structure is democratic and transparent. Every decision is made collectively, every rupee is accounted for, and every voice matters because together, we build a healthier, happier, and responsible neighbourhood.
            </p>
          </div>
          <div className="story-visual">
            <div className="story-img-wrap">
              <img
                src="/assets/arwa-logo.png"
                alt="ARWA Logo"
                loading="lazy"
                className="about-logo-img"
                onError={e => {
                  e.target.src = 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=700'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
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
                  Leading the Attiguppe Residents Welfare Association with a vision to build a stronger, healthier, and more connected community. Dr. Chandana Pradeep spearheads initiatives including the Internship Programme, Women's Wing, and community welfare activities.
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

          <div className="team-note">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4M12 8h.01"/>
            </svg>
            <p>Full committee details will be updated here. Contact us for more information about our executive committee.</p>
          </div>
        </div>
      </section>

      {/* Women's Wing */}
      <section className="section womens-wing-about">
        <div className="container">
          <div className="section-head center">
            <span className="badge badge-green">Newly Launched</span>
            <div className="divider divider-center" />
            <h2 className="section-title">Women's Wing</h2>
            <p className="section-subtitle">A platform for women to lead, share and grow together.</p>
          </div>
          <div className="ww-about-card">
            <div className="ww-about-header">
              <span className="ww-about-emoji">👩‍👩‍👧‍👦</span>
              <div>
                <h3>Empower · Inspire · Connect</h3>
                <p>ARWA has recently launched its Women's Wing a dedicated platform for the women of Attiguppe to come together, lead community initiatives, and support each other.</p>
              </div>
            </div>
            <div className="ww-about-pillars">
              <div className="ww-pillar-item">
                <span>🎭</span>
                <div>
                  <strong>Community &amp; Cultural Activities</strong>
                  <p>Celebrate traditions, festivals, and cultural milestones together.</p>
                </div>
              </div>
              <div className="ww-pillar-item">
                <span>🛡️</span>
                <div>
                  <strong>Safety &amp; Support Initiatives</strong>
                  <p>Advocate for women's safety and welfare in the neighbourhood.</p>
                </div>
              </div>
              <div className="ww-pillar-item">
                <span>🏥</span>
                <div>
                  <strong>Health &amp; Wellness Programs</strong>
                  <p>Organise health camps, screenings, and wellness workshops.</p>
                </div>
              </div>
              <div className="ww-pillar-item">
                <span>💼</span>
                <div>
                  <strong>Skill Development &amp; Empowerment</strong>
                  <p>Foster growth through skill-building and leadership programmes.</p>
                </div>
              </div>
            </div>
            <p className="ww-about-invite">All interested women residents are encouraged to join. Together, let us build a stronger and more vibrant community!</p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section">
        <div className="container">
          <div className="section-head center">
            <span className="badge badge-blue">Our Purpose</span>
            <div className="divider divider-center" />
            <h2 className="section-title">Vision &amp; Mission</h2>
          </div>
          <div className="about-vm-grid">
            <div className="about-vm-card">
              <div className="about-vm-icon">🌟</div>
              <h3>Our Vision</h3>
              <p>To build a well-organised, safe, clean, and inclusive neighbourhood where every resident enjoys overall well-being, mutual respect, and a strong sense of belonging, while fostering sustainable living and social harmony.</p>
            </div>
            <div className="about-vm-card">
              <div className="about-vm-icon">🎯</div>
              <h3>Our Mission</h3>
              <ul className="about-mission-list">
                <li>Community Unity encourage cooperation &amp; active participation</li>
                <li>Effective Representation bridge between residents &amp; authorities</li>
                <li>Collective Voice safeguard residents' rights &amp; welfare</li>
                <li>Clean &amp; Green Living promote cleanliness &amp; sustainability</li>
                <li>Community Engagement organise cultural &amp; social activities</li>
                <li>Social Responsibility support seniors &amp; vulnerable groups</li>
                <li>Awareness &amp; Safety promote civic &amp; environmental awareness</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="section about-insta-section">
        <div className="container">
          <div className="about-insta-card">
            <div className="about-insta-text">
              <h2>Follow Us on Instagram</h2>
              <p>Stay updated with our latest events, community news, and initiatives from Attiguppe.</p>
              <a
                href="https://www.instagram.com/attiguppe_residents/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
                @attiguppe_residents
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
