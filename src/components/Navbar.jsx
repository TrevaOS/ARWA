import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Events', path: '/events' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact Us', path: '/contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    document.body.style.overflow = ''
  }, [location])

  const toggleMenu = () => {
    setMenuOpen(prev => {
      document.body.style.overflow = prev ? '' : 'hidden'
      return !prev
    })
  }

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="navbar-inner container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <div className="logo-mark">
            <img
              src="/assets/arwa-logo.png"
              alt="ARWA Logo"
              className="logo-img"
              onError={e => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'flex'
              }}
            />
            <div className="logo-circle logo-fallback" style={{ display: 'none' }}>
              <span>AR</span>
            </div>
          </div>
          <div className="logo-text">
            <span className="logo-main">Attiguppe</span>
            <span className="logo-sub">Residents Welfare Association</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="navbar-links">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link${location.pathname === link.path ? ' active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/membership" className="btn btn-primary nav-cta">
            Join Us
          </Link>
        </nav>

        {/* Hamburger */}
        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <nav className="mobile-links">
          {navLinks.map((link, i) => (
            <Link
              key={link.path}
              to={link.path}
              className={`mobile-link${location.pathname === link.path ? ' active' : ''}`}
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/membership" className="btn btn-primary mobile-cta">
            Join Us
          </Link>
        </nav>
      </div>
    </header>
  )
}
