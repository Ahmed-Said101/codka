// Generated from the official Salool Café menu page (saloolcafe.com/menu), captured November 2026.
// Prices, sizes, badges and categories are transcribed verbatim — never invent items or prices here.

export type MenuSize = { size: string; price: number };

export type MenuItem = {
  id: string;
  name: string;
  category: string;
  sourceCategory: string;
  badge: string | null;
  sizes: MenuSize[];
  price: number | null;
  img: string | null;
  min: number;
  max: number;
};

export type MenuCategory = { id: string; name: string; source: string; count: number };

export const menu: MenuItem[] = [
  { id: "cappuccino", name: "Cappuccino", category: "Hot Coffee", sourceCategory: "Hot Coffee", badge: "Bestseller", sizes: [{"size":"Small","price":2},{"size":"Medium","price":2.45},{"size":"Large","price":2.75}], price: null, img: "/products/cappuccino.webp", min: 2.00, max: 2.75 },
  { id: "cinnamon-rolls", name: "Cinnamon Rolls", category: "Pastries", sourceCategory: "pastry_kobac", badge: "Bestseller", sizes: [], price: 1.25, img: "/products/cinnamon-rolls.webp", min: 1.25, max: 1.25 },
  { id: "iced-latte", name: "Iced Latte", category: "Iced Coffee", sourceCategory: "Iced coffee", badge: "Bestseller", sizes: [{"size":"Small","price":2},{"size":"Large","price":3}], price: null, img: "/products/iced-latte.webp", min: 2.00, max: 3.00 },
  { id: "iced-spanish-latte", name: "Iced Spanish Latte", category: "Iced Coffee", sourceCategory: "Iced coffee", badge: "Bestseller", sizes: [{"size":"Small","price":2.5},{"size":"Large","price":3.5}], price: null, img: "/products/iced-spanish-latte.webp", min: 2.50, max: 3.50 },
  { id: "passion-pear-smoothie", name: "Passion Pear Smoothie", category: "Smoothies", sourceCategory: "Smoothies", badge: "Bestseller", sizes: [{"size":"Small","price":3.5},{"size":"Large","price":4.5}], price: null, img: "/products/passion-pear-smoothie.webp", min: 3.50, max: 4.50 },
  { id: "affogato", name: "Affogato", category: "Hot Coffee", sourceCategory: "Hot Coffee", badge: null, sizes: [{"size":"Small","price":2.5},{"size":"Medium","price":2.75},{"size":"Large","price":3}], price: null, img: "/products/affogato.webp", min: 2.50, max: 3.00 },
  { id: "americano", name: "Americano", category: "Hot Coffee", sourceCategory: "Hot Coffee", badge: null, sizes: [{"size":"Small","price":1.5},{"size":"Medium","price":1.75},{"size":"Large","price":2}], price: null, img: "/products/americano.webp", min: 1.50, max: 2.00 },
  { id: "banana-bread", name: "Banana Bread", category: "Pastries", sourceCategory: "pastry_kobac", badge: null, sizes: [], price: 2, img: "/products/banana-bread.webp", min: 2.00, max: 2.00 },
  { id: "basbusa", name: "Basbusa", category: "Cakes", sourceCategory: "Cakes", badge: null, sizes: [], price: 2.5, img: "/products/basbusa.webp", min: 2.50, max: 2.50 },
  { id: "beetroot-mojito", name: "Beetroot Mojito", category: "Refreshers", sourceCategory: "Refresher", badge: null, sizes: [], price: 3, img: "/products/beetroot-mojito.webp", min: 3.00, max: 3.00 },
  { id: "black-tea", name: "Black Tea", category: "Hot Tea", sourceCategory: "Hot Tea", badge: null, sizes: [{"size":"Small","price":1},{"size":"Medium","price":1.5},{"size":"Large","price":2}], price: null, img: "/products/black-tea.webp", min: 1.00, max: 2.00 },
  { id: "blueberry-frappe", name: "Blueberry Frappe", category: "Frappés", sourceCategory: "Frappes", badge: null, sizes: [{"size":"Small","price":3.45},{"size":"Large","price":4.45}], price: null, img: "/products/blueberry-frappe.webp", min: 3.45, max: 4.45 },
  { id: "blueberry-refresher", name: "Blueberry Refresher", category: "Refreshers", sourceCategory: "Refresher", badge: null, sizes: [{"size":"Small","price":3},{"size":"Large","price":4}], price: null, img: "/products/blueberry-refresher.webp", min: 3.00, max: 4.00 },
  { id: "blueberry-strawberry", name: "Blueberry Strawberry", category: "Smoothies", sourceCategory: "Smoothies", badge: null, sizes: [{"size":"Small","price":3.5},{"size":"Large","price":4.5}], price: null, img: "/products/blueberry-strawberry.webp", min: 3.50, max: 4.50 },
  { id: "cafe-latte", name: "Café Latte", category: "Hot Coffee", sourceCategory: "Hot Coffee", badge: null, sizes: [{"size":"Small","price":2},{"size":"Medium","price":2.45},{"size":"Large","price":2.75}], price: null, img: "/products/cafe-latte.webp", min: 2.00, max: 2.75 },
  { id: "caffe-mocha", name: "Caffe Mocha", category: "Hot Coffee", sourceCategory: "Hot Coffee", badge: null, sizes: [{"size":"Small","price":2.5},{"size":"Medium","price":2.75},{"size":"Large","price":3}], price: null, img: "/products/caffe-mocha.webp", min: 2.50, max: 3.00 },
  { id: "camel-milk-tea", name: "Camel Milk Tea", category: "Hot Tea", sourceCategory: "Hot Tea", badge: null, sizes: [{"size":"Small","price":2},{"size":"Medium","price":2.45},{"size":"Large","price":3}], price: null, img: "/products/camel-milk-tea.webp", min: 2.00, max: 3.00 },
  { id: "caramel-cappuccino", name: "Caramel Cappuccino", category: "Hot Coffee", sourceCategory: "Hot Coffee", badge: null, sizes: [{"size":"Small","price":2.5},{"size":"Medium","price":2.75},{"size":"Large","price":3}], price: null, img: "/products/caramel-cappuccino.webp", min: 2.50, max: 3.00 },
  { id: "caramel-latte", name: "Caramel Latte", category: "Hot Coffee", sourceCategory: "Hot Coffee", badge: null, sizes: [{"size":"Small","price":2.5},{"size":"Medium","price":2.75},{"size":"Large","price":3}], price: null, img: "/products/caramel-latte.webp", min: 2.50, max: 3.00 },
  { id: "carrot-cake", name: "Carrot cake", category: "Cakes", sourceCategory: "Cakes", badge: null, sizes: [], price: 3.25, img: "/products/carrot-cake.webp", min: 3.25, max: 3.25 },
  { id: "cherry-smoothie", name: "Cherry Smoothie", category: "Smoothies", sourceCategory: "Smoothies", badge: null, sizes: [{"size":"Small","price":3.5},{"size":"Large","price":4.5}], price: null, img: "/products/cherry-smoothie.webp", min: 3.50, max: 4.50 },
  { id: "chocolate-cake", name: "Chocolate Cake", category: "Cakes", sourceCategory: "Cakes", badge: null, sizes: [], price: 2.5, img: "/products/chocolate-cake.webp", min: 2.50, max: 2.50 },
  { id: "chocolate-chip-cookies", name: "Chocolate Chip Cookies", category: "Pastries", sourceCategory: "pastry_kobac", badge: null, sizes: [], price: 1.5, img: "/products/chocolate-chip-cookies.webp", min: 1.50, max: 1.50 },
  { id: "coconut-matcha", name: "Coconut Matcha", category: "Matcha", sourceCategory: "Matcha", badge: null, sizes: [], price: 3.7, img: "/products/coconut-matcha.webp", min: 3.70, max: 3.70 },
  { id: "coffee-caramel-frappe", name: "Coffee Caramel Frappe", category: "Frappés", sourceCategory: "Frappes", badge: null, sizes: [{"size":"Small","price":3.75},{"size":"Large","price":4.75}], price: null, img: "/products/coffee-caramel-frappe.webp", min: 3.75, max: 4.75 },
  { id: "cortado", name: "Cortado", category: "Hot Coffee", sourceCategory: "Hot Coffee", badge: null, sizes: [{"size":"Small","price":2},{"size":"Medium","price":2.45},{"size":"Large","price":2.75}], price: null, img: "/products/cortado.webp", min: 2.00, max: 2.75 },
  { id: "dasani-water", name: "Dasani Water", category: "Bottled Drinks", sourceCategory: "Bottle Drinks", badge: null, sizes: [], price: 0.5, img: "/products/dasani-water.webp", min: 0.50, max: 0.50 },
  { id: "dawa-tea", name: "Dawa Tea", category: "Hot Tea", sourceCategory: "Hot Tea", badge: null, sizes: [{"size":"Small","price":2},{"size":"Medium","price":2.45},{"size":"Large","price":2.75}], price: null, img: "/products/dawa-tea.webp", min: 2.00, max: 2.75 },
  { id: "doughnut", name: "Doughnut", category: "Pastries", sourceCategory: "pastry_kobac", badge: null, sizes: [], price: 1.5, img: "/products/doughnut.webp", min: 1.50, max: 1.50 },
  { id: "egg", name: "Egg", category: "Eggs", sourceCategory: "EGG EX", badge: null, sizes: [], price: 5.15, img: "/products/egg.webp", min: 5.15, max: 5.15 },
  { id: "espresso", name: "Espresso", category: "Hot Coffee", sourceCategory: "Hot Coffee", badge: null, sizes: [], price: 1.5, img: "/products/espresso.webp", min: 1.50, max: 1.50 },
  { id: "green-apple", name: "Green Apple", category: "Refreshers", sourceCategory: "Refresher", badge: null, sizes: [{"size":"Small","price":3},{"size":"Medium","price":4}], price: null, img: "/products/green-apple.webp", min: 3.00, max: 4.00 },
  { id: "grilled-egg-toast", name: "Grilled Egg Toast", category: "Sandwiches", sourceCategory: "Sandwiches", badge: null, sizes: [], price: 2.1, img: "/products/grilled-egg-toast.webp", min: 2.10, max: 2.10 },
  { id: "hot-chocolate", name: "Hot Chocolate", category: "Hot Coffee", sourceCategory: "Hot Coffee", badge: null, sizes: [{"size":"Small","price":2},{"size":"Medium","price":2.45},{"size":"Large","price":2.75}], price: null, img: "/products/hot-chocolate.webp", min: 2.00, max: 2.75 },
  { id: "hot-matcha-latte", name: "Hot Matcha Latte", category: "Hot Coffee", sourceCategory: "Hot Coffee", badge: null, sizes: [{"size":"Small","price":2.5},{"size":"Medium","price":2.75},{"size":"Large","price":3}], price: null, img: "/products/hot-matcha-latte.webp", min: 2.50, max: 3.00 },
  { id: "iced-americano", name: "Iced Americano", category: "Iced Coffee", sourceCategory: "Iced coffee", badge: null, sizes: [{"size":"Small","price":2},{"size":"Large","price":3}], price: null, img: "/products/iced-americano.webp", min: 2.00, max: 3.00 },
  { id: "iced-caramel-latte", name: "Iced Caramel Latte", category: "Iced Coffee", sourceCategory: "Iced coffee", badge: null, sizes: [{"size":"Small","price":2.5},{"size":"Large","price":3.5}], price: null, img: "/products/iced-caramel-latte.webp", min: 2.50, max: 3.50 },
  { id: "iced-chia-latte", name: "Iced Chia Latte", category: "Iced Tea", sourceCategory: "Iced Tea", badge: null, sizes: [{"size":"Small","price":2.89},{"size":"Large","price":3.89}], price: null, img: "/products/iced-chia-latte.webp", min: 2.89, max: 3.89 },
  { id: "iced-chocolate", name: "Iced Chocolate", category: "Iced Coffee", sourceCategory: "Iced coffee", badge: null, sizes: [{"size":"Small","price":2},{"size":"Large","price":3}], price: null, img: "/products/iced-chocolate.webp", min: 2.00, max: 3.00 },
  { id: "iced-karkade", name: "Iced Karkade", category: "Iced Tea", sourceCategory: "Iced Tea", badge: null, sizes: [{"size":"Small","price":2.5},{"size":"Large","price":3.5}], price: null, img: "/products/iced-karkade.webp", min: 2.50, max: 3.50 },
  { id: "iced-macchiato", name: "Iced Macchiato", category: "Iced Coffee", sourceCategory: "Iced coffee", badge: null, sizes: [{"size":"Small","price":2},{"size":"Large","price":3}], price: null, img: "/products/iced-macchiato.webp", min: 2.00, max: 3.00 },
  { id: "iced-matcha-latte", name: "Iced Matcha latte", category: "Matcha", sourceCategory: "Matcha", badge: null, sizes: [{"size":"Small","price":2.5},{"size":"Large","price":3.5}], price: null, img: "/products/iced-matcha-latte.webp", min: 2.50, max: 3.50 },
  { id: "iced-vanilla-latte", name: "Iced Vanilla Latte", category: "Iced Coffee", sourceCategory: "Iced coffee", badge: null, sizes: [{"size":"Small","price":2.5},{"size":"Large","price":3.5}], price: null, img: "/products/iced-vanilla-latte.webp", min: 2.50, max: 3.50 },
  { id: "khaliil-naxli", name: "Khaliil Naxli", category: "Pastries", sourceCategory: "pastry_kobac", badge: null, sizes: [], price: 0.5, img: "/products/khaliil-naxli.webp", min: 0.50, max: 0.50 },
  { id: "lingzhi-coffee", name: "Lingzhi Coffee", category: "Hot Coffee", sourceCategory: "Hot Coffee", badge: null, sizes: [{"size":"Small","price":2},{"size":"Medium","price":2.45},{"size":"Large","price":2}], price: null, img: "/products/lingzhi-coffee.webp", min: 2.00, max: 2.45 },
  { id: "lipton-tea", name: "Lipton Tea", category: "Hot Tea", sourceCategory: "Hot Tea", badge: null, sizes: [{"size":"Small","price":1},{"size":"Medium","price":1.5},{"size":"Large","price":2}], price: null, img: "/products/lipton-tea.webp", min: 1.00, max: 2.00 },
  { id: "lotus-cheesecake", name: "Lotus Cheesecake", category: "Cakes", sourceCategory: "Cakes", badge: null, sizes: [], price: 3.5, img: "/products/lotus-cheesecake.webp", min: 3.50, max: 3.50 },
  { id: "lotus-frappe", name: "Lotus Frappe", category: "Frappés", sourceCategory: "Frappes", badge: null, sizes: [{"size":"Small","price":3.75},{"size":"Large","price":4.75}], price: null, img: "/products/lotus-frappe.webp", min: 3.75, max: 4.75 },
  { id: "macchiato", name: "Macchiato", category: "Hot Coffee", sourceCategory: "Hot Coffee", badge: null, sizes: [{"size":"Small","price":2},{"size":"Medium","price":2.45},{"size":"Large","price":2.75}], price: null, img: "/products/macchiato.webp", min: 2.00, max: 2.75 },
  { id: "mango-mojito", name: "Mango Mojito", category: "Refreshers", sourceCategory: "Refresher", badge: null, sizes: [], price: 3, img: "/products/mango-mojito.webp", min: 3.00, max: 3.00 },
  { id: "mango-smoothie", name: "Mango Smoothie", category: "Smoothies", sourceCategory: "Smoothies", badge: null, sizes: [], price: 3, img: "/products/mango-smoothie.webp", min: 3.00, max: 3.00 },
  { id: "masala-tea", name: "Masala Tea", category: "Hot Tea", sourceCategory: "Hot Tea", badge: null, sizes: [{"size":"Small","price":1.5},{"size":"Medium","price":1.75}], price: null, img: "/products/masala-tea.webp", min: 1.50, max: 1.75 },
  { id: "matcha-and-strawberry", name: "Matcha and Strawberry", category: "Matcha", sourceCategory: "Matcha", badge: null, sizes: [{"size":"Small","price":3.5},{"size":"Large","price":4.5}], price: null, img: "/products/matcha-and-strawberry.webp", min: 3.50, max: 4.50 },
  { id: "matcha-frappe", name: "Matcha Frappe", category: "Matcha", sourceCategory: "Matcha", badge: null, sizes: [{"size":"Small","price":3.45},{"size":"Large","price":4.5}], price: null, img: "/products/matcha-frappe.webp", min: 3.45, max: 4.50 },
  { id: "matcha-mango", name: "Matcha Mango", category: "Matcha", sourceCategory: "Matcha", badge: null, sizes: [], price: 3.65, img: "/products/matcha-mango.webp", min: 3.65, max: 3.65 },
  { id: "matcha-vanilla", name: "Matcha Vanilla", category: "Matcha", sourceCategory: "Matcha", badge: null, sizes: [{"size":"Small","price":2.5},{"size":"Large","price":3.5}], price: null, img: "/products/matcha-vanilla.webp", min: 2.50, max: 3.50 },
  { id: "passion-fruit-refresh", name: "Passion Fruit Refresh", category: "Refreshers", sourceCategory: "Refresher", badge: null, sizes: [{"size":"Small","price":2.5},{"size":"Large","price":3.5}], price: null, img: "/products/passion-fruit-refresh.webp", min: 2.50, max: 3.50 },
  { id: "passion-iced-tea", name: "Passion Iced Tea", category: "Iced Tea", sourceCategory: "Iced Tea", badge: null, sizes: [{"size":"Small","price":2.5},{"size":"Large","price":3.5}], price: null, img: "/products/passion-iced-tea.webp", min: 2.50, max: 3.50 },
  { id: "peach-iced-tea", name: "Peach Iced Tea", category: "Iced Tea", sourceCategory: "Iced Tea", badge: null, sizes: [{"size":"Small","price":2.5},{"size":"Large","price":3.5}], price: null, img: "/products/peach-iced-tea.webp", min: 2.50, max: 3.50 },
  { id: "peach-smoothie", name: "Peach Smoothie", category: "Smoothies", sourceCategory: "Smoothies", badge: null, sizes: [], price: 3, img: "/products/peach-smoothie.webp", min: 3.00, max: 3.00 },
  { id: "pistachio-matcha", name: "Pistachio Matcha", category: "Matcha", sourceCategory: "Matcha", badge: null, sizes: [{"size":"Small","price":3},{"size":"Large","price":4}], price: null, img: "/products/pistachio-matcha.webp", min: 3.00, max: 4.00 },
  { id: "popcorn-latte", name: "Popcorn latte", category: "Specialty", sourceCategory: "Hot", badge: null, sizes: [], price: 2.5, img: null, min: 2.50, max: 2.50 },
  { id: "qahwa-somali", name: "Qahwa Somali", category: "Hot Tea", sourceCategory: "Hot Tea", badge: null, sizes: [{"size":"Small","price":1},{"size":"Medium","price":1.5},{"size":"Large","price":2}], price: null, img: "/products/qahwa-somali.webp", min: 1.00, max: 2.00 },
  { id: "raspberry-iced-tea", name: "Raspberry Iced Tea", category: "Iced Tea", sourceCategory: "Iced Tea", badge: null, sizes: [], price: 2.5, img: "/products/raspberry-iced-tea.webp", min: 2.50, max: 2.50 },
  { id: "somali-tea", name: "Somali Tea", category: "Hot Tea", sourceCategory: "Hot Tea", badge: null, sizes: [{"size":"Small","price":1},{"size":"Medium","price":1.5},{"size":"Large","price":2}], price: null, img: "/products/somali-tea.webp", min: 1.00, max: 2.00 },
  { id: "spanish-latte", name: "Spanish Latte", category: "Hot Coffee", sourceCategory: "Hot Coffee", badge: null, sizes: [{"size":"Small","price":2.5},{"size":"Medium","price":2.75},{"size":"Large","price":3}], price: null, img: "/products/spanish-latte.webp", min: 2.50, max: 3.00 },
  { id: "sprite", name: "Sprite", category: "Bottled Drinks", sourceCategory: "Bottle Drinks", badge: null, sizes: [], price: 0.5, img: "/products/sprite.webp", min: 0.50, max: 0.50 },
  { id: "strawberry-frappe", name: "Strawberry Frappe", category: "Frappés", sourceCategory: "Frappes", badge: null, sizes: [{"size":"Small","price":3.5},{"size":"Large","price":4.5}], price: null, img: "/products/strawberry-frappe.webp", min: 3.50, max: 4.50 },
  { id: "strawberry-mojito-refresher", name: "Strawberry Mojito Refresher", category: "Refreshers", sourceCategory: "Refresher", badge: null, sizes: [{"size":"Small","price":3},{"size":"Large","price":4}], price: null, img: "/products/strawberry-mojito-refresher.webp", min: 3.00, max: 4.00 },
  { id: "strawberry-smoothie", name: "Strawberry Smoothie", category: "Smoothies", sourceCategory: "Smoothies", badge: null, sizes: [{"size":"Small","price":3},{"size":"Large","price":4}], price: null, img: "/products/strawberry-smoothie.webp", min: 3.00, max: 4.00 },
  { id: "turkish-tea", name: "Turkish Tea", category: "Hot Tea", sourceCategory: "Hot Tea", badge: null, sizes: [{"size":"Small","price":1},{"size":"Medium","price":1.5},{"size":"Large","price":2}], price: null, img: "/products/turkish-tea.webp", min: 1.00, max: 2.00 },
  { id: "vanilla-frappe", name: "Vanilla Frappe", category: "Frappés", sourceCategory: "Frappes", badge: null, sizes: [{"size":"Small","price":3.75},{"size":"Large","price":4.75}], price: null, img: "/products/vanilla-frappe.webp", min: 3.75, max: 4.75 },
  { id: "vanilla-latte", name: "Vanilla Latte", category: "Hot Coffee", sourceCategory: "Hot Coffee", badge: null, sizes: [{"size":"Small","price":2.5},{"size":"Medium","price":2.89},{"size":"Large","price":3}], price: null, img: "/products/vanilla-latte.webp", min: 2.50, max: 3.00 },
  { id: "water-300ml", name: "Water 300ml", category: "Bottled Drinks", sourceCategory: "Bottle Drinks", badge: null, sizes: [], price: 0.25, img: "/products/water-300ml.webp", min: 0.25, max: 0.25 },
  { id: "water-350ml", name: "water 350ml", category: "Bottled Drinks", sourceCategory: "Bottle Drinks", badge: null, sizes: [], price: 0.25, img: null, min: 0.25, max: 0.25 },
  { id: "white-chocolate-matcha", name: "White Chocolate Matcha", category: "Matcha", sourceCategory: "Matcha", badge: null, sizes: [{"size":"Small","price":3},{"size":"Large","price":4}], price: null, img: "/products/white-chocolate-matcha.webp", min: 3.00, max: 4.00 },
];

export const categories: MenuCategory[] = [
  { id: "hot-coffee", name: "Hot Coffee", source: "Hot Coffee", count: 15 },
  { id: "iced-coffee", name: "Iced Coffee", source: "Iced coffee", count: 7 },
  { id: "frappes", name: "Frappés", source: "Frappes", count: 5 },
  { id: "matcha", name: "Matcha", source: "Matcha", count: 8 },
  { id: "hot-tea", name: "Hot Tea", source: "Hot Tea", count: 8 },
  { id: "iced-tea", name: "Iced Tea", source: "Iced Tea", count: 5 },
  { id: "refresher", name: "Refreshers", source: "Refresher", count: 6 },
  { id: "smoothies", name: "Smoothies", source: "Smoothies", count: 6 },
  { id: "bottle-drinks", name: "Bottled Drinks", source: "Bottle Drinks", count: 4 },
  { id: "cakes", name: "Cakes", source: "Cakes", count: 4 },
  { id: "pastry-kobac", name: "Pastries", source: "pastry_kobac", count: 5 },
  { id: "sandwiches", name: "Sandwiches", source: "Sandwiches", count: 1 },
  { id: "egg-ex", name: "Eggs", source: "EGG EX", count: 1 },
  { id: "hot", name: "Specialty", source: "Hot", count: 1 },
];

export const priceRange = { min: 0.25, max: 5.15 };

export function byCategory(name: string) { return menu.filter((m) => m.category === name); }
