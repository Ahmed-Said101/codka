import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, Check, Info, Pin } from '../components/Icons'
import StoreButtons from '../components/StoreButtons'
import { readLastOrder, type DemoOrder } from './CheckoutPage'

export default function OrderPage() {
  const { state } = useLocation()
  const order = (state as DemoOrder | null) ?? readLastOrder()

  if (!order) {
    return (
      <section className="page notfound">
        <div className="container-editorial">
          <h1 className="page-title">No demo order found</h1>
          <p className="page-lead">Place a basket first and the confirmation will appear here.</p>
          <Link className="btn btn--gold btn--sm" to="/menu" style={{ marginTop: 20 }}>
            Open the menu <ArrowRight />
          </Link>
        </div>
      </section>
    )
  }

  const placed = new Date(order.placedAt)

  return (
    <section className="page">
      <div className="container-editorial">
        <div className="confirm-card">
          <span className="confirm-mark">
            <Check />
          </span>
          <p className="eyebrow" style={{ justifyContent: 'center' }}>
            Demo order placed
          </p>
          <h1 className="page-title" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
            Thanks{order.cupName ? `, ${order.cupName}` : ''} — your cup is <em>queued</em>.
          </h1>
          <span className="order-code">{order.code}</span>

          <p className="page-lead" style={{ margin: '0 auto 8px' }}>
            {order.when} · {order.branch}
          </p>
          {order.note ? <p className="cart-sub">Note for the bar: “{order.note}”</p> : null}

          <div className="receipt">
            {order.lines.map((line, i) => (
              <div className="sum-row" key={`${line.name}-${i}`}>
                <span>
                  {line.qty} × {line.name}
                  {line.size ? ` (${line.size})` : ''}
                </span>
                <strong>${(line.price * line.qty).toFixed(2)}</strong>
              </div>
            ))}
            <div className="sum-row sum-row--total">
              <span>Total (no payment taken)</span>
              <strong>${order.total.toFixed(2)}</strong>
            </div>
          </div>

          <div className="warn" style={{ marginTop: 22, textAlign: 'left' }}>
            <Info />
            <span>
              Nothing was sent anywhere. {order.code} exists only in this browser, and this page does not
              reach Salool&rsquo;s ordering system, rewards database or payment provider. To order for real,
              use the official Salool Café app or call 2728.
            </span>
          </div>

          <div className="app-buttons" style={{ margin: '22px 0 0', textAlign: 'left' }}>
            <StoreButtons />
          </div>

          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginTop: 22 }}>
            <Link className="btn btn--gold btn--sm" to="/menu">
              Order another round <ArrowRight />
            </Link>
            <Link className="btn btn--ghost btn--sm" to="/">
              Back to home
            </Link>
          </div>
        </div>

        <p className="menu-note" style={{ textAlign: 'center' }}>
          <Pin style={{ display: 'inline', width: 13, height: 13, verticalAlign: -2 }} />{' '}
          Placed locally at {placed.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })} ·{' '}
          {placed.toLocaleDateString()}
        </p>
      </div>
    </section>
  )
}
