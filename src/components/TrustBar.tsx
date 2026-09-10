import { Check } from 'lucide-react'
import { useT } from '../i18n'

/**
 * Slim reassurance strip that sits directly under the hero. Deliberately quiet:
 * three short claims, no headings, no card treatment.
 */
export default function TrustBar() {
  const t = useT()
  const items = [t.trust.a, t.trust.b, t.trust.c]

  return (
    <div className="w-full bg-[#E9F2F6] py-4 sm:py-5">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-12">
        <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-6 sm:gap-y-2">
          {items.map((label) => (
            <li key={label} className="flex items-center gap-2">
              <Check
                className="w-4 h-4 shrink-0 text-[#2F6E9E]"
                strokeWidth={2.5}
                aria-hidden="true"
              />
              <span className="text-xs sm:text-sm text-[#12303F]">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
