import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function AnimatedCursor() {
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)
  const [reduced, setReduced] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 150, damping: 20 })
  const springY = useSpring(y, { stiffness: 150, damping: 20 })

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (reduced) return

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const enter = () => setHovering(true)
    const leave = () => setHovering(false)

    window.addEventListener('mousemove', move)
    const clickables = document.querySelectorAll(
      'a, button, input, textarea, select, [role="button"], .btn-gold-border, .btn-wipe'
    )
    clickables.forEach((el) => {
      el.addEventListener('mouseenter', enter)
      el.addEventListener('mouseleave', leave)
    })

    const observer = new MutationObserver(() => {
      document
        .querySelectorAll(
          'a, button, input, textarea, select, [role="button"], .btn-gold-border, .btn-wipe'
        )
        .forEach((el) => {
          el.addEventListener('mouseenter', enter)
          el.addEventListener('mouseleave', leave)
        })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', move)
      observer.disconnect()
    }
  }, [reduced, visible, x, y])

  if (reduced) return null

  return (
    <motion.div
      className={`custom-cursor ${hovering ? 'custom-cursor--hover' : ''}`}
      style={{
        left: springX,
        top: springY,
        opacity: visible ? 1 : 0,
      }}
      animate={{
        scale: hovering ? 1 : 1,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    />
  )
}
