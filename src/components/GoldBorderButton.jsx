import { Link } from 'react-router-dom'

export default function GoldBorderButton({ to, href, children, onClick, className = '' }) {
  const content = (
    <>
      <svg className="border-svg" preserveAspectRatio="none" viewBox="0 0 100 100">
        <rect x="1" y="1" width="98" height="98" rx="0" vectorEffect="non-scaling-stroke" />
      </svg>
      <span>{children}</span>
    </>
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`btn-gold-border ${className}`}>
        {content}
      </a>
    )
  }

  if (to) {
    return (
      <Link to={to} className={`btn-gold-border ${className}`}>
        {content}
      </Link>
    )
  }

  return (
    <button type="button" onClick={onClick} className={`btn-gold-border ${className}`}>
      {content}
    </button>
  )
}
