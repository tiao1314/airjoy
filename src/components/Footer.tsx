import { Wind } from 'lucide-react'
import { useT } from '../i18n'

/**
 * Closing rule of the page. Intentionally has no navigation — just the wordmark,
 * the tagline and the area served.
 */
export default function Footer() {
  const t = useT()

  return (
    <footer className="border-t border-[#DCE6EB] py-10 sm:py-12">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:gap-6 sm:text-left">
          <div className="flex shrink-0 items-center gap-2">
            <Wind className="h-6 w-6 shrink-0 text-[#0B3B60]" aria-hidden="true" />
            <span className="text-2xl font-bold tracking-tight text-[#12303F]" data-latin>{t.brand.name}</span>
          </div>

          <p className="text-sm text-[#4A5C66]">{t.footer.tagline}</p>

          <p className="text-xs text-[#4A5C66]/80">{t.footer.region}</p>
        </div>
      </div>
    </footer>
  )
}
