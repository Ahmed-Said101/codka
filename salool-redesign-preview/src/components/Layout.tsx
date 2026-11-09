import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import MobileMenu from './MobileMenu'
import { Check } from './Icons'
import useReveal from '../hooks/useReveal'
import { useCart } from '../context/CartContext'

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname, hash } = useLocation()
  useReveal(pathname)

  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash)
      if (target) {
        target.scrollIntoView({ block: 'start' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div id="top" />
      <Header onMenu={() => setMenuOpen(true)} menuOpen={menuOpen} />

      <main id="main">
        <Outlet />
      </main>

      <Footer />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <CartToast />
    </>
  )
}

function CartToast() {
  const { notice } = useCart()
  if (!notice) return null
  return (
    <div className="toast" role="status">
      <Check />
      {notice}
    </div>
  )
}
