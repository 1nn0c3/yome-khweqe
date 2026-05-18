import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { couriers } from '../data/couriers'
import { buildCartOrderWhatsAppUrl } from '../utils/whatsapp'
import { fadeUp } from '../animations/variants'

const emptyDelivery = {
  addressLine1: '',
  addressLine2: '',
  city: '',
  province: '',
  postalCode: '',
  courier: '',
  notes: '',
}

const emptyCustomer = {
  name: '',
  phone: '',
}

export default function Cart() {
  const { items, total, itemCount, updateQuantity, updateSize, removeItem, clearCart } =
    useCart()
  const [customer, setCustomer] = useState(emptyCustomer)
  const [delivery, setDelivery] = useState(emptyDelivery)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const setCustomerField = (field, value) =>
    setCustomer((c) => ({ ...c, [field]: value }))

  const setDeliveryField = (field, value) =>
    setDelivery((d) => ({ ...d, [field]: value }))

  const validate = () => {
    const next = {}
    if (!customer.name.trim()) next.name = 'Name is required'
    if (!customer.phone.trim()) next.phone = 'Phone is required'
    if (!delivery.addressLine1.trim()) next.addressLine1 = 'Street address is required'
    if (!delivery.city.trim()) next.city = 'City is required'
    if (!delivery.courier) next.courier = 'Please choose a courier'
    if (items.some((i) => !i.size)) next.items = 'Every item needs a size'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleCheckout = (e) => {
    e.preventDefault()
    if (!items.length) return
    if (!validate()) return

    setSubmitting(true)
    const url = buildCartOrderWhatsAppUrl({
      customer,
      delivery,
      items,
      total,
    })
    clearCart()
    setCustomer(emptyCustomer)
    setDelivery(emptyDelivery)
    window.open(url, '_blank')
    setSubmitting(false)
  }

  return (
    <section className="section container cart-page">
      <motion.h1
        className="heading-xl"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        YOUR CART
      </motion.h1>
      <motion.p
        className="text-muted"
        style={{ marginTop: '0.5rem', marginBottom: '2rem' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {itemCount > 0
          ? `${itemCount} item${itemCount !== 1 ? 's' : ''} — fill in delivery details to checkout via WhatsApp`
          : 'Your cart is empty'}
      </motion.p>

      {!items.length ? (
        <div className="cart-empty">
          <Link to="/shop" className="btn-wipe">
            Shop Collection
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div
                  key={item.cartItemId}
                  className="cart-item"
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <img src={item.image} alt={item.name} className="cart-item__img" />
                  <div className="cart-item__details">
                    <h3>{item.name}</h3>
                    <p className="text-gold">R{item.price.toLocaleString()}</p>
                    <label className="cart-item__label">
                      Size
                      <select
                        value={item.size}
                        onChange={(e) => updateSize(item.cartItemId, e.target.value)}
                        className="cart-select"
                      >
                        {(item.sizes || ['S', 'M', 'L', 'XL']).map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </label>
                    <div className="cart-item__qty">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="cart-item__remove"
                    onClick={() => removeItem(item.cartItemId)}
                    aria-label="Remove item"
                  >
                    ×
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            <p className="cart-total-line">
              Subtotal: <span className="text-gold">R{total.toLocaleString()}</span>
            </p>
          </div>

          <form className="cart-checkout" onSubmit={handleCheckout}>
            <h2 className="heading-md">Delivery Details</h2>
            <p className="text-muted cart-checkout__hint">
              Complete this form, then checkout — your order is sent to us on WhatsApp and your cart is cleared.
            </p>

            <div className="form-group">
              <label htmlFor="cust-name">Full Name</label>
              <input
                id="cust-name"
                value={customer.name}
                onChange={(e) => setCustomerField('name', e.target.value)}
                placeholder="Your full name"
              />
              <span className="form-underline" />
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="cust-phone">Phone (WhatsApp)</label>
              <input
                id="cust-phone"
                type="tel"
                value={customer.phone}
                onChange={(e) => setCustomerField('phone', e.target.value)}
                placeholder="e.g. 079 186 1202"
              />
              <span className="form-underline" />
              {errors.phone && <span className="form-error">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="addr1">Street Address</label>
              <input
                id="addr1"
                value={delivery.addressLine1}
                onChange={(e) => setDeliveryField('addressLine1', e.target.value)}
                placeholder="House / unit, street name"
              />
              <span className="form-underline" />
              {errors.addressLine1 && (
                <span className="form-error">{errors.addressLine1}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="addr2">Suburb / Complex (optional)</label>
              <input
                id="addr2"
                value={delivery.addressLine2}
                onChange={(e) => setDeliveryField('addressLine2', e.target.value)}
                placeholder="Suburb, estate, or landmark"
              />
              <span className="form-underline" />
            </div>

            <div className="cart-form-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  id="city"
                  value={delivery.city}
                  onChange={(e) => setDeliveryField('city', e.target.value)}
                  placeholder="Johannesburg"
                />
                <span className="form-underline" />
                {errors.city && <span className="form-error">{errors.city}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="postal">Postal Code</label>
                <input
                  id="postal"
                  value={delivery.postalCode}
                  onChange={(e) => setDeliveryField('postalCode', e.target.value)}
                  placeholder="2000"
                />
                <span className="form-underline" />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="province">Province (optional)</label>
              <input
                id="province"
                value={delivery.province}
                onChange={(e) => setDeliveryField('province', e.target.value)}
                placeholder="Gauteng"
              />
              <span className="form-underline" />
            </div>

            <div className="form-group">
              <label htmlFor="courier">Courier</label>
              <select
                id="courier"
                className="cart-select cart-select--full"
                value={delivery.courier}
                onChange={(e) => setDeliveryField('courier', e.target.value)}
              >
                <option value="">Select your preferred courier</option>
                {couriers.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {errors.courier && <span className="form-error">{errors.courier}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="notes">Delivery Notes (optional)</label>
              <textarea
                id="notes"
                rows={3}
                value={delivery.notes}
                onChange={(e) => setDeliveryField('notes', e.target.value)}
                placeholder="Gate code, preferred delivery time, etc."
              />
              <span className="form-underline" />
            </div>

            {errors.items && <p className="form-error">{errors.items}</p>}

            <motion.button
              type="submit"
              className="btn-wipe cart-checkout__btn"
              disabled={submitting}
              whileTap={{ scale: 0.97 }}
            >
              Checkout via WhatsApp — R{total.toLocaleString()}
            </motion.button>
          </form>
        </div>
      )}
    </section>
  )
}
