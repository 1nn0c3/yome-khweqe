import { motion } from 'framer-motion'

export default function FilterBar({ categories, active, onChange }) {
  return (
    <div className="filter-bar">
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          className={`filter-btn ${active === cat ? 'active' : ''}`}
          onClick={() => onChange(cat)}
          style={{ position: 'relative' }}
        >
          {cat}
          {active === cat && (
            <motion.span
              layoutId="filterUnderline"
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 2,
                background: 'var(--gold)',
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  )
}
