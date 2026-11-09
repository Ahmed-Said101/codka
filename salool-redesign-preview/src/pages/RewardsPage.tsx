import { Link } from 'react-router-dom'
import { ArrowRight, Clock, Cup, Gift, Info, Pin, Sparkle, Star } from '../components/Icons'
import PageHead from '../components/PageHead'
import StoreButtons from '../components/StoreButtons'
import { BRANCHES, HOURS, LINKS } from '../data/site'

const VERIFIED = [
  { icon: <Star />, title: 'Earn Stars on every purchase', copy: 'Salool publishes “earn Stars with every cup” on salool.com.' },
  { icon: <Gift />, title: 'Redeem Stars', copy: 'Official wording: redeem stars for free drinks, upgrades and exclusive Salool offers.' },
  { icon: <Clock />, title: 'Live order tracking', copy: '“Your order goes straight to our baristas. Track it live.”' },
  { icon: <Sparkle />, title: 'Save your favourites', copy: 'The app stores your favourite drinks for repeat orders.' },
  { icon: <Pin />, title: 'All three branches', copy: 'Order ahead and pick up at Kobac, Banadir or Ventuna October.' },
  { icon: <Cup />, title: 'First-order offer', copy: 'Salool advertises 20% off your first 2 orders in the app.' },
]

export default function RewardsPage() {
  return (
    <>
      <section className="page">
        <PageHead
          crumb="Rewards"
          to="/rewards"
          eyebrow="Salool Rewards"
          title={
            <>
              Every cup <em>counts</em>.
            </>
          }
          lead="Salool runs its loyalty programme inside the official app. Below is everything the brand publishes, plus a concept screen showing how rewards could live on this site."
        />
      </section>

      <section className="section" aria-labelledby="rewards-list-title">
        <div className="container-editorial">
          <h2 className="display-h2" id="rewards-list-title">
            What Salool <em>publishes</em>
          </h2>
          <div className="cards-grid">
            {VERIFIED.map((row) => (
              <article className="info-card" key={row.title} data-reveal>
                {row.icon}
                <h3>{row.title}</h3>
                <p>{row.copy}</p>
              </article>
            ))}
          </div>

          <p className="menu-note">
            Salool does not publish how many Stars you earn per dollar or what each redemption costs, so
            no rates are shown here. Ask in the app or at the counter.
          </p>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="concept-title">
        <div className="container-editorial">
          <div className="hero-split">
            <div>
              <span className="demo-tag">Layout mock · no data</span>
              <h2 className="display-h2" id="concept-title" style={{ marginTop: 14 }}>
                How rewards <em>could sit</em> on this site
              </h2>
              <div className="prose">
                <p>
                  This is a design idea for where a rewards card would live once Salool connects one to a
                  website. The layout is real; the data is not. Because Salool publishes no earning rate or
                  redemption cost, every figure is shown as a dash rather than an invented number.
                </p>
                <p>
                  <strong>Nothing here is connected to Salool&rsquo;s rewards database</strong>, and no cup
                  added to the demo basket earns a Star.
                </p>
              </div>
            </div>

            <div className="summary" style={{ position: 'static' }}>
              <p className="eyebrow">Balance field</p>
              <h2>
                <Star style={{ display: 'inline', width: 18, height: 18, verticalAlign: -3, color: 'var(--color-gold)' }} />{' '}
                — Stars
              </h2>
              <p className="cart-sub" style={{ marginBottom: 14 }}>
                Salool does not publish how Stars are earned or spent
              </p>

              <div className="meter" role="img" aria-label="Empty progress track — no published threshold">
                <span style={{ width: '0%' }} />
              </div>
              <div className="sum-row" style={{ paddingTop: 10 }}>
                <span>Tier</span>
                <strong>—</strong>
              </div>
              <div className="sum-row">
                <span>Redemption</span>
                <strong>—</strong>
              </div>

              <div className="warn" style={{ marginTop: 16 }}>
                <Info />
                <span>
                  Where a live account would appear: your Stars, your tier and what you can redeem. Real
                  Stars live in the official Salool app.
                </span>
              </div>

              <a className="btn btn--gold" href={LINKS.appStore} target="_blank" rel="noopener noreferrer">
                Get the real app <ArrowRight />
              </a>
            </div>
          </div>

          <div className="app-card" style={{ marginTop: 40 }}>
            <div className="app-copy">
              <p className="eyebrow">Download</p>
              <h2>
                Order ahead,
                <br />
                <em style={{ color: 'var(--color-gold)', fontStyle: 'normal' }}>skip the queue</em>
              </h2>
              <p>{BRANCHES.length} branches · {HOURS[0].days} {HOURS[0].time}, {HOURS[1].days} {HOURS[1].time}.</p>
              <div className="app-buttons">
                <StoreButtons />
              </div>
            </div>
            <div className="link-row" style={{ marginTop: 18 }}>
              <Link to="/menu">Build a demo basket first</Link>
              <Link to="/branches">Branch details</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
