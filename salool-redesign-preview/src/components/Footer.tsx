import { ArrowRight, ArrowUp, Heart, Mail, Phone, Pin, XSocial } from './Icons'
import { BrandLockup } from './Logo'
import { Link } from 'react-router-dom'
import { BRANCHES, HOURS, LINKS } from '../data/site'

export default function Footer() {
  return (
    <footer className="site-footer" aria-labelledby="contact-title">
      <h2 id="contact-title" className="sr-only">
        Visit Salool Café
      </h2>
      <div className="container-editorial">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link className="brand" to="/">
              <BrandLockup />
            </Link>
            <p>
              Handcrafted coffee, iced drinks and pastries across three branches in Mogadishu.
            </p>
            <p className="footer-hours">
              {HOURS.map((row) => (
                <span key={row.days}>
                  <strong>{row.days}</strong> {row.time}
                </span>
              ))}
            </p>
          </div>

          <div className="footer-col">
            <h3>
              <Pin /> Our Branches
            </h3>
            <ul className="footer-list">
              {BRANCHES.map((branch) => (
                <li key={branch.name}>
                  <span className="branch-name">{branch.name}</span>
                  {branch.address}
                </li>
              ))}
            </ul>
            <Link className="footer-more" to="/branches">
              All branches <ArrowRight />
            </Link>
          </div>

          <div className="footer-col">
            <h3>
              <Phone /> Contact Us
            </h3>
            <ul className="footer-list footer-contact">
              <li>
                <a href="tel:2728">
                  <Phone /> 2728 — all branches
                </a>
              </li>
              <li>
                <a href="mailto:support@salool.com">
                  <Mail /> support@salool.com
                </a>
              </li>
              <li>
                <Link to="/contact">Ways to reach us</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col footer-follow">
            <h3>Follow Us</h3>
            <a
              className="social-btn"
              href={LINKS.x}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Salool Café on X (opens in a new tab)"
            >
              <XSocial />
            </a>
            <p className="footer-script">
              Coffee brings
              <br />
              us together
              <Heart />
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-links">
            <Link to="/menu">Menu</Link>
            <Link to="/rewards">Rewards</Link>
            <a href={LINKS.giftCards} target="_blank" rel="noopener noreferrer">
              Gift Cards
            </a>
            <a href={LINKS.appStore} target="_blank" rel="noopener noreferrer">
              App Store
            </a>
            <a href={LINKS.googlePlay} target="_blank" rel="noopener noreferrer">
              Google Play
            </a>
            <Link to="/" className="back-top">
              Back to top <ArrowUp />
            </Link>
          </div>
          <span className="footer-concept">Concept demo · 2026</span>
          <p className="footer-disclaimer">
            Independent redesign concept created for presentation purposes. This is not the official
            Salool Café website and is not affiliated with or endorsed by Salool Café. Brand assets,
            menu details, prices and business information belong to Salool Café. Public facts were
            verified against salool.com, its menu and contact pages in November 2026. The menu,
            basket and checkout here are a local demo: they are not connected to Salool&rsquo;s
            ordering system, rewards database or payment provider, nothing is charged, and everything
            you enter stays in your own browser. The looping background film combines official Salool
            photographs — the espresso shot and the finished latte — with one AI-generated milk-pour
            clip made for this concept; every photograph on this site is an official Salool asset.
          </p>
        </div>
      </div>
    </footer>
  )
}
