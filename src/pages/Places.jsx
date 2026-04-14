import { useState } from "react";
import './Places.css';

const categories = ["All", "Parks & Gardens", "Religious", "Shopping", "Healthcare", "Schools", "Restaurants"];

const places = [
  {
    id: 1,
    name: "Central Park",
    category: "Parks & Gardens",
    distance: "0.3 km",
    rating: 4.7,
    description: "A beautifully maintained public park with walking trails, a small lake, and children's play areas. Popular for morning walks and evening gatherings.",
    address: "Park Road, Sector 4",
    timings: "5:00 AM – 9:00 PM",
    color: "green",
    icon: "🌳",
    tags: ["Walking Trail", "Lake", "Kids Play Area"],
  },
  {
    id: 2,
    name: "Shree Ram Temple",
    category: "Religious",
    distance: "0.6 km",
    rating: 4.9,
    description: "A serene temple with beautiful architecture and a peaceful atmosphere. Special aartis held daily at sunrise and sunset draw devotees from across the city.",
    address: "Temple Street, Block B",
    timings: "6:00 AM – 8:30 PM",
    color: "orange",
    icon: "🛕",
    tags: ["Daily Aarti", "Prasad", "Free Entry"],
  },
  {
    id: 3,
    name: "City Mall",
    category: "Shopping",
    distance: "1.2 km",
    rating: 4.3,
    description: "A multi-story shopping complex with over 120 stores, a food court, multiplex cinema, and a large supermarket. One-stop destination for all shopping needs.",
    address: "MG Road, Near Main Chowk",
    timings: "10:00 AM – 10:00 PM",
    color: "blue",
    icon: "🛍️",
    tags: ["Food Court", "Cinema", "Supermarket"],
  },
  {
    id: 4,
    name: "City General Hospital",
    category: "Healthcare",
    distance: "0.8 km",
    rating: 4.5,
    description: "A full-service hospital with 24/7 emergency care, specialized departments, and a pharmacy. Empanelled with major insurance providers for cashless treatment.",
    address: "Hospital Lane, Sector 2",
    timings: "24 Hours",
    color: "red",
    icon: "🏥",
    tags: ["24/7 Emergency", "Pharmacy", "Cashless Insurance"],
  },
  {
    id: 5,
    name: "Delhi Public School",
    category: "Schools",
    distance: "1.0 km",
    rating: 4.6,
    description: "A reputed CBSE-affiliated school offering classes from Nursery to Grade 12. Known for academic excellence, sports facilities, and extracurricular programs.",
    address: "Education Avenue, Block A",
    timings: "7:30 AM – 2:30 PM",
    color: "blue",
    icon: "🏫",
    tags: ["CBSE", "K-12", "Sports Ground"],
  },
  {
    id: 6,
    name: "Spice Garden Restaurant",
    category: "Restaurants",
    distance: "0.5 km",
    rating: 4.4,
    description: "A family-friendly restaurant offering authentic North Indian and Chinese cuisine. Known for generous portions and a warm ambiance. Great place for family dinners.",
    address: "Food Street, Near Market",
    timings: "11:00 AM – 11:00 PM",
    color: "orange",
    icon: "🍽️",
    tags: ["North Indian", "Chinese", "Family Dining"],
  },
  {
    id: 7,
    name: "Morning Dew Clinic",
    category: "Healthcare",
    distance: "0.4 km",
    rating: 4.8,
    description: "A multi-specialty outpatient clinic with experienced doctors in general medicine, pediatrics, dermatology, and gynecology. Appointments available online.",
    address: "Clinic Road, Block C",
    timings: "8:00 AM – 8:00 PM",
    color: "red",
    icon: "🩺",
    tags: ["Multi-specialty", "Online Booking", "Lab Tests"],
  },
  {
    id: 8,
    name: "Weekend Bazaar",
    category: "Shopping",
    distance: "0.7 km",
    rating: 4.2,
    description: "A vibrant Saturday-Sunday market with local vendors selling fresh produce, handmade crafts, street food, and clothing. A community favourite since 2010.",
    address: "Ground near Community Hall",
    timings: "Sat–Sun, 7:00 AM – 2:00 PM",
    color: "green",
    icon: "🏪",
    tags: ["Weekend Only", "Local Produce", "Street Food"],
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
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <span className="badge badge-blue">Explore</span>
          <h1>Nearby Places</h1>
          <p>Discover the best spots around your neighbourhood</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Search + Filter */}
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

          {/* Count */}
          <p className="places-count">{filtered.length} place{filtered.length !== 1 ? "s" : ""} found</p>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="places-grid">
              {filtered.map((place) => (
                <div className={`place-card pc-${place.color}`} key={place.id}>
                  <div className="place-icon-wrap">
                    <span className="place-emoji">{place.icon}</span>
                    <span className={`place-cat-badge cat-${place.color}`}>{place.category}</span>
                  </div>
                  <div className="place-body">
                    <div className="place-header-row">
                      <h3 className="place-name">{place.name}</h3>
                      <div className="place-rating">
                        <svg width="14" height="14" fill="#f59e0b" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>
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
              <span style={{ fontSize: "3rem" }}>🔍</span>
              <p>No places found matching your search.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}