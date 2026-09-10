import { useState, type FormEvent } from 'react'
import { ArrowDown, ArrowUpRight, Check } from 'lucide-react'
import { useT } from '../i18n'

const NEED_KEYS = ['installation', 'servicing', 'repairs', 'advice'] as const
const SPACE_KEYS = ['home', 'office', 'shop', 'other'] as const

type NeedKey = (typeof NEED_KEYS)[number]
type SpaceKey = (typeof SPACE_KEYS)[number]

const LABEL = 'block text-sm font-medium text-[#12303F] mb-2'

const FIELD =
  'w-full rounded-lg border border-[#DCE6EB] bg-white px-4 py-3 text-sm text-[#12303F] ' +
  'placeholder:text-[#4A5C66]/50 focus-visible:outline-none focus-visible:ring-2 ' +
  'focus-visible:ring-[#2F6E9E] focus-visible:border-transparent'

/**
 * Enquiry section. The form deliberately sends nothing: on submit it assembles a
 * plain-text brief from the selected option labels and hands it to the visitor as
 * a download, so the details survive the visit and can be read out over the phone.
 */
export default function Enquiry() {
  const t = useT()

  const [need, setNeed] = useState<NeedKey>('installation')
  const [space, setSpace] = useState<SpaceKey>('home')
  const [town, setTown] = useState('')
  const [more, setMore] = useState('')
  const [saved, setSaved] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const text = [
      t.enquiry.briefHeading,
      '',
      `${t.enquiry.briefNeed}: ${t.enquiry.needOptions[need]}`,
      `${t.enquiry.briefSpace}: ${t.enquiry.spaceOptions[space]}`,
      `${t.enquiry.briefTown}: ${town.trim() || t.enquiry.briefNotProvided}`,
      `${t.enquiry.briefMore}: ${more.trim() || t.enquiry.briefNotProvided}`,
      '',
      t.enquiry.briefFooter,
    ].join('\n')

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'airjoy-enquiry-brief.txt'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)

    setSaved(true)
  }

  return (
    <section id="enquiry" className="scroll-mt-24 bg-white py-16 sm:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-12">
        <div className="rounded-[28px] bg-[#E9F2F6] p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,45fr)_minmax(0,55fr)] items-start gap-10 lg:gap-16">
            {/* Left — the invitation to simply call */}
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#2F6E9E]">
                {t.enquiry.eyebrow}
              </p>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.05] text-[#12303F]">
                {t.enquiry.titleA}
                <br />
                {t.enquiry.titleB}
              </h2>
              <p className="mt-5 max-w-sm text-[15px] sm:text-base leading-relaxed text-[#4A5C66]">
                {t.enquiry.body}
              </p>

              <a
                href="tel:07713743188"
                className="mt-8 inline-flex min-h-[44px] items-center gap-2 text-2xl sm:text-3xl font-bold tracking-tight text-[#2F6E9E] underline underline-offset-8 decoration-2 decoration-[#2F6E9E]/30 transition-colors hover:decoration-[#2F6E9E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F6E9E]"
              >
                {t.enquiry.phone}
                <ArrowUpRight className="w-5 h-5 shrink-0" aria-hidden="true" />
              </a>

              <p className="mt-6 max-w-xs text-xs leading-relaxed text-[#4A5C66]">
                {t.enquiry.note}
              </p>
            </div>

            {/* Right — the brief builder */}
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="enquiry-need" className={LABEL}>
                    {t.enquiry.needLabel}
                  </label>
                  <select
                    id="enquiry-need"
                    name="need"
                    value={need}
                    onChange={(e) => {
                      setNeed(e.target.value as NeedKey)
                      setSaved(false)
                    }}
                    className={`${FIELD} cursor-pointer`}
                  >
                    {NEED_KEYS.map((key) => (
                      <option key={key} value={key}>
                        {t.enquiry.needOptions[key]}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="enquiry-space" className={LABEL}>
                    {t.enquiry.spaceLabel}
                  </label>
                  <select
                    id="enquiry-space"
                    name="space"
                    value={space}
                    onChange={(e) => {
                      setSpace(e.target.value as SpaceKey)
                      setSaved(false)
                    }}
                    className={`${FIELD} cursor-pointer`}
                  >
                    {SPACE_KEYS.map((key) => (
                      <option key={key} value={key}>
                        {t.enquiry.spaceOptions[key]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="enquiry-town" className={LABEL}>
                  {t.enquiry.townLabel}
                </label>
                <input
                  id="enquiry-town"
                  name="town"
                  type="text"
                  value={town}
                  onChange={(e) => {
                    setTown(e.target.value)
                    setSaved(false)
                  }}
                  placeholder={t.enquiry.townPlaceholder}
                  className={FIELD}
                />
              </div>

              <div className="mt-4">
                <label htmlFor="enquiry-more" className={LABEL}>
                  {t.enquiry.moreLabel}
                </label>
                <textarea
                  id="enquiry-more"
                  name="more"
                  rows={4}
                  value={more}
                  onChange={(e) => {
                    setMore(e.target.value)
                    setSaved(false)
                  }}
                  placeholder={t.enquiry.morePlaceholder}
                  className={`${FIELD} resize-y`}
                />
              </div>

              <button
                type="submit"
                className="mt-6 w-full flex items-center justify-between rounded-lg bg-[#12303F] px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#0B3B60] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F6E9E]"
              >
                {t.enquiry.submit}
                <ArrowDown className="w-4 h-4 shrink-0" aria-hidden="true" />
              </button>

              {/* Announced politely so the download is confirmed without stealing focus */}
              <p className="mt-3 flex items-center gap-1.5 text-xs text-[#2F6E9E]" aria-live="polite">
                {saved && (
                  <>
                    <Check className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    {t.enquiry.saved}
                  </>
                )}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
