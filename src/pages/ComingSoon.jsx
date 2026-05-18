import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeUp } from '../animations/variants'

export default function ComingSoon({ title = 'Coming Soon' }) {
  return (
    <div className="coming-soon-page container">
      <motion.h1 className="heading-xl text-gold" variants={fadeUp} initial="hidden" animate="visible">
        {title}
      </motion.h1>
      <motion.p className="text-muted" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        We&apos;re building something special. Check back soon.
      </motion.p>
      <Link to="/" className="btn-wipe" style={{ marginTop: '2rem' }}>
        Back Home
      </Link>
    </div>
  )
}
