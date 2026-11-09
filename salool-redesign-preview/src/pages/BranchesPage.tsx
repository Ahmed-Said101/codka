import { Link } from 'react-router-dom'
import { ArrowRight, Clock, Phone, Pin } from '../components/Icons'
import PageHead from '../components/PageHead'
import { BRANCHES, HOURS } from '../data/site'

const DETAILS = [
  {
    name: 'Salool Kobac',
    area: 'KM5 · Zoobe, Hodan',
    note: 'The branch whose prices and sizes the menu on this site was read from.',
    img: '/images/cafe-interior.webp',
    alt: 'Interior of a Salool Café branch',
  },
  {
    name: 'Salool Banadir',
    area: 'Digfeer Road · Hodan',
    note: 'Same drinks, same hours, same counter welcome.',
    img: '/images/warm-welcome.webp',
    alt: 'A warm welcome at a Salool Café counter',
  },
  {
    name: 'Salool Ventuna October',
    area: '21 October Road · Waberi',
    note: 'Order ahead in the app and collect without waiting.',
    img: '/images/made-for-you.webp',
    alt: 'A drink made to order at Salool Café',
  },
]

const mapHref = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`

export default function BranchesPage() {
  return (
    <>
      <section className="page">
        <PageHead
          crumb="Branches"
          to="/branches"
          eyebrow="Find a Salool near you"
          title={
            <>
              Three rooms, one <em>rhythm</em>.
            </>
          }
          lead="Salool runs three branches across Mogadishu with identical opening hours. Address lines are copied from salool.com — nothing here is guessed."
        />
      </section>

      <section className="section" aria-labelledby="branches-list-title">
        <div className="container-editorial">
          <h2 className="display-h2" id="branches-list-title">
            Our three <em>branches</em>
          </h2>
          <div className="cards-grid">
            {DETAILS.map((branch) => (
              <article className="info-card" key={branch.name} data-reveal>
                <figure className="page-photo" style={{ borderRadius: 16 }}>
                  <img src={branch.img} alt={branch.alt} width={640} height={480} loading="lazy" decoding="async" />
                </figure>
                <h3>{branch.name}</h3>
                <p>
                  <Pin style={{ display: 'inline', width: 14, height: 14, verticalAlign: -2 }} />{' '}
                  {branch.area}, Mogadishu
                </p>
                <p>{branch.note}</p>
                <div className="link-row">
                  <a href={mapHref(`${branch.name.replace('Salool ', 'Salool Cafe ')} ${branch.area} Mogadishu`)} target="_blank" rel="noopener noreferrer">
                    Open in Maps ↗
                  </a>
                  <a href="tel:2728">Call 2728</a>
                </div>
              </article>
            ))}
          </div>

          <div className="split" style={{ marginTop: 44 }}>
            <div className="quote-band">
              <blockquote>
                Same hours at all three branches — {HOURS[0].days}, {HOURS[0].time}.
              </blockquote>
              <cite>
                Friday {HOURS[1].days}: {HOURS[1].time}. Published on salool.com.
              </cite>
            </div>

            <div className="summary" style={{ position: 'static' }}>
              <p className="eyebrow">Visiting</p>
              <h2>Pick up or sit in?</h2>
              <div className="sum-row">
                <span>Counter phone</span>
                <strong>2728 — all branches</strong>
              </div>
              <div className="sum-row">
                <span>Branches</span>
                <strong>{BRANCHES.length} in Mogadishu</strong>
              </div>
              <div className="sum-row">
                <span>Order ahead</span>
                <strong>Official Salool app</strong>
              </div>
              <Link className="btn btn--gold" to="/menu">
                Build a basket <ArrowRight />
              </Link>
              <p className="cart-sub" style={{ marginTop: 12 }}>
                The basket here is a demo; real order-ahead happens inside Salool&rsquo;s app.
              </p>
            </div>
          </div>

          <p className="menu-note">
            <Clock style={{ display: 'inline', width: 13, height: 13, verticalAlign: -2 }} /> Hours and
            addresses were checked against salool.com in November 2026. <Phone style={{ display: 'inline', width: 13, height: 13, verticalAlign: -2 }} />{' '}
            2728 is the short number Salool publishes for every branch.
          </p>
        </div>
      </section>
    </>
  )
}
