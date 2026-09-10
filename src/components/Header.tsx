import { ArrowUpRight, Phone, Wind } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useT } from '../i18n'
import LanguageSwitcher from './LanguageSwitcher'

const PHONE_HREF = 'tel:07713743188'

const FOCUS = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F6E9E]'

/**
 * Sticky site header. Deliberately has no hamburger: below md the centre nav is
 * dropped entirely and the row keeps just the wordmark, language toggle and phone.
 */
export default function Header() {
  const t = useT()

  const links = [
    { href: '#services', label: t.nav.services },
    { href: '#process', label: t.nav.howItWorks },
    { href: '#brands', label: t.nav.brands },
    { href: '#faqs', label: t.nav.faqs },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-[#DCE6EB] bg-white/85 backdrop-blur-md">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-12">
        <div className="flex h-16 items-center justify-between gap-3 sm:h-20 md:grid md:grid-cols-[1fr_auto_1fr] md:gap-6">
          <Link
            to="/"
            className={`flex min-h-[44px] shrink-0 items-center gap-2 rounded-lg ${FOCUS} md:justify-self-start`}
          >
            <Wind className="h-5 w-5 shrink-0 text-[#0B3B60]" aria-hidden="true" />
            <span className="text-xl font-bold tracking-tight text-[#12303F]" data-latin>{t.brand.name}</span>
          </Link>

          <nav aria-label={t.nav.menu} className="hidden md:flex md:items-center md:gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`rounded-lg text-sm text-[#12303F] transition-colors hover:text-[#2F6E9E] ${FOCUS}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-3 sm:gap-5 md:justify-self-end">
            <div className="text-xs">
              <LanguageSwitcher tone="onLight" />
            </div>

            <a
              href={PHONE_HREF}
              className={`flex min-h-[44px] items-center gap-1.5 whitespace-nowrap rounded-full border border-[#DCE6EB] px-3.5 py-1.5 text-xs font-semibold text-[#12303F] transition-colors hover:border-[#2F6E9E] hover:text-[#2F6E9E] sm:min-h-0 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm ${FOCUS}`}
            >
              <Phone className="h-3.5 w-3.5 shrink-0 sm:hidden" aria-hidden="true" />
              {t.nav.phone}
              <ArrowUpRight className="hidden h-3.5 w-3.5 shrink-0 sm:block" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
