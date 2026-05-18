import { Link } from 'react-router-dom'
import { buildGeneralWhatsAppUrl } from '../utils/whatsapp'

const socials = [
  { label: 'Instagram', href: 'https://instagram.com', icon: 'IG' },
  { label: 'TikTok', href: 'https://tiktok.com', icon: 'TT' },
  { label: 'Facebook', href: 'https://facebook.com', icon: 'FB' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <div className="navbar__logo" style={{ marginBottom: '1rem' }}>
            <span className="logo-circle">YK</span>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem' }}>
              YOME KHWEQE
            </span>
          </div>
          <p className="text-muted">Since Day One. Joburg streetwear.</p>
          <a
            href={buildGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="footer__whatsapp whatsapp-bounce"
          >
            WhatsApp Us
          </a>
        </div>

        <div>
          <h4 className="text-gold" style={{ marginBottom: '1rem', fontFamily: 'var(--font-heading)', fontSize: '1.25rem' }}>
            Quick Links
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/exclusives">Exclusives</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-gold" style={{ marginBottom: '1rem', fontFamily: 'var(--font-heading)', fontSize: '1.25rem' }}>
            Follow Us
          </h4>
          <div className="footer__social">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ textAlign: 'center', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)' }}>
        © {new Date().getFullYear()} Yome Khweqe. All rights reserved.
      </div>
    </footer>
  )
}
