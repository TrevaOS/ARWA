import { useState } from "react";
import './Membership.css';

// After deploying the Apps Script (see AppScript.js), paste your deployment URL here
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID_HERE/exec";

const benefits = [
  { icon: "🗳️", color: "blue", title: "Voting Rights", desc: "Vote in all general body meetings and have a say in association decisions." },
  { icon: "📢", color: "green", title: "Event Invitations", desc: "Priority invitations to all community events, festivals, and workshops." },
  { icon: "🛡️", color: "orange", title: "Grievance Support", desc: "We take up your complaints with authorities and ensure timely resolution." },
  { icon: "📰", color: "blue", title: "Newsletter Access", desc: "Receive our monthly digital newsletter with updates, tips, and notices." },
  { icon: "🤝", color: "green", title: "Community Network", desc: "Connect with like-minded residents and build lasting neighbourhood relationships." },
  { icon: "🏅", color: "orange", title: "Member Recognition", desc: "Get acknowledged for your contributions to the community in our annual reports." },
];

const plans = [
  {
    name: "Annual",
    price: "₹500",
    period: "/ year",
    color: "blue",
    popular: false,
    features: ["Full voting rights", "All event invites", "Grievance support", "Newsletter", "Community network"],
  },
  {
    name: "Lifetime",
    price: "₹2,000",
    period: "one-time",
    color: "green",
    popular: true,
    features: ["Full voting rights", "All event invites", "Grievance support", "Newsletter", "Community network", "Lifetime member badge", "Annual recognition"],
  },
  {
    name: "Senior Citizen",
    price: "₹200",
    period: "/ year",
    color: "orange",
    popular: false,
    features: ["Full voting rights", "All event invites", "Grievance support", "Newsletter", "Community network"],
  },
];

const faqs = [
  { q: "Who can become a member?", a: "Any resident of the association area — whether you own or rent your home — is eligible to become a member." },
  { q: "How is the membership fee used?", a: "Fees are used to fund community events, maintenance initiatives, grievance handling, and administrative activities of the association." },
  { q: "Can I cancel my membership?", a: "Annual memberships are non-refundable once processed. Lifetime memberships are also final. If you have concerns, please contact us." },
  { q: "How long does approval take?", a: "After submitting the form and payment, membership is typically approved within 3–5 working days. You'll receive a confirmation email." },
  { q: "Is the senior citizen plan for all above 60?", a: "Yes, any resident aged 60 years or above as of the date of application qualifies for the senior citizen rate." },
];

export default function Membership() {
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", address: "",
    plan: "Annual", houseNo: "", occupation: "", agree: false,
  });
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.agree) return alert("Please agree to the terms to proceed.");
    setStatus("loading");
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, submittedAt: new Date().toISOString() }),
      });
      setStatus("success");
      setForm({ fullName: "", email: "", phone: "", address: "", plan: "Annual", houseNo: "", occupation: "", agree: false });
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
          <p>Be part of a stronger, more connected community</p>
        </div>
      </section>

      {/* Benefits */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-section">
            <span className="badge badge-green">Why Join?</span>
            <h2 className="section-title">Member Benefits</h2>
            <p className="section-subtitle">Here's what you get when you join our association</p>
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

      {/* Plans */}
      <section className="section plans-section">
        <div className="container">
          <div className="text-center mb-section">
            <span className="badge badge-blue">Pricing</span>
            <h2 className="section-title">Membership Plans</h2>
            <p className="section-subtitle">Choose the plan that works best for you</p>
          </div>
          <div className="plans-grid">
            {plans.map((plan) => (
              <div className={`plan-card plan-${plan.color} ${plan.popular ? "plan-popular" : ""}`} key={plan.name}>
                {plan.popular && <div className="plan-popular-badge">Most Popular</div>}
                <div className="plan-header">
                  <h3 className="plan-name">{plan.name}</h3>
                  <div className="plan-price">
                    <span className="plan-amount">{plan.price}</span>
                    <span className="plan-period">{plan.period}</span>
                  </div>
                </div>
                <ul className="plan-features">
                  {plan.features.map((f) => (
                    <li key={f}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="#membership-form" className={`btn plan-btn btn-${plan.popular ? "secondary" : "outline"}`}>
                  Apply for this plan
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="section" id="membership-form">
        <div className="container">
          <div className="membership-form-wrap">
            <div className="form-intro">
              <span className="badge badge-blue">Apply Now</span>
              <h2 className="section-title">Membership Application</h2>
              <p className="contact-intro">Fill in the form below and we'll get back to you within 3–5 working days with your membership confirmation.</p>
              <div className="member-note">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                <p>Please complete the payment separately at the association office or via UPI after approval. Do not include payment details in this form.</p>
              </div>
            </div>

            <div className="form-card">
              <h3 className="form-title">Your Details</h3>
              <p className="form-subtitle">All fields marked * are required</p>

              {status === "success" && (
                <div className="form-alert success">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                  Application submitted! We'll contact you within 3–5 working days.
                </div>
              )}
              {status === "error" && (
                <div className="form-alert error">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>
                  Something went wrong. Please try again or contact us.
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
                    <input name="houseNo" value={form.houseNo} onChange={handleChange} placeholder="e.g. B-204" required />
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
                  <input name="address" value={form.address} onChange={handleChange} placeholder="Your full residential address" required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Occupation</label>
                    <input name="occupation" value={form.occupation} onChange={handleChange} placeholder="e.g. Teacher, Engineer" />
                  </div>
                  <div className="form-group">
                    <label>Preferred Plan *</label>
                    <select name="plan" value={form.plan} onChange={handleChange} required>
                      <option value="Annual">Annual – ₹500/year</option>
                      <option value="Lifetime">Lifetime – ₹2,000 one-time</option>
                      <option value="Senior Citizen">Senior Citizen – ₹200/year</option>
                    </select>
                  </div>
                </div>
                <div className="form-group form-checkbox-group">
                  <label className="checkbox-label">
                    <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} />
                    <span>I confirm that I am a resident of the association area and agree to abide by the rules and regulations of the association. *</span>
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