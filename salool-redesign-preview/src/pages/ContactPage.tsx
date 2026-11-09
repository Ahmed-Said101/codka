import { useState } from 'react'
import { Info, Mail, Phone, Pin, XSocial } from '../components/Icons'
import PageHead from '../components/PageHead'
import { BRAND, BRANCHES, HOURS, LINKS } from '../data/site'

export default function ContactPage() {
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const mailto = `mailto:${BRAND.email}?subject=${encodeURIComponent(
    subject || 'Salool Café — message from the concept site',
  )}&body=${encodeURIComponent(message)}`

  return (
    <>
      <section className="page">
        <PageHead
          crumb="Contact"
          to="/contact"
          eyebrow="Talk to Salool"
          title={
            <>
              The fastest way to <em>reach us</em>.
            </>
          }
          lead="Short number, email and the official contact page — all published by Salool. This site has no backend, so it cannot receive a message."
        />
      </section>

      <section className="section" aria-labelledby="direct-title">
        <div className="container-editorial">
          <h2 className="display-h2" id="direct-title">
            Direct <em>lines</em>
          </h2>
          <div className="cards-grid">
            <article className="info-card" data-reveal>
              <Phone />
              <h3>{BRAND.phone}</h3>
              <p>The published number for all three branches — call for orders, feedback or lost property.</p>
              <div className="link-row">
                <a href={BRAND.phoneHref}>Call now</a>
              </div>
            </article>

            <article className="info-card" data-reveal>
              <Mail />
              <h3>{BRAND.email}</h3>
              <p>Support email shown on salool.com. Use it for menu, app or catering questions.</p>
              <div className="link-row">
                <a href={BRAND.emailHref}>Open your mail app</a>
              </div>
            </article>

            <article className="info-card" data-reveal>
              <Pin />
              <h3>In person</h3>
              <p>
                {BRANCHES.map((b) => `${b.name} — ${b.address}`).join(' · ')}
              </p>
              <div className="link-row">
                <a href={LINKS.contact} target="_blank" rel="noopener noreferrer">
                  Official contact page ↗
                </a>
              </div>
            </article>
          </div>

          <div className="split" style={{ marginTop: 44 }}>
            <div>
              <h2 className="display-h2">
                Write a <em>message</em>
              </h2>
              <p className="page-lead" style={{ marginBottom: 22 }}>
                Fill this in and it opens in your own mail app, addressed to Salool. Nothing is sent from
                this page and nothing is stored on a server.
              </p>

              <div className="field">
                <label htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  maxLength={90}
                  placeholder="Question about the Kobac menu"
                />
              </div>

              <div className="field">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={800}
                  placeholder="Tell Salool what you need…"
                />
              </div>

              <a className="btn btn--gold" href={mailto}>
                Open in my mail app
              </a>

              <div className="warn" style={{ marginTop: 22 }}>
                <Info />
                <span>
                  Do not type card details, passwords or anything you would not say at the counter. This
                  concept has no backend to receive it.
                </span>
              </div>
            </div>

            <aside className="summary" style={{ position: 'static' }}>
              <p className="eyebrow">Opening hours</p>
              <h2>Same everywhere</h2>
              {HOURS.map((row) => (
                <div className="sum-row" key={row.days}>
                  <span>{row.days}</span>
                  <strong>{row.time}</strong>
                </div>
              ))}

              <div className="sum-row sum-row--total">
                <span>Branches</span>
                <strong>3 in Mogadishu</strong>
              </div>

              <h3 style={{ margin: '22px 0 10px', fontFamily: 'var(--font-display)', fontSize: 15 }}>
                Social
              </h3>
              <a
                className="social-btn"
                href={LINKS.x}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Salool Café on X (opens in a new tab)"
              >
                <XSocial />
              </a>
              <p className="cart-sub" style={{ marginTop: 10 }}>
                {BRAND.tagline}
              </p>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
