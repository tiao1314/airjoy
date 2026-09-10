import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { useT } from '../i18n'

/**
 * FAQ accordion. Several answers can be open at once — every item starts open so
 * the section reads as a plain list of answers first and a control second.
 */
export default function FAQ() {
  const t = useT()
  const [open, setOpen] = useState<Set<number>>(() => new Set(t.faq.items.map((_, i) => i)))

  const toggle = (index: number) =>
    setOpen((prev) => {
      const next = new Set(prev)
      if (!next.delete(index)) next.add(index)
      return next
    })

  return (
    <section id="faqs" className="scroll-mt-24 bg-white py-16 sm:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-12">
        <div className="grid items-start gap-10 lg:grid-cols-[2fr_3fr] lg:gap-20">
          <div className="lg:sticky lg:top-28">
            <h2 className="text-3xl font-bold leading-[1.05] tracking-tight text-[#12303F] sm:text-4xl lg:text-5xl">
              {t.faq.title}
            </h2>
          </div>

          <div>
            {t.faq.items.map((item, i) => {
              const isOpen = open.has(i)
              const panelId = `faq-panel-${i}`
              const buttonId = `faq-question-${i}`

              return (
                <div
                  key={item.q}
                  className={`border-t border-[#DCE6EB] ${
                    i === t.faq.items.length - 1 ? 'border-b' : ''
                  }`}
                >
                  <button
                    type="button"
                    id={buttonId}
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F6E9E] hover:text-[#2F6E9E]"
                  >
                    <span className="text-base font-semibold text-[#12303F] transition-colors sm:text-lg">
                      {item.q}
                    </span>
                    {/* Swap the glyph rather than rotating it: a rotated plus
                        reads as a close/dismiss ×, but this control collapses an
                        answer, so a minus is the honest affordance. */}
                    {isOpen ? (
                      <Minus aria-hidden="true" className="h-4 w-4 shrink-0 text-[#12303F]" />
                    ) : (
                      <Plus aria-hidden="true" className="h-4 w-4 shrink-0 text-[#12303F]" />
                    )}
                  </button>

                  {/* grid-rows animates the collapse; `invisible` (which transitions
                      discretely, at the end of the duration) keeps a closed answer out
                      of the accessibility tree without cutting the animation short. */}
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={`grid transition-[grid-template-rows,visibility] duration-300 ease-out ${
                      isOpen ? 'grid-rows-[1fr]' : 'invisible grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-6 text-[15px] leading-relaxed text-[#4A5C66] sm:text-base">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
