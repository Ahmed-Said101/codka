import { useEffect } from 'react'

export default function useReveal(dep: unknown) {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)'))
    if (!elements.length) return

    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [dep])
}
