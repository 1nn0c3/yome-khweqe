import { useState } from 'react'
import { motion } from 'framer-motion'
import { buildGeneralWhatsAppUrl } from '../utils/whatsapp'
import { fadeUp } from '../animations/variants'

const socials = [
  { label: 'Instagram', href: 'https://instagram.com', icon: 'IG' },
  { label: 'TikTok', href: 'https://tiktok.com', icon: 'TT' },
  { label: 'Facebook', href: 'https://facebook.com', icon: 'FB' },
]

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="section container" style={{ maxWidth: 600, paddingTop: '4rem' }}>
      <motion.h1
        className="heading-xl text-center"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        GET IN TOUCH
      </motion.h1>
      <motion.p
        className="text-center text-muted"
        style={{ margin: '1rem 0 2rem' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Joburg HQ — we&apos;d love to hear from you
      </motion.p>

      <motion.a
        href={buildGeneralWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-wipe whatsapp-bounce"
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '0 auto 3rem',
          maxWidth: 280,
          boxShadow: '0 0 24px rgba(212,175,55,0.3)',
        }}
        whileHover={{ scale: 1.05 }}
      >
        Chat on WhatsApp
      </motion.a>

      <div className="footer__social" style={{ justifyContent: 'center', marginBottom: '3rem' }}>
        {socials.map((s) => (
          <motion.a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            {s.icon}
          </motion.a>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" required />
          <span className="form-underline" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required />
          <span className="form-underline" />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows={4} required />
          <span className="form-underline" />
        </div>
        <button type="submit" className="btn-wipe" style={{ width: '100%', marginTop: '1rem' }}>
          {submitted ? 'Message Sent ✓' : 'Send Message'}
        </button>
      </form>
    </section>
  )
}
