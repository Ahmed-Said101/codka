import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Star, ArrowRight } from './Icons'
import { menu, type MenuItem } from '../data/menu'
import { itemMeta, priceLabel } from '../lib/pricing'

type Props = {
  onSelect: (item: MenuItem) => void
}

const FEATURED_IDS = ['cappuccino', 'iced-latte', 'spanish-latte', 'passion-pear-smoothie', 'matcha-mango', 'carrot-cake', 'affogato']

const TONES = ['#e8d8bd', '#e9d6c7', '#e5cbb2', '#ecd9c1', '#d8e3cf', '#ecd0d2', '#e2cdb6']

export default function Featured({ onSelect }: Props) {
  const railRef = useRef<HTMLDivElement>(null)
  const [edges, setEdges] = useState({ prev: false, next: true })

  const items = menu.filter((m) => FEATURED_IDS.includes(m.id) && m.img)

  const updateEdges = useCallback(() => {
    const rail = railRef.current
    if (!rail) return
    setEdges({
      prev: rail.scrollLeft > 8,
      next: rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 8,
    })
  }, [])

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return
    updateEdges()
    rail.addEventListener('scroll', updateEdges, { passive: true })
    window.addEventListener('resize', updateEdges)
    return () => {
      rail.removeEventListener('scroll', updateEdges)
      window.removeEventListener('resize', updateEdges)
    }
  }, [updateEdges])

  const scrollRail = (direction: -1 | 1) => {
    const rail = railRef.current
    if (!rail) return
    rail.scrollBy({
      left: direction * Math.min(rail.clientWidth * 0.82, 620),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
  }

  return (
    <section className="menu-section" id="featured" aria-labelledby="menu-title">
      <div className="container-editorial">
        <div className="menu-panel" data-reveal>
          <div className="menu-intro">
            <p className="eyebrow">Our menu</p>
            <h2 id="menu-title">
              Discover Our{' '}
              <br />
              <em>Delicious Menu</em>
            </h2>
            <p>From rich espressos to refreshing iced drinks and tasty treats.</p>
            <Link className="btn btn--outline-gold btn--sm" to="/menu">
              View Full Menu <ArrowRight />
            </Link>
          </div>

          <div className="menu-rail-wrap">
            <button
              className="rail-arrow rail-arrow--prev"
              type="button"
              onClick={() => scrollRail(-1)}
              disabled={!edges.prev}
              aria-label="Scroll menu left"
            >
              <ChevronLeft />
            </button>

            <div className="product-rail" ref={railRef} tabIndex={0} aria-label="Featured drinks">
              {items.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className="product-card"
                  onClick={() => onSelect(item)}
                  style={{ '--card-tone': TONES[index % TONES.length] } as React.CSSProperties}
                >
                  <span className="product-media">
                    <img
                      src={item.img ?? undefined}
                      alt={`${item.name} at Salool Café`}
                      width={330}
                      height={330}
                      loading="lazy"
                      decoding="async"
                    />
                    {item.badge ? (
                      <span className="product-badge">
                        <Star /> {item.badge}
                      </span>
                    ) : null}
                  </span>
                  <span className="product-body">
                    <span>
                      <span className="product-name">{item.name}</span>
                      <span className="product-meta">{itemMeta(item)}</span>
                    </span>
                    <span className="product-price">
                      <small>From</small>
                      {priceLabel(item)}
                    </span>
                  </span>
                  <span className="sr-only">View {item.name} and add it to your basket</span>
                </button>
              ))}
            </div>

            <button
              className="rail-arrow rail-arrow--next"
              type="button"
              onClick={() => scrollRail(1)}
              disabled={!edges.next}
              aria-label="Scroll menu right"
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        <p className="menu-note">
          76 items from the official Salool Kobac menu. Every price and size shown here is taken from
          saloolcafe.com — nothing is invented.
        </p>
      </div>
    </section>
  )
}
