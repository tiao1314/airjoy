import { useT } from '../i18n'

/**
 * "How it works" — three numbered steps on the pale band. The steps are laid out
 * as a grid rather than a list of cards so the hairline rules read as one
 * continuous rhythm across the row on desktop.
 */
export default function Process() {
  const t = useT()

  return (
    <section id="process" className="scroll-mt-24 bg-[#E9F2F6] py-16 sm:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-12">
        <div className="max-w-xl">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight leading-[1.1] text-[#12303F]">
            {t.process.titleA}
            <br />
            {t.process.titleB}
          </h2>
          <p className="mt-5 max-w-md text-[15px] sm:text-base leading-relaxed text-[#4A5C66]">
            {t.process.body}
          </p>
        </div>

        <ol className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {t.process.steps.map((step) => (
            <li key={step.n} className="border-t border-[#C9DCE5] pt-6">
              <span
                className="w-8 h-8 rounded-full bg-white grid place-items-center text-xs font-semibold text-[#2F6E9E]"
              >
                {step.n}
              </span>
              <h3 className="mt-5 text-base sm:text-lg font-semibold text-[#12303F]">
                {step.title}
              </h3>
              <p className="mt-2 text-[15px] sm:text-base leading-relaxed text-[#4A5C66]">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
