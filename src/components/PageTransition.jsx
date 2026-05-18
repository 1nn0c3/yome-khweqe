import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'

export default function PageTransition() {
  const location = useLocation()
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  if (reduced) {
    return <Outlet />
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname}>
        <motion.div
          className="page-curtain"
          initial={{ x: '-100%' }}
          animate={{ x: ['-100%', '0%', '0%', '100%'] }}
          transition={{
            duration: 0.9,
            times: [0, 0.35, 0.5, 1],
            ease: [0.76, 0, 0.24, 1],
          }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <Outlet />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
