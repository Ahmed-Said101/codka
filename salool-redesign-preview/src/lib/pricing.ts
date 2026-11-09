import { menu, type MenuItem } from '../data/menu'

export const usd = (n: number) => `$${n.toFixed(2)}`

export function priceLabel(item: MenuItem) {
  if (item.sizes.length > 1) return item.min === item.max ? usd(item.min) : `${usd(item.min)} – ${usd(item.max)}`
  if (item.sizes.length === 1) return usd(item.sizes[0].price)
  return usd(item.price ?? item.min)
}

export function defaultSize(item: MenuItem) {
  return item.sizes.length ? item.sizes[0].size : null
}

export function sizePrice(item: MenuItem, size: string | null) {
  if (!size) return item.price ?? item.min
  return item.sizes.find((s) => s.size === size)?.price ?? item.min
}

export function itemMeta(item: MenuItem) {
  const hot = ['Hot Coffee', 'Hot Tea', 'Specialty'].includes(item.category)
  const iced = ['Iced Coffee', 'Iced Tea', 'Refreshers'].includes(item.category)
  const kind = hot ? 'Hot' : iced ? 'Iced' : item.category === 'Frappés' ? 'Blended' : item.category
  if (item.sizes.length > 1) return `${kind} · ${item.sizes.length} sizes`
  if (item.sizes.length === 1) return `${kind} · 1 size`
  return kind
}

const MENU_BY_ID = new Map(menu.map((item) => [item.id, item]))

export function lookup(id: string) {
  return MENU_BY_ID.get(id)
}
