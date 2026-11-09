import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowRight, ChevronLeft, Cup, Minus, Plus, Star } from '../components/Icons'
import { menu } from '../data/menu'
import { useCart } from '../context/CartContext'
import { itemMeta, lookup, priceLabel, sizePrice } from '../lib/pricing'

export default function ItemPage() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const { add } = useCart()
  const item = lookup(id)

  const [size, setSize] = useState<string | null>(item?.sizes[0]?.size ?? null)
  const [qty, setQty] = useState(1)

  if (!item) {
    return (
      <section className="page notfound">
        <div className="container-editorial">
          <h1 className="page-title">Not on the menu</h1>
          <p className="page-lead">We could not find that item. It may have been renamed on the official board.</p>
          <Link className="btn btn--gold btn--sm" to="/menu" style={{ marginTop: 20 }}>
            Back to the menu <ArrowRight />
          </Link>
        </div>
      </section>
    )
  }

  const price = sizePrice(item, size)
  const related = menu.filter((m) => m.category === item.category && m.id !== item.id).slice(0, 6)

  return (
    <>
      <section className="page">
        <div className="container-editorial">
          <p className="crumb">
            <Link to="/">Home</Link> / <Link to="/menu">Menu</Link> / {item.name}
          </p>

          <div className="item-shell">
            <figure className="item-media">
              {item.img ? (
                <img src={item.img} alt={`${item.name} at Salool Café`} width={620} height={620} decoding="async" />
              ) : (
                <span className="grid-noimg" aria-hidden="true">
                  <Cup />
                </span>
              )}
            </figure>

            <div>
              <div className="item-tags">
                <Link className="chip" to="/menu">
                  {item.category}
                </Link>
                {item.badge ? (
                  <span className="chip is-on">
                    <Star style={{ display: 'inline', width: 12, height: 12, verticalAlign: -2 }} /> {item.badge}
                  </span>
                ) : null}
              </div>

              <h1 className="item-title">{item.name}</h1>
              <p className="page-lead" style={{ marginBottom: 24 }}>
                {itemMeta(item)} · listed under “{item.sourceCategory}” on the official Salool Kobac menu.
                {item.sizes.length > 1
                  ? ' Choose a size below — prices are the official ones.'
                  : ' A single-size item on the official board.'}
              </p>

              <h2 className="sr-only">Sizes and prices</h2>
              {item.sizes.length > 0 ? (
                <ul className="size-list">
                  {item.sizes.map((option) => {
                    const on = option.size === size
                    return (
                      <li className="size-row" key={option.size}>
                        <label style={{ display: 'flex', gap: 12, alignItems: 'center', cursor: 'pointer' }}>
                          <input
                            type="radio"
                            name="size"
                            value={option.size}
                            checked={on}
                            onChange={() => setSize(option.size)}
                            style={{ accentColor: '#e7c489', width: 16, height: 16 }}
                          />
                          <span>
                            <strong>{option.size}</strong>
                          </span>
                        </label>
                        <span className="size-price">${option.price.toFixed(2)}</span>
                      </li>
                    )
                  })}
                </ul>
              ) : (
                <div className="size-row" style={{ marginBottom: 24 }}>
                  <span>
                    <strong>One size</strong>
                    <span className="cart-sub">As listed by Salool</span>
                  </span>
                  <span className="size-price">${(item.price ?? item.min).toFixed(2)}</span>
                </div>
              )}

              <div className="buy-row">
                <div className="stepper">
                  <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1} aria-label="One fewer">
                    <Minus />
                  </button>
                  <output aria-live="polite" aria-label="Quantity">
                    {qty}
                  </output>
                  <button type="button" onClick={() => setQty((q) => Math.min(99, q + 1))} aria-label="One more">
                    <Plus />
                  </button>
                </div>

                <button
                  className="btn btn--gold"
                  type="button"
                  onClick={() => {
                    add({ id: item.id, name: item.name, size, price, img: item.img }, qty)
                    navigate('/cart')
                  }}
                >
                  Add to basket <ArrowRight />
                </button>

                <span className="buy-total">
                  Line total
                  <strong>${(price * qty).toFixed(2)}</strong>
                </span>
              </div>

              <div className="demo-note">
                <Cup />
                <span>
                  This basket is a local demo. It is not connected to Salool&rsquo;s ordering system and
                  placing an order here does not reserve anything in a café.
                </span>
              </div>

              <Link className="btn btn--ghost btn--sm" to="/menu" style={{ marginTop: 18 }}>
                <ChevronLeft /> Back to menu
              </Link>
            </div>
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="section section--tint" aria-labelledby="related-title">
          <div className="container-editorial">
            <h2 className="display-h2" id="related-title">
              More from <em>{item.category}</em>
            </h2>
            <div className="menu-grid">
              {related.map((other) => (
                <Link className="grid-card grid-link" key={other.id} to={`/menu/${other.id}`}>
                  <span className="grid-media">
                    {other.img ? (
                      <img src={other.img} alt={`${other.name} at Salool Café`} width={200} height={200} loading="lazy" decoding="async" />
                    ) : (
                      <span className="grid-noimg" aria-hidden="true">
                        <Cup />
                      </span>
                    )}
                  </span>
                  <span className="grid-body">
                    <span className="grid-name">{other.name}</span>
                    <span className="grid-meta">{itemMeta(other)}</span>
                  </span>
                  <span className="grid-foot">
                    <span className="grid-price">{priceLabel(other)}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  )
}
