import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Cup, Gift, Pin, Sparkle } from './Icons'
import StoreButtons from './StoreButtons'
import { BRAND } from '../data/site'

export default function Story() {
  return (
    <section className="story-band" id="story" aria-labelledby="story-title">
      <div className="story-grid">
        <figure className="story-media" data-reveal>
          <img
            src="/images/story-bar.webp"
            alt="A Salool Café barista steaming milk at the espresso bar"
            width={1448}
            height={1086}
            loading="lazy"
            decoding="async"
          />
          <figcaption className="story-chip">
            <Pin /> Mogadishu · Somalia
          </figcaption>
        </figure>

        <div className="story-copy" data-reveal style={{ '--reveal-delay': '100ms' } as CSSProperties}>
          <p className="eyebrow">Our story</p>
          <h2 id="story-title">
            More Than Just <em>Coffee</em>
          </h2>
          <p>
            At Salool Café, we bring people together over great coffee, delicious treats and a warm
            atmosphere — across three branches in Mogadishu.
          </p>
          <Link className="btn btn--gold btn--sm story-cta" to="/branches">
            Find Your Branch <ArrowRight />
          </Link>

          <ul className="story-values">
            <li>
              <Cup />
              <strong>Premium Quality</strong>
              <span>Crafted with care, every cup.</span>
            </li>
            <li>
              <Sparkle />
              <strong>A Welcoming Atmosphere</strong>
              <span>Made for moments together.</span>
            </li>
            <li>
              <Gift />
              <strong>Rewards &amp; More</strong>
              <span>Earn Stars with every order.</span>
            </li>
          </ul>
        </div>

        <aside
          className="app-card"
          id="rewards"
          aria-labelledby="rewards-title"
          data-reveal
          style={{ '--reveal-delay': '160ms' } as CSSProperties}
        >
          <div className="app-phone" aria-hidden="true">
            <div className="phone-screen">
              <img src="/brand/logo-gold.svg" alt="" width={36} height={36} loading="lazy" />
              <span className="phone-brand">Salool Café</span>
              <span className="phone-label">Rewards</span>
              <span className="phone-stars">Earn Stars</span>
              <span className="phone-order">Order ahead</span>
            </div>
          </div>

          <div className="app-copy">
            <p className="eyebrow">Salool Rewards</p>
            <h2 id="rewards-title">
              Download
              <br />
              Our App
            </h2>
            <p>Get exclusive offers and earn rewards.</p>
            <span className="offer-chip">{BRAND.offer}</span>
            <div className="app-buttons">
              <StoreButtons />
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
