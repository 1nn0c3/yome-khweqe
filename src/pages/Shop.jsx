import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FilterBar from '../components/FilterBar'
import ProductCard from '../components/ProductCard'
import { products, categories } from '../data/products'
import { headerSlide, filterItem } from '../animations/variants'

// TODO: Replace with API call
export default function Shop() {
  const [active, setActive] = useState('All')

  const filtered =
    active === 'All'
      ? products
      : products.filter((p) => p.category === active)

  return (
    <div className="section container">
      <motion.h1
        className="heading-xl text-center"
        variants={headerSlide}
        initial="hidden"
        animate="visible"
      >
        THE COLLECTION
      </motion.h1>
      <motion.p
        className="text-center text-muted"
        style={{ marginTop: '1rem', fontSize: '1.1rem' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Joburg&apos;s finest streetwear
      </motion.p>

      <FilterBar categories={categories} active={active} onChange={setActive} />

      <motion.div layout className="shop-grid">
        <AnimatePresence mode="popLayout">
          {filtered.map((product, i) => (
            <motion.div
              key={product.id}
              layout
              variants={filterItem}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ delay: i * 0.05 }}
            >
              <ProductCard product={product} variant="shop" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
