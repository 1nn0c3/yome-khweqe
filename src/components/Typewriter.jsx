import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Typewriter({
  text,
  highlights = [],
  speed = 40,
  className = '',
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
  }, [])

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setDisplayed(text)
      setDone(true)
      return
    }
    let i = 0
    const timer = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(timer)
        setDone(true)
      }
    }, speed)
    return () => clearInterval(timer)
  }, [inView, text, speed, reduced])

  const renderContent = () => {
    if (!highlights.length) return displayed

    const parts = []
    let remaining = displayed
    highlights.forEach((word) => {
      const idx = remaining.indexOf(word)
      if (idx === -1) return
      if (idx > 0) parts.push(remaining.slice(0, idx))
      parts.push(
        <span key={word} className={`highlight ${done ? 'underlined' : ''}`}>
          {remaining.slice(idx, idx + word.length)}
        </span>
      )
      remaining = remaining.slice(idx + word.length)
    })
    if (remaining) parts.push(remaining)
    return parts.length ? parts : displayed
  }

  return (
    <motion.p
      ref={ref}
      className={`typewriter ${className}`}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
    >
      {renderContent()}
      {!done && inView && !reduced && <span className="text-gold">|</span>}
    </motion.p>
  )
}
