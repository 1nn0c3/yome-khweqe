import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AnimatedCursor from './components/AnimatedCursor'
import Particles from './components/Particles'
import PageTransition from './components/PageTransition'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Exclusives from './pages/Exclusives'
import ProductDetail from './pages/ProductDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import ComingSoon from './pages/ComingSoon'
import Cart from './pages/Cart'

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <AnimatedCursor />
        <Particles />
        <Navbar />
        <main>
          <Routes>
            <Route element={<PageTransition />}>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/exclusives" element={<Exclusives />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/admin" element={<ComingSoon title="Admin" />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
