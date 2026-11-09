import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowRight, ArrowUpRight, Pause, Play } from './Icons'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [paused, setPaused] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [inView, setInView] = useState(true)
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => query.matches && setPaused(true)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.05,
    })
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (paused || !inView) {
      video.pause()
      return
    }
    void video.play().catch(() => {})
  }, [paused, inView])

  const toFeatured = () => {
    const target = document.getElementById('featured')
    if (!target) return
    target.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  return (
    <section
      ref={sectionRef}
      className={`hero ${paused ? 'is-paused' : ''}`}
      id="home"
      aria-labelledby="hero-title"
    >
      <div className="hero-media" aria-hidden="true">
        <img
          src="/images/hero-pour.webp"
          alt=""
          width={1024}
          height={1536}
          fetchPriority="high"
          decoding="async"
        />
        <video
          ref={videoRef}
          className={videoReady ? 'is-ready' : ''}
          src="/videos/hero-720p.mp4"
          poster="/images/hero-video-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          tabIndex={-1}
          onPlaying={() => setVideoReady(true)}
        />
      </div>
      <div className="hero-scrim" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />

      <div className="container-editorial hero-inner">
        <div className="hero-copy">
          <p className="hero-kicker hero-anim hero-d1">Salool Café · Mogadishu</p>
          <h1 className="hero-title hero-anim hero-d2" id="hero-title">
            <span className="hero-line">Good Coffee.</span>
            <span className="hero-line hero-line--gold">Better Together.</span>
          </h1>
          <p className="hero-sub hero-anim hero-d3">
            Handcrafted espresso, iced drinks and fresh pastries — served with genuine warmth at
            three branches across Mogadishu.
          </p>

          <div className="hero-actions hero-anim hero-d4">
            <Link className="btn btn--gold" to="/menu">
              Order Now <ArrowRight />
            </Link>
            <button className="btn btn--ghost" type="button" onClick={toFeatured}>
              <span className="btn-play" aria-hidden="true">
                <ArrowDown />
              </span>
              Explore Menu
            </button>
          </div>

          <Link className="hero-story hero-anim hero-d5" to="/story">
            <span className="hero-story-ring" aria-hidden="true">
              <ArrowUpRight />
            </span>
            <span className="hero-story-label">Our story</span>
          </Link>
        </div>
      </div>

      <button
        className="motion-toggle"
        type="button"
        onClick={() => setPaused((v) => !v)}
        aria-pressed={paused}
        aria-label={paused ? 'Play background video' : 'Pause background video'}
      >
        {paused ? <Play /> : <Pause />}
      </button>

      <a className="scroll-down hero-anim hero-d6" href="#top" aria-label="Back to top">
        <span className="mouse" aria-hidden="true">
          <span />
        </span>
      </a>
    </section>
  )
}
