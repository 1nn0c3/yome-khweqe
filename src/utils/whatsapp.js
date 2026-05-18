// South Africa: 0791861202 → international format for wa.me
const WHATSAPP_NUMBER = '27791861202'

export function buildWhatsAppUrl(productName, size = '') {
  const sizePart = size ? ` in size ${size}` : ''
  const text = encodeURIComponent(
    `Hi, I want to order ${productName}${sizePart}`
  )
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
}

export function buildExclusiveWhatsAppUrl(productName) {
  const text = encodeURIComponent(
    `Hi, I'm interested in the exclusive: ${productName}`
  )
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
}

export function buildGeneralWhatsAppUrl(
  message = 'Hi, I want to get in touch with Yome Khweqe.'
) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

/**
 * Builds WhatsApp link for full cart checkout with delivery details.
 */
export function buildCartOrderWhatsAppUrl({ customer, delivery, items, total }) {
  const lines = [
    'Hi, I would like to place an order with Yome Khweqe.',
    '',
    '*Customer*',
    `Name: ${customer.name}`,
    `Phone: ${customer.phone}`,
    '',
    '*Delivery Address*',
    delivery.addressLine1,
    delivery.addressLine2 ? delivery.addressLine2 : null,
    `${delivery.city}${delivery.postalCode ? `, ${delivery.postalCode}` : ''}`,
    delivery.province ? `Province: ${delivery.province}` : null,
    '',
    '*Courier*',
    delivery.courier,
    '',
    '*Order*',
    ...items.map(
      (item, i) =>
        `${i + 1}. ${item.name} — Size ${item.size} × ${item.quantity} — R${(item.price * item.quantity).toLocaleString()}`
    ),
    '',
    `*Total: R${total.toLocaleString()}*`,
  ].filter(Boolean)

  if (delivery.notes?.trim()) {
    lines.push('', '*Notes*', delivery.notes.trim())
  }

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`
}
