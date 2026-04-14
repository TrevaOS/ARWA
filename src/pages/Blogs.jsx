import { useState } from "react";
import './Blogs.css';

const categories = ["All", "Announcements", "Community", "Health & Safety", "Events", "Maintenance"];

const blogs = [
  {
    id: 1,
    title: "Summer Safety Tips for Children Playing Outdoors",
    excerpt: "With summer in full swing, it's important to ensure children are safe while enjoying outdoor activities. Here are key tips every parent in our neighbourhood should know.",
    category: "Health & Safety",
    author: "Dr. Meena Sharma",
    authorRole: "Health Committee",
    date: "June 15, 2025",
    readTime: "4 min read",
    color: "orange",
    initials: "MS",
    content: `With rising temperatures and longer days, children spend more time outdoors during summer. While this is wonderful for their physical and social development, it also brings certain risks that parents should be aware of.\n\nAlways ensure children apply sunscreen with SPF 30 or higher before going out. Reapply every two hours, especially after swimming or sweating. Dehydration is a common issue — make sure children drink water regularly, even when they do not feel thirsty.\n\nSupervise outdoor activities during peak heat hours (11 AM – 4 PM) and encourage play in shaded areas. Lightweight, light-coloured clothing helps keep the body cool. Watch for signs of heat exhaustion: excessive sweating, weakness, dizziness, or nausea.\n\nOur association has set up a water station near the park entrance. All residents are welcome to use it.`,
  },
  {
    id: 2,
    title: "New Street Lights Installed on Block C — Thank You Committee!",
    excerpt: "After months of persistent follow-ups with the municipal corporation, we are happy to announce that 18 new LED street lights have been installed on Block C.",
    category: "Announcements",
    author: "Rahul Verma",
    authorRole: "Secretary",
    date: "June 8, 2025",
    readTime: "2 min read",
    color: "blue",
    initials: "RV",
    content: `We are pleased to inform all residents that 18 new high-efficiency LED street lights have been installed along the main and subsidiary roads of Block C. This achievement came after 7 months of consistent communication with the municipal corporation and two formal written petitions.\n\nWe thank all residents who signed the petition and attended the public hearing in March. Your participation made a significant difference.\n\nThe lights are solar-assisted and will operate automatically from dusk to dawn. If you notice any lights not functioning correctly, please report them to our maintenance helpline or send a message on the residents' WhatsApp group.\n\nWe will continue to work on the street lighting issue in Blocks D and E in the coming months.`,
  },
  {
    id: 3,
    title: "Building a Greener Neighbourhood: Composting Drive Update",
    excerpt: "Our composting initiative, launched in April, has collected over 200 kg of organic waste in just two months. Here's how you can participate from your home.",
    category: "Community",
    author: "Priya Nair",
    authorRole: "Environment Committee",
    date: "June 1, 2025",
    readTime: "5 min read",
    color: "green",
    initials: "PN",
    content: `Our door-to-door organic waste composting drive has had a remarkable start. Since its launch on April 1st, we have collected and composted over 200 kg of kitchen and garden waste — preventing it from ending up in the municipal landfill.\n\nThe compost produced is being used to fertilise the plants in our community garden and the saplings being prepared for this year's tree plantation drive.\n\nHow you can participate: Place your wet/organic waste (vegetable peels, fruit scraps, tea leaves, and garden trimmings) in the green bin provided. Our collection volunteers will pick them up every Tuesday and Friday morning between 7 AM and 9 AM.\n\nDo not put cooked food, dairy products, or meat scraps in the bin as these attract pests.\n\nFamilies that have consistently participated for six months will receive a bag of ready-made compost as a thank-you gift.`,
  },
  {
    id: 4,
    title: "Annual Sports Day 2025: Registrations Now Open",
    excerpt: "The much-awaited Annual Sports Day is scheduled for July 20th at the community ground. Events for all age groups are open for registration. Come, compete, and have fun!",
    category: "Events",
    author: "Kiran Patel",
    authorRole: "Events Committee",
    date: "May 25, 2025",
    readTime: "3 min read",
    color: "blue",
    initials: "KP",
    content: `We are thrilled to announce that the Annual Sports Day 2025 will be held on Sunday, July 20th at the main community ground. This is one of the most loved events in our neighbourhood calendar and brings together residents of all ages.\n\nEvents include: 100m sprint (children and adults), tug-of-war, sack race, lemon-and-spoon race, three-legged race, carrom, and chess for senior citizens.\n\nRegistration is free for all members. Non-members can register for ₹50 per event.\n\nTo register, fill in the form on our website or contact any committee member. Last date for registration is July 10th.\n\nTrophies and certificates will be awarded to winners and runners-up in each category. Refreshments will be provided to all participants.`,
  },
  {
    id: 5,
    title: "Water Supply Disruption — What You Need to Know",
    excerpt: "The municipal corporation has scheduled maintenance work that will disrupt water supply in our area. Here are the timings and what you should do to prepare.",
    category: "Maintenance",
    author: "Arun Krishnan",
    authorRole: "Maintenance Committee",
    date: "May 18, 2025",
    readTime: "2 min read",
    color: "orange",
    initials: "AK",
    content: `The municipal water department has notified us of planned maintenance work on the main supply pipeline. This will affect water supply in our area on the dates below:\n\n• June 25 (Wednesday): 8 AM – 6 PM\n• June 26 (Thursday): 8 AM – 2 PM\n\nWe request all residents to store adequate water before 8 AM on June 25th. The association will arrange an emergency water tanker in case supply is not restored by the scheduled time.\n\nIf you are aware of elderly or differently-abled residents in your block who may need assistance with water storage, please help them or inform us so we can arrange support.\n\nFor any queries, contact our maintenance helpline: 98XXXXXXXX (available 8 AM – 8 PM).`,
  },
  {
    id: 6,
    title: "Welcoming Our New Neighbours: Integration Events Planned",
    excerpt: "Over 15 new families have moved in this quarter. We're organising a welcome event to help everyone get to know each other and feel at home in the community.",
    category: "Community",
    author: "Sunita Rao",
    authorRole: "President",
    date: "May 10, 2025",
    readTime: "3 min read",
    color: "green",
    initials: "SR",
    content: `A warm community is one where every resident feels known, respected, and supported. This quarter, we welcomed 15 new families to our neighbourhood, and we want to make sure they feel right at home.\n\nWe are organising a "Meet Your Neighbours" morning on June 29th (Sunday) from 9 AM to 12 PM at the community hall. There will be an informal breakfast, introductions, and a short session on how the association works and how new members can get involved.\n\nExisting residents are warmly encouraged to attend. Bring your family, and perhaps a small dish to share for a potluck-style breakfast!\n\nWe believe a neighbourhood where people know each other is a safer, happier, and more resilient one. Let's keep that spirit alive.`,
  },
];

function BlogModal({ post, onClose }) {
  if (!post) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box blog-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
        <div className="blog-modal-header">
          <span className={`blog-cat-badge bcat-${post.color}`}>{post.category}</span>
          <h2 className="blog-modal-title">{post.title}</h2>
          <div className="blog-meta">
            <div className={`blog-avatar ba-${post.color}`}>{post.initials}</div>
            <div>
              <span className="blog-author-name">{post.author}</span>
              <span className="blog-author-role"> · {post.authorRole}</span>
            </div>
            <span className="blog-date-dot">·</span>
            <span className="blog-meta-info">{post.date}</span>
            <span className="blog-date-dot">·</span>
            <span className="blog-meta-info">{post.readTime}</span>
          </div>
        </div>
        <div className="blog-modal-body">
          {post.content.split("\n").map((para, i) => para.trim() && <p key={i}>{para}</p>)}
        </div>
      </div>
    </div>
  );
}

export default function Blogs() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPost, setSelectedPost] = useState(null);

  const filtered = blogs.filter(
    (b) => activeCategory === "All" || b.category === activeCategory
  );

  return (
    <main className="blogs-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <span className="badge badge-blue">News & Updates</span>
          <h1>Community Blog</h1>
          <p>Stay informed with the latest news, announcements, and stories from your neighbourhood</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Filter */}
          <div className="events-filter">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured post */}
          {activeCategory === "All" && (
            <div className="blog-featured" onClick={() => setSelectedPost(blogs[0])}>
              <div className="blog-featured-content">
                <span className={`blog-cat-badge bcat-${blogs[0].color}`}>{blogs[0].category}</span>
                <h2 className="blog-featured-title">{blogs[0].title}</h2>
                <p className="blog-featured-excerpt">{blogs[0].excerpt}</p>
                <div className="blog-meta">
                  <div className={`blog-avatar ba-${blogs[0].color}`}>{blogs[0].initials}</div>
                  <span className="blog-author-name">{blogs[0].author}</span>
                  <span className="blog-date-dot">·</span>
                  <span className="blog-meta-info">{blogs[0].date}</span>
                  <span className="blog-date-dot">·</span>
                  <span className="blog-meta-info">{blogs[0].readTime}</span>
                </div>
              </div>
              <div className="blog-featured-visual">
                <div className={`blog-featured-icon bfi-${blogs[0].color}`}>📰</div>
              </div>
            </div>
          )}

          {/* Grid */}
          <div className="blogs-grid">
            {filtered.slice(activeCategory === "All" ? 1 : 0).map((post) => (
              <div className="blog-card" key={post.id} onClick={() => setSelectedPost(post)}>
                <div className={`blog-card-top bct-${post.color}`}>
                  <span className={`blog-cat-badge bcat-${post.color}`}>{post.category}</span>
                </div>
                <div className="blog-card-body">
                  <h3 className="blog-card-title">{post.title}</h3>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  <div className="blog-card-footer">
                    <div className="blog-meta">
                      <div className={`blog-avatar ba-${post.color}`}>{post.initials}</div>
                      <div className="blog-meta-text">
                        <span className="blog-author-name">{post.author}</span>
                        <span className="blog-meta-sub">{post.date} · {post.readTime}</span>
                      </div>
                    </div>
                    <span className={`blog-readmore br-${post.color}`}>Read →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="places-empty">
              <span style={{ fontSize: "3rem" }}>📭</span>
              <p>No posts in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {selectedPost && <BlogModal post={selectedPost} onClose={() => setSelectedPost(null)} />}
    </main>
  );
}