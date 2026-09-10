/**
 * Example stock for the "Brands & stock" section.
 *
 * These are illustrative entries based on real manufacturer ranges so the page has
 * something concrete to show. They are NOT a live inventory feed and carry no pricing.
 * Replace `units` with real data (or wire this module to an API) before relying on it.
 */

export type StockStatus = 'in' | 'low' | 'order'
export type RoomSize = 'small' | 'medium' | 'large'

export interface StockUnit {
  /** Manufacturer model designation. */
  model: string
  /** Nominal cooling capacity in kW. */
  kw: number
  /** Which dictionary key under brands.rooms describes the space this suits. */
  room: RoomSize
  /** Which dictionary key under brands.status describes availability. */
  status: StockStatus
}

export interface BrandStock {
  id: 'mitsubishi' | 'bosch' | 'midea'
  /** Manufacturer names are proper nouns and stay untranslated. */
  name: string
  series: string
  units: StockUnit[]
}

export const BRAND_STOCK: readonly BrandStock[] = [
  {
    id: 'mitsubishi',
    name: 'Mitsubishi Electric',
    series: 'MSZ-AP',
    units: [
      { model: 'MSZ-AP25VGK', kw: 2.5, room: 'small', status: 'in' },
      { model: 'MSZ-AP35VGK', kw: 3.5, room: 'medium', status: 'in' },
      { model: 'MSZ-AP50VGK', kw: 5.0, room: 'large', status: 'low' },
    ],
  },
  {
    id: 'bosch',
    name: 'Bosch',
    series: 'Climate 3000i',
    units: [
      { model: 'CL3000i-Set 26 WE', kw: 2.6, room: 'small', status: 'in' },
      { model: 'CL3000i-Set 35 WE', kw: 3.5, room: 'medium', status: 'low' },
      { model: 'CL3000i-Set 53 WE', kw: 5.3, room: 'large', status: 'order' },
    ],
  },
  {
    id: 'midea',
    name: 'Midea',
    series: 'All Easy Pro',
    units: [
      { model: 'MSEPBU-09HRFN8', kw: 2.6, room: 'small', status: 'in' },
      { model: 'MSEPBU-12HRFN8', kw: 3.5, room: 'medium', status: 'in' },
      { model: 'MSEPBU-18HRFN8', kw: 5.3, room: 'large', status: 'low' },
    ],
  },
] as const
