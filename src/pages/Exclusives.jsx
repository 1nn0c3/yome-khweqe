import { useEffect, useState } from 'react'
import ExclusivePanel from '../components/ExclusivePanel'
import { exclusives } from '../data/exclusives'

// TODO: Replace with API call
export default function Exclusives() {
  const [visibleLetters, setVisibleLetters] = useState(0)
  const title = 'EXCLUSIVES'
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    if (mq.matches) {
      setVisibleLetters(title.length)
      return
    }
    let i = 0
    const interval = setInterval(() => {
      i++
      setVisibleLetters(i)
      if (i >= title.length) clearInterval(interval)
    }, 120)
    return () => clearInterval(interval)
  }, [title.length])

  return (
    <div className="exclusives-page">
      <header className="exclusives-header">
        <h1>
          {title.split('').map((letter, i) => (
            <span
              key={i}
              className="glitch-letter"
              style={{
                animationDelay: reduced ? '0s' : `${i * 0.12}s`,
                opacity: i < visibleLetters ? 1 : 0,
              }}
            >
              {letter}
            </span>
          ))}
        </h1>
        <p className="exclusives-sub">Limited. Rare. Yours.</p>
        <div className="burn-line" style={{ maxWidth: '90vw' }} />
      </header>

      {exclusives.map((item, i) => (
        <ExclusivePanel
          key={item.id}
          item={item}
          reverse={i % 2 === 1}
          showDivider={i < exclusives.length - 1}
        />
      ))}
    </div>
  )
}
