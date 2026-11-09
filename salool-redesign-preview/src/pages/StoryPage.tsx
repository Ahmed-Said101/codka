import { Link } from 'react-router-dom'
import { ArrowRight, Cup, Heart, Pin, Sparkle } from '../components/Icons'
import PageHead from '../components/PageHead'
import { BRANCHES } from '../data/site'

const MOMENTS = [
  {
    img: '/images/espresso-craft.webp',
    alt: 'A Salool barista pulling an espresso shot',
    title: 'Care in every pour',
    copy: 'A steady hand, a little art, and your cup made properly — the part of Salool you see at the bar.',
  },
  {
    img: '/images/name-on-cup.webp',
    alt: 'A Salool cup with a name written on it',
    title: 'A cup with your name on it',
    copy: 'Your name on the cup, your own moment to pause. That is the feeling the brand talks about.',
  },
  {
    img: '/images/cafe-interior.webp',
    alt: 'The interior of a Salool Café branch in Mogadishu',
    title: 'A welcoming room',
    copy: 'Stay a while or take it with you — coffee, a croissant and a moment for yourself.',
  },
]

export default function StoryPage() {
  return (
    <>
      <section className="page">
        <PageHead
          crumb="Our Story"
          to="/story"
          eyebrow="Handcrafted in Mogadishu"
          title={
            <>
              Behind every cup, <em>a story</em>.
            </>
          }
          lead="Our people, our craft, and the little details that make a visit feel like part of your day."
        />
      </section>

      <section className="section" aria-labelledby="begin-title">
        <div className="container-editorial">
          <div className="hero-split">
            <div>
              <h2 className="display-h2" id="begin-title">
                Where it all <em>begins</em>
              </h2>
              <div className="prose">
                <p>
                  <strong>Salool Café was founded with one goal — bring world-class specialty coffee to
                  Mogadishu.</strong>{' '}
                  Today, three branches and thousands of loyal cups later, the team describes itself as
                  just getting started.
                </p>
                <p>
                  That line is Salool&rsquo;s own, published on salool.com. What this page adds is design:
                  a quieter, cinematic way to read the same story. No dates, numbers or history have been
                  invented here, because the brand has not published them.
                </p>
                <p>
                  What you can check in a café: handcrafted espresso and iced drinks, fresh pastries, and
                  three rooms in Mogadishu where people meet over the same cup.
                </p>
              </div>
              <Link className="btn btn--gold btn--sm" to="/branches" style={{ marginTop: 18 }}>
                Find your branch <ArrowRight />
              </Link>
            </div>

            <figure className="page-photo">
              <img src="/images/behind-the-bar.webp" alt="Behind the counter at a Salool Café branch" width={1280} height={960} loading="lazy" decoding="async" />
            </figure>
          </div>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="moments-title">
        <div className="container-editorial">
          <p className="eyebrow">The heart of Salool</p>
          <h2 className="display-h2" id="moments-title">
            Everyday <em>favourites</em>
          </h2>

          <div className="cards-grid">
            {MOMENTS.map((moment) => (
              <article className="info-card" key={moment.title} data-reveal>
                <figure className="page-photo" style={{ borderRadius: 16 }}>
                  <img src={moment.img} alt={moment.alt} width={640} height={480} loading="lazy" decoding="async" />
                </figure>
                <h3>{moment.title}</h3>
                <p>{moment.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="values-title">
        <div className="container-editorial">
          <div className="quote-band" data-reveal>
            <blockquote>
              “Good coffee. Genuine warmth. Made for moments together.”
            </blockquote>
            <cite>Rewritten from the copy published on salool.com</cite>
          </div>

          <h2 className="display-h2" id="values-title" style={{ marginTop: 44 }}>
            What the brand <em>promises</em>
          </h2>

          <div className="cards-grid">
            <article className="info-card">
              <Cup />
              <h3>Premium quality</h3>
              <p>Crafted with care, every cup — the line Salool uses for its drink build.</p>
            </article>
            <article className="info-card">
              <Sparkle />
              <h3>A welcoming atmosphere</h3>
              <p>Made for moments together, whether you stay or take it with you.</p>
            </article>
            <article className="info-card">
              <Heart />
              <h3>Rewards and more</h3>
              <p>Earn Stars with every order in the official app. See the rewards page for what is verified.</p>
              <div className="link-row">
                <Link to="/rewards">Read the rewards notes</Link>
              </div>
            </article>
          </div>

          <p className="menu-note">
            All three branches — {BRANCHES.map((b) => b.name).join(', ')} — keep the same opening hours.
            Every photograph on this page is an official Salool asset.
          </p>
          <p className="menu-note">
            <Pin style={{ display: 'inline', width: 13, height: 13, verticalAlign: -2 }} /> Not the official
            Salool website — an independent redesign concept.
          </p>
        </div>
      </section>
    </>
  )
}
