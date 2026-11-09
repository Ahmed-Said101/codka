import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Cup, Plus, Search } from '../components/Icons'
import PageHead from '../components/PageHead'
import { categories, menu } from '../data/menu'
import { useCart } from '../context/CartContext'
import { defaultSize, itemMeta, priceLabel } from '../lib/pricing'

const TONES = ['#e8d8bd', '#e9d6c7', '#e5cbb2', '#ecd9c1', '#d8e3cf', '#ecd0d2', '#e2cdb6']

export default function MenuPage() {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState('All')
  const { add } = useCart()

  const needle = query.trim().toLowerCase()

  const groups = useMemo(() => {
    const wanted = active === 'All' ? categories.map((c) => c.name) : [active]
    return wanted
      .map((name) => ({
        name,
        source: categories.find((c) => c.name === name)?.source ?? name,
        items: menu.filter(
          (m) =>
            m.category === name &&
            (!needle || m.name.toLowerCase().includes(needle) || m.sourceCategory.toLowerCase().includes(needle)),
        ),
      }))
      .filter((group) => group.items.length > 0)
  }, [active, needle])

  const shown = groups.reduce((sum, g) => sum + g.items.length, 0)

  return (
    <>
      <section className="page">
        <PageHead
          eyebrow="Salool Kobac menu"
          title={
            <>
              Everything on the <em>board</em>, in one place.
            </>
          }
          lead="76 drinks and bakes transcribed from the official Salool menu — same names, same sizes, same prices. Tap any item for details, or add it straight to your basket."
        />
      </section>

      <section className="section" aria-label="Menu">
        <div className="container-editorial">
          <div className="toolbar">
            <div className="search-box">
              <Search />
              <label className="sr-only" htmlFor="menu-search">
                Search the menu
              </label>
              <input
                id="menu-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search latte, matcha, cake…"
                autoComplete="off"
              />
            </div>
            <p className="count-note" role="status" aria-live="polite">
              {shown} item{shown === 1 ? '' : 's'}
              {needle ? ` matching “${query.trim()}”` : ''}
            </p>
          </div>

          <div className="chips" role="group" aria-label="Filter by category">
            <button
              type="button"
              className={`chip ${active === 'All' ? 'is-on' : ''}`}
              onClick={() => setActive('All')}
              aria-pressed={active === 'All'}
            >
              All <small>{menu.length}</small>
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`chip ${active === c.name ? 'is-on' : ''}`}
                onClick={() => setActive(c.name)}
                aria-pressed={active === c.name}
              >
                {c.name} <small>{c.count}</small>
              </button>
            ))}
          </div>

          {groups.length === 0 ? (
            <div className="empty-state">
              <p>
                Nothing matches <strong>“{query.trim()}”</strong>. Try “latte”, “matcha” or “cake”.
              </p>
              <button
                className="btn btn--outline-gold btn--sm"
                type="button"
                onClick={() => {
                  setQuery('')
                  setActive('All')
                }}
              >
                Clear search
              </button>
            </div>
          ) : (
            groups.map((group) => (
              <div className="cat-group" key={group.name}>
                <div className="cat-head">
                  <h2>{group.name}</h2>
                  <span>{group.items.length}</span>
                  {group.source !== group.name ? <span className="cat-source">on the board: {group.source}</span> : null}
                </div>

                <div className="menu-grid">
                  {group.items.map((item, i) => (
                    <article
                      key={item.id}
                      className="grid-card"
                      style={{ '--card-tone': TONES[i % TONES.length] } as React.CSSProperties}
                    >
                      <Link className="grid-hit" to={`/menu/${item.id}`}>
                        <span className="grid-media">
                          {item.img ? (
                            <img
                              src={item.img}
                              alt={`${item.name} at Salool Café`}
                              width={220}
                              height={220}
                              loading="lazy"
                              decoding="async"
                            />
                          ) : (
                            <span className="grid-noimg" aria-hidden="true">
                              <Cup />
                            </span>
                          )}
                        </span>
                        <span className="grid-body">
                          <span className="grid-name">{item.name}</span>
                          <span className="grid-meta">{itemMeta(item)}</span>
                        </span>
                        <span className="grid-foot">
                          <span className="grid-price">{priceLabel(item)}</span>
                        </span>
                        <span className="sr-only">Open {item.name}</span>
                      </Link>
                      <button
                        className="add-mini"
                        type="button"
                        aria-label={`Add ${item.name} to basket`}
                        onClick={() =>
                          add({
                            id: item.id,
                            name: item.name,
                            size: defaultSize(item),
                            price: item.sizes.length ? item.sizes[0].price : (item.price ?? item.min),
                            img: item.img,
                          })
                        }
                      >
                        <Plus />
                      </button>
                    </article>
                  ))}
                </div>
              </div>
            ))
          )}

          <p className="menu-note">
            Items with no photo — Popcorn latte and water 350ml — are listed on the official menu but
            their image is not published, so they show a neutral cup icon instead.
          </p>
        </div>
      </section>
    </>
  )
}
