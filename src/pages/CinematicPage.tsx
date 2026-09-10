import { useEffect } from 'react'
import CinematicHero from '../components/CinematicHero'

/**
 * The locked, non-scrolling landing experience. Body overflow is pinned while this
 * route is mounted so the page cannot scroll, then restored on the way out.
 */
export default function CinematicPage() {
  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [])

  return <CinematicHero />
}
