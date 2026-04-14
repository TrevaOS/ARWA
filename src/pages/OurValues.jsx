import './OurValues.css'

const values = [
  {
    num: '01',
    title: 'Unity in Diversity',
    desc: 'Our neighbourhood is home to families from many cultures, languages, and backgrounds. We celebrate this diversity as our greatest strength. Every decision we make honours the richness of our collective identity.',
    color: 'blue',
  },
  {
    num: '02',
    title: 'Transparency and Accountability',
    desc: 'Every rupee collected and every decision made is shared openly with all members. We publish quarterly financial reports, hold open general body meetings, and maintain publicly accessible minutes of all committee sessions.',
    color: 'green',
  },
  {
    num: '03',
    title: 'Inclusion and Equal Voice',
    desc: 'From the newest resident to the longest-standing family, everyone has equal rights and a meaningful say in association matters. We actively create spaces for women, senior citizens, and youth to lead.',
    color: 'orange',
  },
  {
    num: '04',
    title: 'Proactive Community Care',
    desc: 'We do not wait for problems to escalate. Through regular area audits, preventive health camps, and safety checks, we stay ahead of issues that could affect our residents quality of life.',
    color: 'blue',
  },
  {
    num: '05',
    title: 'Environmental Responsibility',
    desc: 'We are committed to leaving our neighbourhood greener than we found it. Through tree planting, waste segregation initiatives, and water conservation drives, we protect our environment for future generations.',
    color: 'green',
  },
  {
    num: '06',
    title: 'Collaborative Governance',
    desc: 'We work hand in hand with municipal authorities, local police, schools, and hospitals to deliver outcomes that no single entity could achieve alone. Collaboration is at the heart of everything we do.',
    color: 'orange',
  },
]

export default function OurValues() {
  return (
    <div className="values-page">
      <section className="page-hero">
        <div className="container">
          <span className="badge badge-blue">What We Believe In</span>
          <h1>Our Values</h1>
          <p>The principles that guide every decision and action we take as a community.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head center">
            <span className="badge badge-green">Core Beliefs</span>
            <div className="divider divider-center" />
            <h2 className="section-title">What Drives Us Every Day</h2>
            <p className="section-subtitle">Our values are not just words. They shape the way we organise, communicate, and serve our community.</p>
          </div>

          <div className="values-detail-grid">
            {values.map((v) => (
              <div key={v.num} className={`value-detail-card vd-${v.color}`}>
                <div className={`vd-num-badge nb-${v.color}`}>{v.num}</div>
                <h3 className="vd-title">{v.title}</h3>
                <div className={`vd-divider dvd-${v.color}`} />
                <p className="vd-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}