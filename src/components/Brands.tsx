import { Info } from 'lucide-react'
import { BRAND_STOCK, type BrandStock, type RoomSize, type StockStatus } from '../data/stock'
import { useT } from '../i18n'

/** Muted status pills. The 'low' amber is the only warm colour on the page. */
const STATUS_PILL: Record<StockStatus, string> = {
  in: 'bg-[#E9F2F6] text-[#0B3B60]',
  low: 'bg-[#FFF4E5] text-[#8A5A20]',
  order: 'bg-[#F1F4F6] text-[#4A5C66]',
}

/**
 * Brands & stock — illustrative example ranges, not a live inventory feed.
 * The disclaimer below the grid says so and must stay visible.
 */
export default function Brands() {
  const t = useT()

  // The dictionary is `as const`, so widen the three lookup tables once into plain
  // Record maps keyed by the data unions. Assignment checks the keys line up.
  const roomLabels: Record<RoomSize, string> = t.brands.rooms
  const statusLabels: Record<StockStatus, string> = t.brands.status
  const blurbs: Record<BrandStock['id'], string> = t.brands.blurbs

  return (
    <section
      id="brands"
      aria-labelledby="brands-title"
      className="scroll-mt-24 bg-white py-16 sm:py-24"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-12">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#2F6E9E]">
          {t.brands.eyebrow}
        </p>

        <h2
          id="brands-title"
          className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.05] text-[#12303F]"
        >
          <span className="block">{t.brands.titleA}</span>
          <span className="block">{t.brands.titleB}</span>
        </h2>

        <p className="mt-5 max-w-lg text-[15px] sm:text-base leading-relaxed text-[#4A5C66]">
          {t.brands.body}
        </p>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {BRAND_STOCK.map((brand) => (
            <article
              key={brand.id}
              className="flex flex-col rounded-2xl border border-[#DCE6EB] bg-white p-6 sm:p-7 transition-colors hover:border-[#2F6E9E]/40"
            >
              <h3 className="text-lg font-bold text-[#12303F]">{brand.name}</h3>

              <p className="mt-1 text-xs tracking-wide text-[#4A5C66]/80">
                {`${t.brands.seriesLabel} · ${brand.series}`}
              </p>

              <p className="mt-3 flex-grow text-sm leading-relaxed text-[#4A5C66]">
                {blurbs[brand.id]}
              </p>

              {/* A definition list rather than a table: it wraps cleanly at 375px. */}
              <dl className="mt-6">
                {brand.units.map((unit) => (
                  <div
                    key={unit.model}
                    className="border-t border-[#DCE6EB] py-3 first:mt-2 first:pt-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <dt className="text-sm font-medium text-[#12303F]">{unit.model}</dt>
                      <dd
                        className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wide ${STATUS_PILL[unit.status]}`}
                      >
                        <span className="sr-only">{`${t.brands.colStatus}: `}</span>
                        {statusLabels[unit.status]}
                      </dd>
                    </div>
                    <dd className="mt-1 text-xs leading-relaxed text-[#4A5C66]">
                      {`${unit.kw} kW · ${roomLabels[unit.room]}`}
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>

        <p className="mt-8 flex max-w-2xl items-start gap-2 text-xs leading-relaxed text-[#4A5C66]/80">
          <Info className="mt-0.5 w-3.5 h-3.5 shrink-0 text-[#2F6E9E]" aria-hidden="true" />
          <span>{t.brands.disclaimer}</span>
        </p>
      </div>
    </section>
  )
}
