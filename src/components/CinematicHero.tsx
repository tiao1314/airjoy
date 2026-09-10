import { useCallback, useEffect, useRef, useState } from 'react'
import { Settings, Wind } from 'lucide-react'
import { Link } from 'react-router-dom'
import LanguageSwitcher from './LanguageSwitcher'
import { useIsTouch } from '../hooks/useIsTouch'
import { useT } from '../i18n'
import { AIRJOY_BACKGROUND_VIDEO, AIRJOY_REVEAL_VIDEO } from '../data/videos'

const FADE_MS = 600

/** Gradient-text helper — the wordmark, the temperature and the caption all use it. */
const gradientText = (background: string) => ({
  background,
  WebkitBackgroundClip: 'text' as const,
  backgroundClip: 'text' as const,
  WebkitTextFillColor: 'transparent' as const,
})

const WORDMARK_GRADIENT = 'linear-gradient(135deg, #ffffff 0%, #bae6fd 45%, #38bdf8 100%)'
const TEMPERATURE_GRADIENT = 'linear-gradient(135deg, #ffffff 0%, #bae6fd 40%, #38bdf8 100%)'
const CAPTION_GRADIENT = 'linear-gradient(90deg, #ffffff 0%, #7dd3fc 100%)'

export default function CinematicHero() {
  const t = useT()
  const isTouch = useIsTouch()

  const [showSecond, setShowSecond] = useState(false)
  const [fading, setFading] = useState(false)

  const secondRef = useRef<HTMLVideoElement | null>(null)
  const cursorRef = useRef<HTMLDivElement | null>(null)
  const fadeTimer = useRef<number | null>(null)

  /* Cursor position is written straight to the node on every mousemove. Routing it
     through React state would re-render the whole section per pixel and introduce
     exactly the lag the brief rules out. */
  useEffect(() => {
    if (isTouch) return

    const onMove = (e: MouseEvent) => {
      const node = cursorRef.current
      if (!node) return
      node.style.left = `${e.clientX}px`
      node.style.top = `${e.clientY}px`
      node.style.opacity = '1'
    }
    const onLeave = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '0'
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [isTouch])

  useEffect(
    () => () => {
      if (fadeTimer.current !== null) window.clearTimeout(fadeTimer.current)
    },
    [],
  )

  const close = useCallback(() => {
    setFading((alreadyFading) => {
      if (alreadyFading) return alreadyFading
      setShowSecond(false)
      fadeTimer.current = window.setTimeout(() => {
        setFading(false)
        secondRef.current?.pause()
        fadeTimer.current = null
      }, FADE_MS)
      return true
    })
  }, [])

  const toggle = useCallback(() => {
    if (showSecond) {
      close()
      return
    }
    if (fading) return

    const video = secondRef.current
    if (video) {
      video.currentTime = 1
      const played = video.play()
      // Autoplay policies reject muted playback only rarely, but an unhandled
      // rejection would surface as a console error on the landing page.
      if (played && typeof played.catch === 'function') played.catch(() => undefined)
    }
    setShowSecond(true)
  }, [showSecond, fading, close])

  return (
    <section
      onClick={toggle}
      className={`relative w-full h-screen overflow-hidden ${isTouch ? 'cursor-auto' : 'cursor-none'}`}
    >
      {/* Painted behind the footage so a slow or blocked video never shows white. */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(160deg, #0B3B60 0%, #14506f 45%, #38bdf8 100%)' }}
        aria-hidden="true"
      />

      {!isTouch && (
        <div
          ref={cursorRef}
          className="fixed w-[90px] h-[90px] rounded-full -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none flex items-center justify-center"
          style={{
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            backgroundColor: 'rgba(3, 32, 46, 0.48)',
            willChange: 'left, top',
            opacity: 0,
          }}
          aria-hidden="true"
        >
          <span className="text-white text-sm font-medium tracking-wide select-none">
            {showSecond ? t.cinematic.cursorClose : t.cinematic.cursorOpen}
          </span>
        </div>
      )}

      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={AIRJOY_BACKGROUND_VIDEO}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />

      <video
        ref={secondRef}
        className="absolute inset-0 w-full h-full object-cover"
        src={AIRJOY_REVEAL_VIDEO}
        muted
        playsInline
        preload="auto"
        onEnded={close}
        style={{
          opacity: showSecond ? 1 : 0,
          transition: 'opacity 600ms ease',
        }}
      />

      {/* Legibility scrim. The brief pins the wordmark, temperature and caption to
          white/ice-blue gradients, which wash out against bright daylight footage.
          These two soft gradients sit above the video and below the content so the
          specified type treatment survives on a blown-out frame. Delete both divs to
          go back to raw footage. */}
      <div
        className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/30 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/35 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 h-full flex flex-col justify-between p-5 sm:p-8 md:p-12 lg:p-16">
        {/* ── top row ───────────────────────────────────────────────── */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2 sm:gap-3 max-w-[70%] sm:max-w-md">
            <h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
              style={gradientText(WORDMARK_GRADIENT)}
            >
              {t.brand.wordmark}
            </h1>

            <Settings className="w-6 h-6 sm:w-8 sm:h-8 text-white/70" strokeWidth={1.5} />

            <p className="text-white/90 text-base sm:text-lg md:text-xl lg:text-2xl leading-snug tracking-tight">
              {t.cinematic.taglineLead}
              <span className="font-semibold">{t.cinematic.taglineStrong}</span>
              <br />
              <span className="font-semibold">{t.cinematic.taglineStrong2}</span>
            </p>
          </div>

          <span
            className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight shrink-0"
            style={{ color: '#0B3B60' }}
          >
            {t.brand.category}
          </span>
        </div>

        {/* ── bottom row ────────────────────────────────────────────── */}
        <div className="flex items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span
              className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-bold leading-[0.85] tracking-tighter"
              style={gradientText(TEMPERATURE_GRADIENT)}
            >
              {t.cinematic.temperature}
            </span>
            <span
              className="text-xs sm:text-sm md:text-base tracking-widest uppercase mt-1"
              style={gradientText(CAPTION_GRADIENT)}
            >
              {t.cinematic.comfortZone}
            </span>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div
              className="border rounded-2xl px-4 py-3 sm:px-6 sm:py-4 backdrop-blur-sm bg-white/5 flex flex-col items-center gap-1"
              style={{ borderColor: 'rgba(11, 59, 96, 0.30)' }}
            >
              <span className="text-xs sm:text-sm tracking-wide text-white/90 sm:text-[#0B3B60]">
                {t.cinematic.designedFor}
              </span>

              <div className="flex items-center gap-2">
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white sm:text-[#0B3B60]">
                  {t.cinematic.everyday}
                </span>
                <Wind
                  className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white sm:text-[#0B3B60]"
                  strokeWidth={1.2}
                />
              </div>

              <span className="text-xs sm:text-sm tracking-wide text-white/70 sm:text-[rgba(11,59,96,0.7)]">
                {t.cinematic.comfort}
              </span>
            </div>

            <span className="text-xs sm:text-sm font-medium tracking-[0.2em] text-white/60 sm:text-[rgba(11,59,96,0.6)]">
              {t.brand.caps}
            </span>
          </div>
        </div>
      </div>

      {/* The only additions to the locked brief: a way through to the main AirJoy
          site at /site, and the language toggle. Both sit in the dead space at the
          bottom centre, and both stop the click so neither fires the video toggle. */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute z-20 bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-3 text-[11px] sm:text-xs tracking-[0.2em] uppercase"
      >
        <Link
          to="/site"
          className="text-white/70 hover:text-white transition-colors cursor-pointer"
        >
          {t.cinematic.enterSite}
        </Link>
        <span className="text-white/40" aria-hidden="true">
          /
        </span>
        <LanguageSwitcher tone="onDark" />
      </div>
    </section>
  )
}
