import { useMemo } from 'react'

function generateParticles(count = 35) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: `${2 + Math.random() * 4}px`,
    duration: `${15 + Math.random() * 25}s`,
    delay: `${Math.random() * 20}s`,
    opacity: 0.2 + Math.random() * 0.3,
  }))
}

export default function Particles() {
  const particles = useMemo(() => generateParticles(35), [])

  return (
    <div className="particles-layer" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: p.duration,
            animationDelay: p.delay,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  )
}
