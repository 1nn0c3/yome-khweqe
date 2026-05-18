import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'

const links = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/exclusives', label: 'Exclusives' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const { itemCount } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      layout
      animate={{
        height: scrolled ? 'var(--nav-height-shrink)' : 'var(--nav-height)',
      }}
      transition={reduced ? { duration: 0 } : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to="/" className="navbar__logo" onClick={() => setMobileOpen(false)}>
        <span className="logo-circle">YK</span>
        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', letterSpacing: '0.1em' }}>
          YOME KHWEQE
        </span>
      </Link>

      <nav>
        <ul className={`navbar__links ${mobileOpen ? 'open' : ''}`}>
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `navbar__link ${isActive ? 'active' : ''}`
                }
                onClick={() => setMobileOpen(false)}
                end={link.to === '/'}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <Link to="/cart" className="navbar__cart" aria-label={`Cart, ${itemCount} items`}>
        🛒
        {itemCount > 0 && (
          <motion.span
            className="cart-badge cart-badge--count"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            key={itemCount}
          >
            {itemCount > 9 ? '9+' : itemCount}
          </motion.span>
        )}
      </Link>

      <button
        type="button"
        className="mobile-toggle"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>
    </motion.header>
  )
}
