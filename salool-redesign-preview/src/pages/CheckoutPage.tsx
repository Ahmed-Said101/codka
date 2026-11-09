import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Clock, Cup, Info, Pin } from '../components/Icons'
import PageHead from '../components/PageHead'
import { BRANCHES, HOURS } from '../data/site'
import { useCart } from '../context/CartContext'

export type DemoOrder = {
  code: string
  placedAt: string
  cupName: string
  branch: string
  when: string
  note: string
  lines: { name: string; size: string | null; qty: number; price: number }[]
  total: number
}

const STORAGE_KEY = 'salool-demo-last-order'
const TIMES = ['As soon as possible', 'In 20 minutes', 'In 45 minutes', 'In 1 hour', 'Tomorrow morning']

const makeCode = () => `SL-${Math.floor(1000 + Math.random() * 9000)}`

export default function CheckoutPage() {
  const { lines, subtotal, count, clear } = useCart()
  const navigate = useNavigate()

  const [cupName, setCupName] = useState('')
  const [branch, setBranch] = useState(BRANCHES[0].name)
  const [when, setWhen] = useState(TIMES[0])
  const [note, setNote] = useState('')

  if (lines.length === 0) {
    return (
      <>
        <section className="page">
          <PageHead
            eyebrow="Checkout"
            title={
              <>
                Nothing to <em>check out</em>.
              </>
            }
            lead="Your basket is empty, so there is no demo order to place yet."
          />
        </section>
        <section className="section">
          <div className="container-editorial">
            <Link className="btn btn--gold btn--sm" to="/menu">
              Open the menu <ArrowRight />
            </Link>
          </div>
        </section>
      </>
    )
  }

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    const order: DemoOrder = {
      code: makeCode(),
      placedAt: new Date().toISOString(),
      cupName: cupName.trim(),
      branch,
      when,
      note: note.trim(),
      lines: lines.map((l) => ({ name: l.name, size: l.size, qty: l.qty, price: l.price })),
      total: subtotal,
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(order))
    } catch {
      /* storage unavailable — the confirmation page still has the in-memory copy */
    }
    clear()
    navigate('/order-confirmed', { state: order })
  }

  return (
    <>
      <section className="page">
        <PageHead
          eyebrow="Checkout"
          title={
            <>
              Pick a branch, <em>skip the queue</em>.
            </>
          }
          lead="This is the checkout flow of the concept — it never talks to a server. Your details stay in this browser tab and nothing is charged."
        />
      </section>

      <section className="section" aria-label="Checkout form">
        <div className="container-editorial">
          <ol className="steps">
            <li className="is-done">
              <b>1</b> Choose your drinks
            </li>
            <li className="is-done">
              <b>2</b> Review your basket
            </li>
            <li>
              <b>3</b> Pick up in store
            </li>
          </ol>

          <div className="split">
            <form onSubmit={submit}>
              <div className="warn">
                <Info />
                <span>
                  <strong>Demo checkout.</strong> No payment method is collected, no personal data leaves
                  this page, and no order is sent to Salool Café. Real orders happen in the official app or
                  at the counter.
                </span>
              </div>

              <h2 className="display-h2" style={{ fontSize: 22, marginTop: 30 }}>
                Who is picking it up?
              </h2>

              <div className="field">
                <label htmlFor="cup-name">Name on the cup (optional)</label>
                <input
                  id="cup-name"
                  value={cupName}
                  onChange={(e) => setCupName(e.target.value)}
                  maxLength={40}
                  placeholder="e.g. Amina"
                  autoComplete="off"
                />
              </div>

              <div className="field">
                <label htmlFor="note">Note for the bar (optional)</label>
                <textarea
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  maxLength={220}
                  placeholder="Less sugar, extra shot, ice on the side…"
                />
              </div>

              <h2 className="display-h2" style={{ fontSize: 22, marginTop: 6 }}>
                Which branch?
              </h2>

              <div className="choice-row">
                {BRANCHES.map((b) => (
                  <button
                    key={b.name}
                    type="button"
                    className={`choice ${branch === b.name ? 'is-on' : ''}`}
                    onClick={() => setBranch(b.name)}
                    aria-pressed={branch === b.name}
                  >
                    <strong>{b.name}</strong>
                    <span>{b.address}</span>
                  </button>
                ))}
              </div>

              <div className="field">
                <label htmlFor="when">Pickup time</label>
                <select id="when" value={when} onChange={(e) => setWhen(e.target.value)}>
                  {TIMES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <p className="page-lead" style={{ fontSize: 13, marginTop: 4 }}>
                <Clock style={{ display: 'inline', width: 13, height: 13, verticalAlign: -2 }} />{' '}
                {HOURS[0].days} {HOURS[0].time} · {HOURS[1].days} {HOURS[1].time} — same hours at all three
                branches.
              </p>

              <button className="btn btn--gold" type="submit" style={{ marginTop: 24 }}>
                Place demo order <ArrowRight />
              </button>
            </form>

            <aside className="summary" aria-label="Order summary">
              <p className="eyebrow">Demo order</p>
              <h2>
                {count} item{count === 1 ? '' : 's'}
              </h2>

              {lines.map((l) => (
                <div className="sum-row" key={l.key}>
                  <span>
                    {l.qty} × {l.name}
                    {l.size ? ` (${l.size})` : ''}
                  </span>
                  <strong>${(l.price * l.qty).toFixed(2)}</strong>
                </div>
              ))}

              <div className="sum-row sum-row--total">
                <span>Total</span>
                <strong>${subtotal.toFixed(2)}</strong>
              </div>

              <div className="demo-note" style={{ marginTop: 18 }}>
                <Pin />
                <span>{branch}</span>
              </div>
              <div className="demo-note" style={{ marginTop: 10 }}>
                <Cup />
                <span>Pay at the counter in the real café — this demo takes no money.</span>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}

export function readLastOrder(): DemoOrder | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as DemoOrder
    return typeof parsed?.code === 'string' && Array.isArray(parsed.lines) ? parsed : null
  } catch {
    return null
  }
}
