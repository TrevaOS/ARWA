import { useState } from "react";
import "./Places.css";

const categories = ["All", "Parks & Gardens", "Religious", "Shopping", "Healthcare", "Schools", "Restaurants", "Transport"];

const places = [
  {
    id: 1,
    name: "Cubbon Park",
    category: "Parks & Gardens",
    distance: "4.9 km",
    rating: 4.8,
    description: "A large heritage park in central Bengaluru known for tree lined walks, open lawns, and a calm morning atmosphere.",
    address: "Kasturba Road, Bengaluru",
    timings: "6:00 AM - 6:00 PM",
    color: "green",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22V12" />
        <path d="M7 12c0-3 2-5 5-7 3 2 5 4 5 7" />
      </svg>
    ),
    tags: ["Walking Trail", "Green Cover", "Family Friendly"],
  },
  {
    id: 2,
    name: "Lakshmi Narasimha Temple",
    category: "Religious",
    distance: "0.4 km",
    rating: 4.8,
    description: "A long standing local temple in Attiguppe and an important spiritual landmark for many resident families.",
    address: "Attiguppe, Vijayanagar, Bengaluru",
    timings: "6:00 AM - 8:30 PM",
    color: "orange",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    tags: ["Daily Puja", "Community Temple", "Accessible"],
  },
  {
    id: 3,
    name: "Orion Mall",
    category: "Shopping",
    distance: "7.2 km",
    rating: 4.6,
    description: "A major shopping destination in Bengaluru with retail outlets, dining options, and cinema screens.",
    address: "Dr Rajkumar Road, Rajajinagar, Bengaluru",
    timings: "10:00 AM - 10:00 PM",
    color: "blue",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="9" cy="20" r="1" />
        <circle cx="18" cy="20" r="1" />
        <path d="M3 4h2l2.4 10.6a2 2 0 0 0 2 1.4h7.8a2 2 0 0 0 1.9-1.4L21 7H7" />
      </svg>
    ),
    tags: ["Retail", "Food Court", "Multiplex"],
  },
  {
    id: 4,
    name: "Vijayanagar Government Hospital",
    category: "Healthcare",
    distance: "1.1 km",
    rating: 4.3,
    description: "A nearby public hospital that supports general outpatient needs and emergency medical access.",
    address: "Vijayanagar, Bengaluru",
    timings: "24 Hours",
    color: "red",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 4h6v16H9z" />
        <path d="M4 9h16v6H4z" />
      </svg>
    ),
    tags: ["Emergency", "General Care", "Public Service"],
  },
  {
    id: 5,
    name: "Government Model High School",
    category: "Schools",
    distance: "0.6 km",
    rating: 4.4,
    description: "A trusted local school that has served families in Attiguppe and surrounding areas for many years.",
    address: "RP Layout, Vijayanagar, Bengaluru",
    timings: "8:30 AM - 4:00 PM",
    color: "blue",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
    tags: ["Public School", "Local Access", "Community Focus"],
  },
  {
    id: 6,
    name: "CTR Malleswaram",
    category: "Restaurants",
    distance: "8.9 km",
    rating: 4.7,
    description: "A well known Bengaluru restaurant celebrated for traditional breakfasts and classic local flavours.",
    address: "Margosa Road, Malleswaram, Bengaluru",
    timings: "7:00 AM - 9:30 PM",
    color: "orange",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 4h18" />
        <path d="M6 4v9a3 3 0 0 0 6 0V4" />
        <path d="M16 4v17" />
      </svg>
    ),
    tags: ["South Indian", "Popular", "Family Dining"],
  },
  {
    id: 7,
    name: "Namma Metro Attiguppe",
    category: "Transport",
    distance: "0.2 km",
    rating: 4.5,
    description: "A key mobility point that improves access to hospitals, schools, and workplaces across Bengaluru.",
    address: "Attiguppe Metro Station, Bengaluru",
    timings: "5:00 AM - 11:00 PM",
    color: "green",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      </svg>
    ),
    tags: ["Metro Access", "Daily Commute", "Nearby"],
  },
  {
    id: 8,
    name: "Vijayanagar Market",
    category: "Shopping",
    distance: "0.8 km",
    rating: 4.4,
    description: "A busy local market for vegetables, groceries, household goods, and everyday essentials.",
    address: "Vijayanagar, Bengaluru",
    timings: "6:30 AM - 9:30 PM",
    color: "red",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 7h16l-1.4 12.2a2 2 0 0 1-2 1.8H7.4a2 2 0 0 1-2-1.8z" />
        <path d="M9 7V5a3 3 0 0 1 6 0v2" />
      </svg>
    ),
    tags: ["Fresh Produce", "Essentials", "Local Vendors"],
  },
];

export default function Places() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = places.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <main className="places-page">
      <section className="page-hero">
        <div className="container">
          <span className="badge badge-blue">Explore</span>
          <h1>Nearby Places</h1>
          <p>Discover key places in and around Attiguppe, Bengaluru.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="places-toolbar">
            <div className="places-search-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              <input
                className="places-search"
                type="text"
                placeholder="Search places..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="places-filter">
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
          </div>

          <p className="places-count">{filtered.length} place{filtered.length !== 1 ? "s" : ""} found</p>

          {filtered.length > 0 ? (
            <div className="places-grid">
              {filtered.map((place) => (
                <div className={`place-card pc-${place.color}`} key={place.id}>
                  <div className="place-icon-wrap">
                    <span className="place-icon" aria-hidden="true">{place.icon}</span>
                    <span className={`place-cat-badge cat-${place.color}`}>{place.category}</span>
                  </div>
                  <div className="place-body">
                    <div className="place-header-row">
                      <h3 className="place-name">{place.name}</h3>
                      <div className="place-rating">
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="m12 3 2.8 5.7L21 9.6l-4.5 4.4 1.1 6.2L12 17.8 6.4 20.2 7.5 14 3 9.6l6.2-.9z"/></svg>
                        <span>{place.rating}</span>
                      </div>
                    </div>
                    <p className="place-desc">{place.description}</p>
                    <div className="place-meta">
                      <div className="place-meta-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        <span>{place.address}</span>
                      </div>
                      <div className="place-meta-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                        <span>{place.timings}</span>
                      </div>
                      <div className="place-meta-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
                        <span>{place.distance} away</span>
                      </div>
                    </div>
                    <div className="place-tags">
                      {place.tags.map((tag) => (
                        <span key={tag} className={`place-tag tag-${place.color}`}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="places-empty">
              <span className="place-empty-icon" aria-hidden="true">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              </span>
              <p>No places found matching your search.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
