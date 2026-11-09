import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { BrandLockup } from './Logo'
import { Bag, Menu } from './Icons'
import { useCart } from '../context/CartContext'

type Props = {
  onMenu: () => void
  menuOpen: boolean
}

const NAV = [
  { label: 'Home', to: '/' },
  { label: 'Menu', to: '/menu' },
  { label: 'Our Story', to: '/story' },
  { label: 'Rewards', to: '/rewards' },
  { label: 'Branches', to: '/branches' },
  { label: 'Contact', to: '/contact' },
]

export default function Header({ onMenu, menuOpen }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const progressRef = useRef<HTMLDivElement>(null)
  const { count, ready } = useCart()

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        const y = window.scrollY
        setScrolled(y > 24)
        const max = document.documentElement.scrollHeight - window.innerHeight
        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`
        }
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container-editorial header-inner">
        <Link className="brand" to="/">
          <BrandLockup />
          <span className="sr-only">Salool Café concept — home</span>
        </Link>

        <nav className="main-nav" aria-label="Primary">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <span className="header-status">
            <span className="status-dot" /> Open daily
          </span>

          <NavLink className="cart-link" to="/cart" title="Your basket">
            <Bag />
            <span className="sr-only">Basket</span>
            {ready && count > 0 ? (
              <span className="cart-badge" aria-hidden="true">
                {count}
              </span>
            ) : null}
            <span className="cart-count">{ready && count > 0 ? `${count} item${count > 1 ? 's' : ''}` : ''}</span>
          </NavLink>

          <Link className="btn btn--gold btn--sm header-order" to="/menu">
            Order Now
          </Link>
          <button
            className="menu-toggle"
            type="button"
            onClick={onMenu}
            aria-label="Open site menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-site-menu"
          >
            <Menu />
          </button>
        </div>
      </div>
      <div className="scroll-progress" aria-hidden="true">
        <div className="scroll-progress-fill" ref={progressRef} />
      </div>
    </header>
  )
}
