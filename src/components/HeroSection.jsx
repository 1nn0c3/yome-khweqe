import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import GoldBorderButton from './GoldBorderButton'
import Skyline from './Skyline'
import { letterStagger } from '../animations/variants'

const BRAND = 'YOME KHWEQE'

export default function HeroSection() {
  const [showTagline, setShowTagline] = useState(false)
  const [showCtas, setShowCtas] = useState(false)
  const [lettersDone, setLettersDone] = useState(false)
  const [reduced, setReduced] = useState(false)
  const { scrollY } = useScroll()
  const skylineY = useTransform(scrollY, [0, 500], [0, -80])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    if (mq.matches) {
      setLettersDone(true)
      setShowTagline(true)
      setShowCtas(true)
      return
    }
    const letterDelay = BRAND.length * 60 + 300
    const t0 = setTimeout(() => setLettersDone(true), letterDelay)
    const t1 = setTimeout(() => setShowTagline(true), letterDelay + 400)
    const t2 = setTimeout(() => setShowCtas(true), letterDelay + 900)
    return () => {
      clearTimeout(t0)
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  return (
    <section className="hero">
      <div className="paint-blob blob-1" />
      <div className="paint-blob blob-2" />
      <div className="paint-blob blob-3" />

      <h1 className={`hero__brand ${lettersDone ? 'shimmer-text' : ''}`}>
        {BRAND.split('').map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            className="hero__letter"
            custom={i}
            variants={letterStagger}
            initial="hidden"
            animate="visible"
            style={char === ' ' ? { width: '0.35em', display: 'inline-block' } : {}}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </h1>

      <motion.p
        className="hero__tagline"
        initial={{ opacity: 0 }}
        animate={{ opacity: showTagline ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        Since Day One
      </motion.p>

      <motion.div
        className="hero__ctas"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showCtas ? 1 : 0, y: showCtas ? 0 : 20 }}
        transition={{ duration: 0.6 }}
      >
        <GoldBorderButton to="/shop">Shop Collection</GoldBorderButton>
        <GoldBorderButton to="/exclusives">View Exclusives</GoldBorderButton>
      </motion.div>

      <motion.div className="hero__skyline" style={{ y: reduced ? 0 : skylineY }}>
        <Skyline />
      </motion.div>
    </section>
  )
}
