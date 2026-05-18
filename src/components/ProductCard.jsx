import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeUp } from '../animations/variants'
import GoldBorderButton from './GoldBorderButton'

export default function ProductCard({ product, variant = 'featured', direction = 'left' }) {
  const slideVariant =
    direction === 'right'
      ? {
          hidden: { opacity: 0, x: 60 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
        }
      : {
          hidden: { opacity: 0, x: -60 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
        }

  const variants = variant === 'featured' ? slideVariant : fadeUp

  return (
    <motion.article
      className="product-card"
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      whileHover={{ y: -10 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <div className="product-card__blob" />
      <div className="product-card__image-wrap">
        <Link to={`/product/${product.id}`} style={{ display: 'block', width: '100%', height: '100%' }}>
          <img src={product.image} alt={product.name} loading="lazy" />
        </Link>
        {variant === 'shop' && (
          <div className="shop-card-overlay">
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem' }}>{product.name}</h3>
            <GoldBorderButton to={`/product/${product.id}`}>View Details</GoldBorderButton>
          </div>
        )}
      </div>
      <div className="product-card__body">
        <Link to={`/product/${product.id}`} style={{ display: 'block' }}>
          {product.tag && <span className="product-card__tag">{product.tag}</span>}
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', marginBottom: '0.25rem' }}>
            {product.name}
          </h3>
          <p className="text-gold">R{product.price.toLocaleString()}</p>
          {variant === 'featured' && (
            <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>
              {product.description.slice(0, 60)}...
            </p>
          )}
        </Link>
      </div>
    </motion.article>
  )
}
