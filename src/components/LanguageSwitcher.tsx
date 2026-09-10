import { useLanguage } from '../i18n'

type Tone = 'onDark' | 'onLight'

const TONE: Record<Tone, { active: string; idle: string; divider: string }> = {
  onDark: {
    active: 'text-white',
    idle: 'text-white/60 hover:text-white',
    divider: 'text-white/25',
  },
  onLight: {
    active: 'text-[#12303F]',
    idle: 'text-[#12303F]/40 hover:text-[#12303F]/75',
    divider: 'text-[#12303F]/25',
  },
}

/**
 * EN / 中文 toggle. Rendered as two buttons rather than a dropdown so the current
 * language is always visible and reachable in one tap.
 */
export default function LanguageSwitcher({ tone = 'onLight' }: { tone?: Tone }) {
  const { lang, setLang } = useLanguage()
  const c = TONE[tone]

  return (
    <div
      className="flex items-center gap-1.5 tracking-[0.2em] uppercase"
      role="group"
      aria-label="Switch language"
    >
      <button
        type="button"
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
        className={`inline-flex min-h-[44px] items-center px-2 -mx-1 -my-3 transition-colors cursor-pointer ${lang === 'en' ? c.active : c.idle}`}
      >
        EN
      </button>
      <span className={c.divider} aria-hidden="true">
        ·
      </span>
      <button
        type="button"
        onClick={() => setLang('zh')}
        aria-pressed={lang === 'zh'}
        className={`inline-flex min-h-[44px] items-center px-2 -mx-1 -my-3 normal-case transition-colors cursor-pointer ${lang === 'zh' ? c.active : c.idle}`}
      >
        中文
      </button>
    </div>
  )
}
