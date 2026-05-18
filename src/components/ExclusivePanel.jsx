import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { buildExclusiveWhatsAppUrl } from '../utils/whatsapp'
import { slideFromLeft, slideFromRight } from '../animations/variants'

export default function ExclusivePanel({ item, reverse = false, showDivider = true }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <>
      <section
        ref={ref}
        className={`exclusive-panel ${reverse ? 'exclusive-panel--reverse' : ''}`}
      >
        <motion.div
          className="exclusive-panel__image"
          variants={reverse ? slideFromRight : slideFromLeft}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <img src={item.image} alt={item.name} loading="lazy" />
        </motion.div>
        <motion.div
          className="exclusive-panel__content"
          variants={reverse ? slideFromLeft : slideFromRight}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <span className="limited-badge">Limited Edition</span>
          <h2 className="heading-lg" style={{ margin: '1rem 0 0.5rem' }}>
            {item.name}
          </h2>
          <p className="text-gold" style={{ fontSize: '1.5rem', fontWeight: 600 }}>
            R{item.price.toLocaleString()}
          </p>
          <p className="text-muted" style={{ margin: '1rem 0 1.5rem', lineHeight: 1.7 }}>
            {item.description}
          </p>
          <p style={{ fontSize: '0.85rem', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>
            ONLY <span className="text-gold">{item.units}</span> UNITS MADE
          </p>
          <a
            href={buildExclusiveWhatsAppUrl(item.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wipe"
          >
            Order via WhatsApp
          </a>
        </motion.div>
      </section>
      {showDivider && (
        <motion.hr
          className="exclusive-divider"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{ transformOrigin: 'center' }}
        />
      )}
    </>
  )
}
