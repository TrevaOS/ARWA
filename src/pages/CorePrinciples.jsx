import './CorePrinciples.css'

const principles = [
  {
    num: '01',
    title: 'Democratic Decision Making',
    desc: 'Every major decision is put to a vote in the General Body Meeting. Each member household has one vote, and the majority rules. Emergency decisions by the committee are ratified at the next meeting.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87"/>
        <path d="M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
    color: 'blue',
  },
  {
    num: '02',
    title: 'Financial Integrity',
    desc: 'All collections and expenditures are recorded and audited annually by an independent chartered accountant. Detailed financial statements are shared with all members without exception.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
      </svg>
    ),
    color: 'green',
  },
  {
    num: '03',
    title: 'Timely Grievance Resolution',
    desc: 'Every complaint or grievance logged with the association is acknowledged within 48 hours and resolved or escalated within 15 working days. No concern goes unaddressed.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    color: 'orange',
  },
  {
    num: '04',
    title: 'Regular Communication',
    desc: 'Monthly newsletters, WhatsApp broadcasts, and quarterly town hall meetings ensure every resident is informed about what the association is doing, planning, and achieving.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>
    ),
    color: 'blue',
  },
  {
    num: '05',
    title: 'Zero Discrimination Policy',
    desc: 'We operate with a strict zero-tolerance policy for discrimination based on religion, caste, language, gender, or economic background. Our community is a safe space for every resident.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </svg>
    ),
    color: 'green',
  },
  {
    num: '06',
    title: 'Sustainability First',
    desc: 'In all our projects and initiatives, we prioritise solutions that are environmentally sustainable, financially self-sufficient, and beneficial to the neighbourhood in the long term.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
      </svg>
    ),
    color: 'orange',
  },
]

export default function CorePrinciples() {
  return (
    <div className="cp-page">
      <section className="page-hero">
        <div className="container">
          <span className="badge badge-green">How We Operate</span>
          <h1>Core Principles</h1>
          <p>The foundational rules and practices that govern our association.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head center">
            <span className="badge badge-blue">Our Commitments</span>
            <div className="divider divider-center" />
            <h2 className="section-title">Principles We Live By</h2>
            <p className="section-subtitle">These are not aspirational goals. They are operating commitments we hold ourselves accountable to every day.</p>
          </div>

          <div className="cp-grid">
            {principles.map((p) => (
              <div key={p.num} className={`cp-card cp-${p.color}`}>
                <div className="cp-top">
                  <div className={`cp-icon-wrap cpi-${p.color}`}>{p.icon}</div>
                  <div className={`cp-num cpn-${p.color}`}>{p.num}</div>
                </div>
                <h3 className="cp-title">{p.title}</h3>
                <p className="cp-desc">{p.desc}</p>
                <div className={`cp-bar cb-${p.color}`} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}