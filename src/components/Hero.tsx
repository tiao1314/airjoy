import { ArrowUpRight } from 'lucide-react'
import { useT } from '../i18n'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1761330439671-a7f20c285c5e?auto=format&fit=crop&w=1600&q=80'

/** The main site hero: copy and calls to action on the left, photograph on the right. */
export default function Hero() {
  const t = useT()

  return (
    <section className="pt-10 sm:pt-16 lg:pt-20 pb-16 sm:pb-20">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-12">
        <div className="grid items-center gap-10 lg:gap-16 lg:grid-cols-[45fr_55fr]">
          {/* Left — copy */}
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#2F6E9E]">
              {t.hero.eyebrow}
            </p>

            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.03] text-[#12303F]">
              {t.hero.titleA}
              <br />
              {t.hero.titleB}
              {t.hero.titleSep}
              <span className="text-[#2F6E9E]">{t.hero.titleC}</span>
            </h1>

            <p className="mt-6 max-w-md text-[15px] sm:text-base leading-relaxed text-[#4A5C66]">
              {t.hero.bodyA}
              <br />
              {t.hero.bodyB}
            </p>

            <div className="mt-8 flex flex-col items-start gap-4">
              <a
                href="#enquiry"
                className="inline-flex items-center gap-3 rounded-lg bg-[#0B3B60] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#12303F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F6E9E]"
              >
                {t.hero.cta}
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href="#services"
                className="inline-flex min-h-[44px] items-center text-sm text-[#12303F] underline underline-offset-4 decoration-[#DCE6EB] transition-colors hover:decoration-[#2F6E9E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F6E9E]"
              >
                {t.hero.link}
              </a>
            </div>
          </div>

          {/* Right — photograph with overlaid captions */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <img
              src={HERO_IMAGE}
              alt={t.hero.imageAlt}
              className="w-full h-full object-cover"
              loading="eager"
            />
            {/* Keeps the captions legible over a bright photograph. */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/40 to-transparent"
              aria-hidden="true"
            />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
              <span className="text-[10px] sm:text-xs tracking-[0.15em] uppercase text-white/90">
                {t.hero.imageCaptionLeft}
              </span>
              <span className="text-[10px] sm:text-xs tracking-[0.15em] uppercase text-white/90">
                {t.hero.imageCaptionRight}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
