import { Link } from 'react-router-dom'
import { ArrowRight } from '../components/Icons'

export default function NotFoundPage() {
  return (
    <section className="page notfound">
      <div className="container-editorial">
        <p className="eyebrow" style={{ justifyContent: 'center' }}>
          404
        </p>
        <h1>404</h1>
        <h2 className="page-title" style={{ fontSize: 'clamp(24px, 3.4vw, 34px)' }}>
          That cup is <em>not on the menu</em>.
        </h2>
        <p className="page-lead" style={{ margin: '0 auto 26px' }}>
          The page you asked for does not exist in this concept. The full Salool menu is a good place to
          start again.
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link className="btn btn--gold btn--sm" to="/menu">
            Browse the menu <ArrowRight />
          </Link>
          <Link className="btn btn--ghost btn--sm" to="/">
            Back home
          </Link>
        </div>
      </div>
    </section>
  )
}
