import './About.css'

const team = [
  {
    name: 'Rajesh Kumar Sharma',
    role: 'President',
    bio: 'A visionary leader with over 25 years of experience in civic governance and community development. Rajesh has spearheaded more than 50 infrastructure improvement projects in our neighbourhood.',
    tenure: 'Since 2018',
    color: 'blue',
  },
  {
    name: 'Priya Nair',
    role: 'Vice President',
    bio: 'An advocate for resident welfare and environmental sustainability, Priya leads our green initiatives and coordinates with municipal bodies on key civic issues.',
    tenure: 'Since 2020',
    color: 'green',
  },
  {
    name: 'Amit Verma',
    role: 'Secretary',
    bio: 'Amit manages all administrative and documentation tasks, ensuring transparency and timely communication with all member households.',
    tenure: 'Since 2019',
    color: 'orange',
  },
  {
    name: 'Sunita Reddy',
    role: 'Treasurer',
    bio: 'A chartered accountant by profession, Sunita oversees all financial transactions, audits, and fund allocation with utmost integrity.',
    tenure: 'Since 2021',
    color: 'blue',
  },
  {
    name: 'Dr. Kavitha Menon',
    role: 'Health Committee Head',
    bio: 'Dr. Kavitha organises health camps, awareness drives, and liaises with hospitals to bring quality healthcare closer to residents.',
    tenure: 'Since 2020',
    color: 'green',
  },
  {
    name: 'Suresh Pillai',
    role: 'Cultural Committee Head',
    bio: 'The creative force behind our festivals and events, Suresh ensures every celebration reflects the diversity and unity of our community.',
    tenure: 'Since 2017',
    color: 'orange',
  },
]

const milestones = [
  { year: '2005', title: 'Association Founded', desc: 'Established with 150 founding member families committed to community welfare.' },
  { year: '2010', title: 'First Major Infrastructure Win', desc: 'Successfully petitioned for road widening and streetlight installation across 12 streets.' },
  { year: '2015', title: 'Waste Management Initiative', desc: 'Launched a door-to-door segregated waste collection programme ahead of city mandate.' },
  { year: '2020', title: 'COVID Relief Operations', desc: 'Distributed essential supplies to over 800 families during the pandemic lockdowns.' },
  { year: '2023', title: 'Digital Transformation', desc: 'Launched digital membership, online grievance portal, and resident communication app.' },
]

export default function About() {
  return (
    <div className="about-page">

      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <span className="badge badge-green">Our Story</span>
          <h1>About Our Association</h1>
          <p>Two decades of dedicated service to the residents of our neighbourhood.</p>
        </div>
      </section>

      {/* Story */}
      <section className="section">
        <div className="container about-story">
          <div className="story-text">
            <span className="badge badge-blue">Our Beginning</span>
            <div className="divider" />
            <h2 className="section-title">Built by Residents, for Residents</h2>
            <p>
              Founded in 2005 by a group of passionate residents who believed that a well-organised community could achieve more than any individual, our Area Residents Welfare Association has grown from a small neighbourhood group into a trusted institution.
            </p>
            <p>
              We have navigated countless civic challenges, celebrated cultural milestones, and stood together through crises. Today, with over 1200 member families, we continue to be the strongest voice for residents in all matters relating to welfare, governance, and community life.
            </p>
            <p>
              Our structure is democratic and transparent. Every decision is made collectively, every rupee is accounted for, and every voice matters.
            </p>
          </div>
          <div className="story-visual">
            <div className="story-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=700"
                alt="Community gathering"
                loading="lazy"
              />
              <div className="story-img-badge">
                <span className="story-badge-num">20+</span>
                <span>Years Together</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section team-section">
        <div className="container">
          <div className="section-head center">
            <span className="badge badge-green">The People Behind It All</span>
            <div className="divider divider-center" />
            <h2 className="section-title">Our Leadership Team</h2>
            <p className="section-subtitle">Dedicated volunteers who give their time, expertise, and passion for the community.</p>
          </div>

          <div className="team-grid">
            {team.map((member, i) => (
              <div key={i} className={`team-card team-${member.color}`}>
                <div className={`team-avatar avatar-${member.color}`}>
                  <span>{member.name.split(' ').map(n => n[0]).slice(0, 2).join('')}</span>
                </div>
                <div className="team-info">
                  <div className={`team-role role-${member.color}`}>{member.role}</div>
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-bio">{member.bio}</p>
                  <div className="team-tenure">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    {member.tenure}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="section milestones-section">
        <div className="container">
          <div className="section-head center">
            <span className="badge badge-blue">Our Journey</span>
            <div className="divider divider-center" />
            <h2 className="section-title">Key Milestones</h2>
            <p className="section-subtitle">A timeline of achievements that reflect our commitment to the community.</p>
          </div>

          <div className="timeline">
            {milestones.map((m, i) => (
              <div key={i} className={`timeline-item${i % 2 === 0 ? ' left' : ' right'}`}>
                <div className="timeline-dot" />
                <div className="timeline-card">
                  <div className="timeline-year">{m.year}</div>
                  <h3 className="timeline-title">{m.title}</h3>
                  <p className="timeline-desc">{m.desc}</p>
                </div>
              </div>
            ))}
            <div className="timeline-line" />
          </div>
        </div>
      </section>

    </div>
  )
}