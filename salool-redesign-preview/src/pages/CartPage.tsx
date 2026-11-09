import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Cup, Minus, Plus, Trash } from '../components/Icons'
import PageHead from '../components/PageHead'
import { useCart } from '../context/CartContext'

export default function CartPage() {
  const { lines, subtotal, count, setQty, remove, clear, ready } = useCart()
  const navigate = useNavigate()

  return (
    <>
      <section className="page">
        <PageHead
          eyebrow="Your basket"
          title={
            <>
              Almost <em>ready</em>.
            </>
          }
          lead="Everything here lives in your own browser only. No payment is taken, no order reaches a café, and clearing your browser data clears the basket."
        />
      </section>

      <section className="section" aria-label="Basket contents">
        <div className="container-editorial">
          {!ready ? null : lines.length === 0 ? (
            <div className="empty-state">
              <p>Your basket is empty — the menu has 76 things worth adding.</p>
              <Link className="btn btn--gold btn--sm" to="/menu">
                Browse the menu <ArrowRight />
              </Link>
            </div>
          ) : (
            <div className="split">
              <div>
                {lines.map((line) => (
                  <div className="cart-line" key={line.key}>
                    <span className="cart-thumb">
                      {line.img ? (
                        <img src={line.img} alt="" width={74} height={74} loading="lazy" decoding="async" />
                      ) : (
                        <Cup />
                      )}
                    </span>

                    <span>
                      <Link className="cart-name" to={`/menu/${line.id}`}>
                        {line.name}
                      </Link>
                      <span className="cart-sub">
                        {line.size ? `${line.size} · ` : ''}${line.price.toFixed(2)} each
                      </span>
                    </span>

                    <span className="cart-tools">
                      <span className="stepper">
                        <button
                          type="button"
                          onClick={() => setQty(line.key, line.qty - 1)}
                          aria-label={`One fewer ${line.name}`}
                        >
                          <Minus />
                        </button>
                        <output aria-label="Quantity">{line.qty}</output>
                        <button
                          type="button"
                          onClick={() => setQty(line.key, line.qty + 1)}
                          disabled={line.qty >= 99}
                          aria-label={`One more ${line.name}`}
                        >
                          <Plus />
                        </button>
                      </span>
                      <span className="cart-line-total">${(line.price * line.qty).toFixed(2)}</span>
                      <button className="icon-danger" type="button" onClick={() => remove(line.key)} aria-label={`Remove ${line.name}`}>
                        <Trash />
                      </button>
                    </span>
                  </div>
                ))}

                <button className="btn btn--ghost btn--sm" type="button" onClick={clear} style={{ marginTop: 22 }}>
                  Empty basket
                </button>
              </div>

              <aside className="summary" aria-label="Order summary">
                <p className="eyebrow">Demo order</p>
                <h2>Summary</h2>
                <div className="sum-row">
                  <span>Items</span>
                  <strong>{count}</strong>
                </div>
                <div className="sum-row">
                  <span>Line total</span>
                  <strong>${subtotal.toFixed(2)}</strong>
                </div>
                <div className="sum-row">
                  <span>Payment</span>
                  <strong>None — demo only</strong>
                </div>
                <div className="sum-row sum-row--total">
                  <span>Pay in café</span>
                  <strong>${subtotal.toFixed(2)}</strong>
                </div>

                <button className="btn btn--gold" type="button" onClick={() => navigate('/checkout')}>
                  Continue to checkout <ArrowRight />
                </button>
                <Link className="btn btn--ghost btn--sm" to="/menu" style={{ marginTop: 10 }}>
                  Add something else
                </Link>

                <div className="demo-note" style={{ marginTop: 18 }}>
                  <Cup />
                  <span>Salool&rsquo;s real ordering happens in the official Salool Café app or at the counter.</span>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
