import { useState } from 'react'
import './Navbar.css'

const navigationItems = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
        <a className="navbar__brand" href="/" aria-label="Desira home" onClick={closeMenu}>
          <span>desira</span>
        </a>

        <button
          className={`navbar__menu-toggle${isMenuOpen ? ' navbar__menu-toggle--open' : ''}`}
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          <span />
          <span />
        </button>

        <div
          className={`navbar__links${isMenuOpen ? ' navbar__links--open' : ''}`}
          id="primary-navigation"
        >
          {navigationItems.map((item) => (
            <a key={item.label} href={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
