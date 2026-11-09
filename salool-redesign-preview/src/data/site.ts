export type Product = {
  id: string
  name: string
  category: string
  meta: string
  priceFrom: string
  prices: { label: string; price: string }[]
  image: string
  tone: string
  badge?: string
}

export const PRODUCTS: Product[] = [
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    category: 'Hot coffee',
    meta: 'Hot · 3 sizes',
    priceFrom: '$2.00',
    prices: [
      { label: 'Small', price: '$2.00' },
      { label: 'Medium', price: '$2.45' },
      { label: 'Large', price: '$2.75' },
    ],
    image: '/products/cappuccino.webp',
    tone: '#e8d8bd',
    badge: 'Bestseller',
  },
  {
    id: 'iced-latte',
    name: 'Iced Latte',
    category: 'Iced coffee',
    meta: 'Iced · 2 sizes',
    priceFrom: '$2.00',
    prices: [
      { label: 'Small', price: '$2.00' },
      { label: 'Large', price: '$3.00' },
    ],
    image: '/products/iced-latte.webp',
    tone: '#e9d6c7',
    badge: 'Bestseller',
  },
  {
    id: 'caramel-frappe',
    name: 'Caramel Frappe',
    category: 'Blended',
    meta: 'Blended · 2 sizes',
    priceFrom: '$3.75',
    prices: [
      { label: 'Small', price: '$3.75' },
      { label: 'Large', price: '$4.75' },
    ],
    image: '/products/caramel-frappe.webp',
    tone: '#e5cbb2',
  },
  {
    id: 'cafe-latte',
    name: 'Café Latte',
    category: 'Hot coffee',
    meta: 'Hot · 3 sizes',
    priceFrom: '$2.00',
    prices: [
      { label: 'Small', price: '$2.00' },
      { label: 'Medium', price: '$2.45' },
      { label: 'Large', price: '$2.75' },
    ],
    image: '/products/cafe-latte.webp',
    tone: '#ecd9c1',
  },
  {
    id: 'berry-smoothie',
    name: 'Blueberry Strawberry Smoothie',
    category: 'Smoothie',
    meta: 'Fruit · 2 sizes',
    priceFrom: '$3.50',
    prices: [
      { label: 'Small', price: '$3.50' },
      { label: 'Large', price: '$4.50' },
    ],
    image: '/products/berry-smoothie.webp',
    tone: '#ecd0d2',
  },
]

export const BRAND = {
  name: 'Salool Café',
  tagline: 'Mogadishu’s favourite café.',
  phone: '2728',
  phoneHref: 'tel:2728',
  email: 'support@salool.com',
  emailHref: 'mailto:support@salool.com',
  description:
    'Handcrafted coffee, iced drinks and pastries across three branches in Mogadishu.',
  offer: '20% off your first 2 orders',
}

export const BRANCHES = [
  { name: 'Salool Kobac', address: 'KM5, Zoobe, Hodan, Mogadishu' },
  { name: 'Salool Banadir', address: 'Digfeer Road, Hodan, Mogadishu' },
  { name: 'Salool Ventuna October', address: '21 October Road, Waberi, Mogadishu' },
]

export const HOURS = [
  { days: 'Saturday – Thursday', time: '6:30 AM – 11:30 PM' },
  { days: 'Friday', time: '9:00 AM – 12:00 AM' },
]

export const LINKS = {
  menu: 'https://salool.com/menu',
  giftCards: 'https://salool.com/gift-cards',
  contact: 'https://salool.com/contact-us',
  appStore: 'https://apps.apple.com/gb/app/salool-cafe/id6754592682',
  googlePlay: 'https://play.google.com/store/apps/details?id=com.salool.app&hl=en-US',
  x: 'https://x.com/saloolcafe',
}
