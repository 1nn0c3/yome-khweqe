// TODO: Replace with API call
export const exclusives = [
  {
    id: 'E01',
    name: 'YK Sovereign Jacket',
    price: 3500,
    description:
      'Hand-finished. Gold embroidery. Only 20 units ever made. This is not just a jacket — it is a statement.',
    units: 20,
    image:
      'https://via.placeholder.com/600x700/0a0a0a/D4AF37?text=EXCLUSIVE',
  },
  {
    id: 'E02',
    name: 'YK Crest Tracksuit',
    price: 4200,
    description:
      'Full crest embroidery front and back. Premium heavyweight fabric. Limited to 15 sets.',
    units: 15,
    image:
      'https://via.placeholder.com/600x700/0a0a0a/D4AF37?text=EXCLUSIVE',
  },
  {
    id: 'E03',
    name: 'YK Signature Bomber',
    price: 3800,
    description:
      'Satin finish bomber with hand-painted gold detail. 10 units only.',
    units: 10,
    image:
      'https://via.placeholder.com/600x700/0a0a0a/D4AF37?text=EXCLUSIVE',
  },
]

export function getExclusiveById(id) {
  return exclusives.find((e) => e.id === id)
}
