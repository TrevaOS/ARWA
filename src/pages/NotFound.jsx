import { Link } from "react-router-dom";
import './NotFound.css'

export default function NotFound() {
  return (
    <main className="notfound-page">
      <div className="notfound-container">
        <div className="notfound-visual">
          <span className="notfound-big">404</span>
          <div className="notfound-house"><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 10l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/></svg></div>
        </div>
        <h1 className="notfound-title">Page Not Found</h1>
        <p className="notfound-desc">
          Looks like you've wandered off the neighbourhood map! The page you're looking for doesn't exist or may have moved.
        </p>
        <div className="notfound-actions">
          <Link to="/" className="btn btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            Go Home
          </Link>
          <Link to="/contact" className="btn btn-outline">
            Contact Us
          </Link>
        </div>
        <div className="notfound-links">
          <p>Or go to one of these pages:</p>
          <div className="notfound-link-row">
            <Link to="/about">About</Link>
            <Link to="/events">Events</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/membership">Membership</Link>
            <Link to="/blogs">Blog</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
