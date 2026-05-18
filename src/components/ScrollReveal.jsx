import { motion } from 'framer-motion'
import { fadeUp, fadeUpReduced } from '../animations/variants'
import { useEffect, useState } from 'react'

export default function ScrollReveal({
  children,
  className = '',
  as: Component = motion.section,
  ...props
}) {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <Component
      className={className}
      variants={reduced ? fadeUpReduced : fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      {...props}
    >
      {children}
    </Component>
  )
}
