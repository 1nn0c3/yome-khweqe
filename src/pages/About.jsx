import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Typewriter from '../components/Typewriter'
import Skyline from '../components/Skyline'
import { fadeUp, cardFlip } from '../animations/variants'

const values = [
  {
    title: 'Authenticity',
    text: 'Every piece tells a Joburg story. No copies. No compromises.',
  },
  {
    title: 'Quality',
    text: 'Premium fabrics. Gold detailing. Built to last the streets.',
  },
  {
    title: 'Culture',
    text: 'Born from the culture, for those who move different.',
  },
]

const story =
  'Yome Khweqe was born in the heart of Johannesburg — where street culture meets luxury ambition. Since day one, we have crafted premium urban wear for those who refuse to blend in. From gold paint-splash tracksuits to limited exclusives, every drop is a statement.'

export default function About() {
  const skylineRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: skylineRef,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <>
      <section className="section container" style={{ paddingTop: '4rem' }}>
        <motion.h1
          className="heading-xl text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          OUR STORY
        </motion.h1>

        <div style={{ maxWidth: 800, margin: '3rem auto' }}>
          <Typewriter text={story} speed={25} />
        </div>

        <div className="value-cards" style={{ marginTop: '4rem' }}>
          {values.map((v) => (
            <motion.div
              key={v.title}
              className="value-card"
              variants={cardFlip}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
            >
              <h3>{v.title}</h3>
              <p className="text-muted">{v.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <div style={{ position: 'relative', minHeight: 200, overflow: 'hidden' }}>
        <div className="paint-blob blob-1" style={{ opacity: 0.5 }} />
        <div className="paint-blob blob-2" style={{ opacity: 0.4 }} />
        <motion.div ref={skylineRef} style={{ y, opacity: 0.35 }}>
          <Skyline />
        </motion.div>
      </div>
    </>
  )
}
