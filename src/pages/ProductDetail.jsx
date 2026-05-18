import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getProductById } from '../data/products'
import { buildWhatsAppUrl } from '../utils/whatsapp'
import { useCart } from '../context/CartContext'
import GoldBorderButton from '../components/GoldBorderButton'
import { slamIn } from '../animations/variants'

function PriceCounter({ value }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      setCount(value)
      return
    }
    const duration = 1200
    const start = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      setCount(Math.floor(progress * value))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [value])

  return (
    <span className="text-gold" style={{ fontSize: '2rem', fontWeight: 600 }}>
      R{count.toLocaleString()}
    </span>
  )
}

export default function ProductDetail() {
  const { id } = useParams()
  const product = getProductById(id)
  const { addItem } = useCart()
  const [size, setSize] = useState('')
  const [added, setAdded] = useState(false)
  const [pulse, setPulse] = useState(false)

  if (!product) {
    return (
      <div className="coming-soon-page container">
        <h1 className="heading-lg">Product Not Found</h1>
        <Link to="/shop" className="back-link">
          ← Back to Shop
        </Link>
      </div>
    )
  }

  const sizes = product.sizes || ['S', 'M', 'L', 'XL']

  const handleAddToCart = () => {
    if (!size) return
    addItem(product, size)
    setAdded(true)
    setPulse(true)
    setTimeout(() => setPulse(false), 400)
    setTimeout(() => setAdded(false), 2000)
  }

  const handleQuickWhatsApp = () => {
    if (!size) return
    window.open(buildWhatsAppUrl(product.name, size), '_blank')
  }

  return (
    <>
      <motion.div
        className="product-detail-hero"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <img src={product.image} alt={product.name} />
      </motion.div>

      <div className="product-detail-content container">
        <Link to="/shop" className="back-link">
          <span className="arrow">←</span> Back to Shop
        </Link>

        <motion.h1
          className="heading-lg"
          variants={slamIn}
          initial="hidden"
          animate="visible"
        >
          {product.name}
        </motion.h1>

        {product.tag && (
          <span className="product-card__tag" style={{ marginTop: '0.75rem' }}>
            {product.tag}
          </span>
        )}

        <div style={{ margin: '1rem 0' }}>
          <PriceCounter value={product.price} />
        </div>

        <p className="text-muted" style={{ lineHeight: 1.8, margin: '1.5rem 0' }}>
          {product.description}
        </p>

        <p
          style={{
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontSize: '0.8rem',
            marginBottom: '0.75rem',
          }}
        >
          Select Size
        </p>
        <div className="size-selector">
          {sizes.map((s, i) => (
            <motion.button
              key={s}
              type="button"
              className={`size-btn ${size === s ? 'selected' : ''}`}
              onClick={() => setSize(s)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileTap={{ scale: 0.92 }}
            >
              {size === s && (
                <motion.span
                  className="size-fill"
                  layoutId={`sizeFill-${s}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                />
              )}
              {s}
            </motion.button>
          ))}
        </div>

        <div className="product-detail-actions">
          <motion.button
            type="button"
            className="btn-wipe"
            style={{ opacity: size ? 1 : 0.5 }}
            onClick={handleAddToCart}
            animate={{ scale: pulse ? 0.95 : 1 }}
            disabled={!size}
          >
            {added ? 'Added to Cart ✓' : 'Add to Cart'}
          </motion.button>
          <GoldBorderButton to="/cart">Go to Cart</GoldBorderButton>
        </div>

        <button
          type="button"
          className="product-detail-quick-wa"
          onClick={handleQuickWhatsApp}
          disabled={!size}
        >
          Or order this item only via WhatsApp
        </button>
      </div>
    </>
  )
}
