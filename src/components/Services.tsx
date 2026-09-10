import { ArrowUpRight } from 'lucide-react'
import { useT } from '../i18n'

/**
 * Services section: a sticky headline column on the left and a hairline-ruled
 * list of services on the right. Each row is a single anchor into the enquiry
 * form, so the arrow affordance is a real link rather than decoration.
 */
export default function Services() {
  const t = useT()

  return (
    <section id="services" className="scroll-mt-24 bg-white py-16 sm:py-24 lg:py-32">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-20">
          {/* Left — headline, sticky beside the list on large screens */}
          <div className="lg:sticky lg:top-28 lg:w-[38%] lg:shrink-0">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#2F6E9E]">
              {t.services.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.08] text-[#12303F]">
              {t.services.titleA}
              <br />
              {t.services.titleB}
              <br />
              {t.services.titleC}
            </h2>
            <p className="mt-5 max-w-sm text-[15px] sm:text-base leading-relaxed text-[#4A5C66]">
              {t.services.body}
            </p>
          </div>

          {/* Right — the service list */}
          <ul className="lg:w-[62%]">
            {t.services.items.map((item, i) => (
              <li
                key={item.num}
                className={`border-t border-[#DCE6EB] ${
                  i === t.services.items.length - 1 ? 'border-b' : ''
                }`}
              >
                <a
                  href="#enquiry"
                  className="group grid grid-cols-[2.5rem_1fr_auto] items-start gap-x-3 py-7 sm:py-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F6E9E]"
                >
                  <span className="w-10 shrink-0 pt-1 text-xs font-medium text-[#2F6E9E]">
                    {item.num}
                  </span>

                  <div className="min-w-0">
                    <h3 className="text-lg sm:text-xl font-semibold text-[#12303F] transition-colors group-hover:text-[#2F6E9E]">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-[15px] sm:text-base leading-relaxed text-[#4A5C66]">
                      {item.body}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
                      {item.tags.map((tag) => (
                        <span key={tag} className="text-[11px] sm:text-xs text-[#4A5C66]/80">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <span
                    aria-hidden="true"
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#DCE6EB] transition-colors group-hover:border-[#2F6E9E]"
                  >
                    <ArrowUpRight className="h-4 w-4 text-[#12303F]" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
