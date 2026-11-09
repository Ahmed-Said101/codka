import { useEffect, useRef, type CSSProperties } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HOURS } from '../data/site'
import { ArrowRight, Close, Phone } from './Icons'
import { BrandLockup } from './Logo'

type Props = {
  open: boolean
  onClose: () => void
}

const LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Menu', to: '/menu' },
  { label: 'Our Story', to: '/story' },
  { label: 'Rewards', to: '/rewards' },
  { label: 'Branches', to: '/branches' },
  { label: 'Contact', to: '/contact' },
]

export default function MobileMenu({ open, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    else if (!open && dialog.open) dialog.close()
  }, [open])

  const go = (to: string) => {
    onClose()
    window.setTimeout(() => navigate(to), 180)
  }

  return (
    <dialog
      ref={ref}
      id="mobile-site-menu"
      className="mobile-dialog"
      aria-label="Site menu"
      onClose={onClose}
    >
      <div className="mobile-inner">
        <div className="mobile-top">
          <Link className="brand" to="/" onClick={onClose}>
            <BrandLockup />
          </Link>
          <button
            className="icon-btn mobile-close"
            type="button"
            onClick={onClose}
            aria-label="Close site menu"
          >
            <Close />
          </button>
        </div>

        <nav className="mobile-links" aria-label="Mobile">
          {LINKS.map((link, index) => (
            <button
              key={link.to}
              type="button"
              className="mobile-link"
              onClick={() => go(link.to)}
              style={{ '--i': index } as CSSProperties}
            >
              <span>0{index + 1}</span>
              {link.label}
            </button>
          ))}
        </nav>

        <p className="mobile-script" aria-hidden="true">
          More than just coffee
        </p>

        <div className="mobile-foot">
          <button className="btn btn--gold" type="button" onClick={() => go('/menu')}>
            Order Now <ArrowRight />
          </button>
          <p className="mobile-hours">
            <strong>Sat–Thu</strong> {HOURS[0].time}
            <br />
            <strong>Fri</strong> {HOURS[1].time}
          </p>
          <a className="mobile-phone" href="tel:2728">
            <Phone /> 2728 — all branches
          </a>
        </div>
      </div>
    </dialog>
  )
}
