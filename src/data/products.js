// TODO: Replace with API call
export const products = [
  {
    id: 1,
    name: 'Yomakhweqe Lento 2-Piece',
    category: 'Tracksuits',
    price: 2200,
    description:
      'Jacket + Trouser set. Black with gold paint-splash design. The one that started it all.',
    tag: 'BESTSELLER',
    image:
      'https://via.placeholder.com/400x500/0a0a0a/D4AF37?text=YOME+KHWEQE',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 2,
    name: 'YK Street Jacket',
    category: 'Jackets',
    price: 1400,
    description:
      'Standalone jacket. Black and gold detailing. Built for the streets.',
    tag: 'NEW',
    image:
      'https://via.placeholder.com/400x500/0a0a0a/D4AF37?text=YOME+KHWEQE',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 3,
    name: 'YK Cargo Trouser',
    category: 'Trousers',
    price: 900,
    description: 'Standalone cargo trouser. Black with gold hardware.',
    tag: null,
    image:
      'https://via.placeholder.com/400x500/0a0a0a/D4AF37?text=YOME+KHWEQE',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 4,
    name: 'YK Classic Hoodie',
    category: 'Jackets',
    price: 1100,
    description:
      'Premium heavyweight hoodie. Gold embroidered crest on chest.',
    tag: 'NEW',
    image:
      'https://via.placeholder.com/400x500/0a0a0a/D4AF37?text=YOME+KHWEQE',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 5,
    name: 'YK Jogger Set',
    category: 'Tracksuits',
    price: 1800,
    description: 'Matching hoodie and jogger. Clean. Simple. Yome Khweqe.',
    tag: null,
    image:
      'https://via.placeholder.com/400x500/0a0a0a/D4AF37?text=YOME+KHWEQE',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 6,
    name: 'YK Cargo Shorts',
    category: 'Trousers',
    price: 750,
    description: 'Street cargo shorts. Gold zip detail.',
    tag: null,
    image:
      'https://via.placeholder.com/400x500/0a0a0a/D4AF37?text=YOME+KHWEQE',
    sizes: ['S', 'M', 'L', 'XL'],
  },
]

export const categories = [
  'All',
  'Tracksuits',
  'Jackets',
  'Trousers',
  'Accessories',
]

export function getProductById(id) {
  return products.find((p) => p.id === Number(id))
}
