import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { en, type Dict } from './en'
import { zh } from './zh'

export type Lang = 'en' | 'zh'

const DICTS: Record<Lang, Dict> = { en, zh }
const STORAGE_KEY = 'airjoy.lang'

function readStoredLang(): Lang {
  if (typeof window === 'undefined') return 'en'
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'zh') return stored
  } catch {
    /* private mode / blocked storage — fall through to the browser preference */
  }
  try {
    if (navigator.language.toLowerCase().startsWith('zh')) return 'zh'
  } catch {
    /* ignore */
  }
  return 'en'
}

interface LanguageValue {
  lang: Lang
  setLang: (next: Lang) => void
  toggle: () => void
  t: Dict
}

const LanguageContext = createContext<LanguageValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readStoredLang)

  useEffect(() => {
    document.documentElement.lang = DICTS[lang].meta.htmlLang
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* storage unavailable — the language still applies for this visit */
    }
  }, [lang])

  const setLang = useCallback((next: Lang) => setLangState(next), [])
  const toggle = useCallback(() => setLangState((c) => (c === 'en' ? 'zh' : 'en')), [])

  const value = useMemo<LanguageValue>(
    () => ({ lang, setLang, toggle, t: DICTS[lang] }),
    [lang, setLang, toggle],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage(): LanguageValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>')
  return ctx
}

/** Convenience hook for components that only need the strings. */
export function useT(): Dict {
  return useLanguage().t
}

export type { Dict }
