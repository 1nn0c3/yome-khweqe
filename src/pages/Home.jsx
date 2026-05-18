import { motion } from 'framer-motion'
import HeroSection from '../components/HeroSection'
import Marquee from '../components/Marquee'
import ProductCard from '../components/ProductCard'
import Typewriter from '../components/Typewriter'
import { products } from '../data/products'
import { fadeUp } from '../animations/variants'

// TODO: Replace featured products with API call
const featured = products.slice(0, 3)

export default function Home() {
  return (
    <>
      <HeroSection />
      <Marquee />

      <section className="section container">
        <motion.h2
          className="heading-lg text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ marginBottom: '3rem' }}
        >
          Featured Drops
        </motion.h2>
        <div className="featured-grid">
          {featured.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              direction={i % 2 === 0 ? 'left' : 'right'}
            />
          ))}
        </div>
      </section>

      <section className="brand-strip">
        <Typewriter
          text="Born in the streets of Joburg. Built for those who move different."
          highlights={['Joburg', 'move different']}
        />
      </section>
    </>
  )
}
