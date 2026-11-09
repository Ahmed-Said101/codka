import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type CartLine = {
  key: string
  id: string
  name: string
  size: string | null
  price: number
  img: string | null
  qty: number
}

export type CartTotals = { count: number; subtotal: number }

type CartValue = CartTotals & {
  lines: CartLine[]
  add: (line: Omit<CartLine, 'key' | 'qty'>, qty?: number) => void
  setQty: (key: string, qty: number) => void
  remove: (key: string) => void
  clear: () => void
  ready: boolean
  notice: string | null
  dismissNotice: () => void
}

const STORAGE_KEY = 'salool-demo-cart-v1'
const CartContext = createContext<CartValue | null>(null)

const lineKey = (id: string, size: string | null) => `${id}::${size ?? ''}`

function read(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (l): l is CartLine =>
        l && typeof l.id === 'string' && typeof l.price === 'number' && typeof l.qty === 'number',
    )
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setLines(read())
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
    } catch {
      /* private mode or quota — the cart simply stays in memory */
    }
  }, [lines, ready])

  const add = useCallback((line: Omit<CartLine, 'key' | 'qty'>, qty = 1) => {
    const key = lineKey(line.id, line.size)
    setLines((current) => {
      const found = current.find((l) => l.key === key)
      if (found) return current.map((l) => (l.key === key ? { ...l, qty: Math.min(l.qty + qty, 99) } : l))
      return [...current, { ...line, key, qty }]
    })
  }, [])

  const setQty = useCallback((key: string, qty: number) => {
    setLines((current) =>
      qty <= 0
        ? current.filter((l) => l.key !== key)
        : current.map((l) => (l.key === key ? { ...l, qty: Math.min(qty, 99) } : l)),
    )
  }, [])

  const remove = useCallback((key: string) => {
    setLines((current) => current.filter((l) => l.key !== key))
  }, [])

  const clear = useCallback(() => setLines([]), [])

  const [notice, setNotice] = useState<string | null>(null)

  useEffect(() => {
    if (!notice) return
    const timer = window.setTimeout(() => setNotice(null), 2600)
    return () => window.clearTimeout(timer)
  }, [notice])

  const addLine = useCallback(
    (line: Omit<CartLine, 'key' | 'qty'>, qty = 1) => {
      add(line, qty)
      setNotice(`${line.name}${line.size ? ` · ${line.size}` : ''} added to basket`)
    },
    [add],
  )

  const dismissNotice = useCallback(() => setNotice(null), [])

  const value = useMemo<CartValue>(() => {
    const count = lines.reduce((sum, l) => sum + l.qty, 0)
    const subtotal = lines.reduce((sum, l) => sum + l.qty * l.price, 0)
    return {
      lines,
      count,
      subtotal,
      add: addLine,
      setQty,
      remove,
      clear,
      ready,
      notice,
      dismissNotice,
    }
  }, [lines, addLine, setQty, remove, clear, ready, notice, dismissNotice])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
