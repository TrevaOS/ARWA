import { useState } from "react";
import './Membership.css';

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID_HERE/exec";

const benefits = [
  { icon: "🗳️", color: "blue", title: "Voting Rights", desc: "Vote in all general body meetings and have a say in association decisions." },
  { icon: "📢", color: "green", title: "Event Invitations", desc: "Priority invitations to all community events, festivals, and workshops." },
  { icon: "🛡️", color: "orange", title: "Grievance Support", desc: "We take up your complaints with authorities and ensure timely resolution." },
  { icon: "📰", color: "blue", title: "Newsletter Access", desc: "Receive our monthly digital newsletter with updates, tips, and notices." },
  { icon: "🤝", color: "green", title: "Community Network", desc: "Connect with like-minded residents and build lasting neighbourhood relationships." },
  { icon: "🏅", color: "orange", title: "Member Recognition", desc: "Get acknowledged for your contributions to the community." },
];

const faqs = [
  { q: "Who can become a member?", a: "Any resident of Attiguppe whether you own or rent your home is eligible to become a member of ARWA." },
  { q: "What happens after I submit this form?", a: "Our team will review your application and get back to you within 3–5 working days with details about membership confirmation and the next steps." },
  { q: "Is there a membership fee?", a: "Membership fee details will be communicated to you by our team after reviewing your application." },
  { q: "How long does approval take?", a: "After submitting the form, membership is typically confirmed within 3–5 working days. You'll receive a confirmation via the contact details you provide." },
  { q: "What is the Women's Wing?", a: "The Women's Wing is a newly launched platform for women residents to lead, share, and grow together through community activities, health programs, safety initiatives, and skill development." },
];

export default function Membership() {
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", address: "",
    memberType: "General", houseNo: "", occupation: "", agree: false,
  });
  const [status, setStatus] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.agree) return alert("Please confirm that you are a resident to proceed.");
    setStatus("loading");
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, formType: "JoinUs", submittedAt: new Date().toISOString() }),
      });
      setStatus("success");
      setForm({ fullName: "", email: "", phone: "", address: "", memberType: "General", houseNo: "", occupation: "", agree: false });
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="membership-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <span className="badge badge-blue">Join Us</span>
          <h1>Become a Member</h1>
          <p>Be part of a stronger, more connected community in Attiguppe</p>
        </div>
      </section>

      {/* Benefits */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-section">
            <span className="badge badge-green">Why Join?</span>
            <h2 className="section-title">Member Benefits</h2>
            <p className="section-subtitle">Here is what you get when you join the Attiguppe Residents Welfare Association</p>
          </div>
          <div className="benefits-grid">
            {benefits.map((b) => (
              <div className={`benefit-card bc-${b.color}`} key={b.title}>
                <div className={`benefit-icon-wrap bi-${b.color}`}>{b.icon}</div>
                <h3 className="benefit-title">{b.title}</h3>
                <p className="benefit-desc">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="section join-form-section" id="membership-form">
        <div className="container">
          <div className="membership-form-wrap">
            <div className="form-intro">
              <span className="badge badge-blue">Apply Now</span>
              <h2 className="section-title">Join the Association</h2>
              <p className="contact-intro">
                Fill in the form below and our team will get back to you within 3–5 working days with your membership confirmation details.
              </p>
              <div className="member-note">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                <p>Once we review your application, a team member will reach out to you directly with further details.</p>
              </div>
              <div className="member-insta-note">
                <a href="https://www.instagram.com/attiguppe_residents/" target="_blank" rel="noopener noreferrer">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                  Follow us @attiguppe_residents
                </a>
              </div>
            </div>

            <div className="form-card">
              <h3 className="form-title">Your Details</h3>
              <p className="form-subtitle">All fields marked * are required</p>

              {status === "success" && (
                <div className="form-alert success">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                  Application submitted! We will contact you within 3–5 working days.
                </div>
              )}
              {status === "error" && (
                <div className="form-alert error">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>
                  Something went wrong. Please try again or contact us directly.
                </div>
              )}

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Your full name" required />
                  </div>
                  <div className="form-group">
                    <label>House / Flat No. *</label>
                    <input name="houseNo" value={form.houseNo} onChange={handleChange} placeholder="e.g. B-204, RP Layout" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@email.com" required />
                  </div>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Full Address *</label>
                  <input name="address" value={form.address} onChange={handleChange} placeholder="Your full residential address in Attiguppe" required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Occupation</label>
                    <input name="occupation" value={form.occupation} onChange={handleChange} placeholder="e.g. Teacher, Engineer, Business" />
                  </div>
                  <div className="form-group">
                    <label>Member Type</label>
                    <select name="memberType" value={form.memberType} onChange={handleChange}>
                      <option value="General">General Member</option>
                      <option value="Senior Citizen">Senior Citizen (60+)</option>
                      <option value="Women's Wing">Women's Wing Member</option>
                    </select>
                  </div>
                </div>
                <div className="form-group form-checkbox-group">
                  <label className="checkbox-label">
                    <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} />
                    <span>I confirm that I am a resident of Attiguppe and agree to abide by the rules and regulations of the Attiguppe Residents Welfare Association. *</span>
                  </label>
                </div>
                <button type="submit" className="btn btn-primary submit-btn" disabled={status === "loading"}>
                  {status === "loading" ? (
                    <><div className="spinner" /> Submitting...</>
                  ) : (
                    <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4z"/></svg> Submit Application</>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section faq-section">
        <div className="container faq-container">
          <div className="text-center mb-section">
            <span className="badge badge-green">Help</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">Everything you need to know about membership</p>
          </div>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div key={i} className={`faq-item ${openFaq === i ? "open" : ""}`}>
                <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{faq.q}</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
                </button>
                {openFaq === i && <div className="faq-a">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
