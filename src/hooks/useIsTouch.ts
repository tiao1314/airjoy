import { useEffect, useState } from 'react'

/**
 * True on touch-primary devices. Evaluated after mount so server/first paint and the
 * client agree, then corrected immediately on the effect pass.
 */
export function useIsTouch(): boolean {
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  return isTouch
}
