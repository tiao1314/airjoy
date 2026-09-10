# AirJoy

Air conditioning for homes and businesses across London and surrounding areas.

**Live: https://tiao1314.github.io/airjoy/**

React 18 + TypeScript + Vite + Tailwind CSS. English / 简体中文.

## Running it

```bash
npm install
npm run dev        # http://localhost:3002
```

Other scripts:

```bash
npm run build      # typecheck + production build to dist/
npm run preview    # serve the production build on :3002
npm run typecheck  # tsc --noEmit
```

## Routes

| Route   | What it is |
| ------- | ---------- |
| `/`     | The cinematic landing experience — a locked, non-scrolling full-viewport video page. Click anywhere to reveal the second video; click again (or let it finish) to fade back. Desktop gets a custom 90px cursor reading "feel cool" / "close". |
| `/site` | The full AirJoy marketing site — services, process, brands & stock, FAQs and the enquiry form. |

The bottom-centre of `/` has the only two controls added to that page: **Enter site** and the language toggle.

## Language switching

All user-visible copy lives in `src/i18n/en.ts` and `src/i18n/zh.ts`. Components never
hardcode copy — they read it through `useT()`:

```tsx
import { useT } from '../i18n'
const t = useT()
return <h2>{t.services.titleA}</h2>
```

`src/i18n/en.ts` is the source of truth. Its shape is exported as the `Dict` type, so
adding a key to `en.ts` makes TypeScript demand the same key in `zh.ts` — the two
dictionaries cannot drift apart without the build failing.

The chosen language persists in `localStorage` and falls back to the browser's
`navigator.language` on a first visit. Because Inter has no CJK coverage, `index.css`
adds Noto Sans SC to the font stack when `<html lang="zh">`.

Brand marks (`AirJoy`, `Airjoy`, `/Cooling`, `AIRJOY`), the `24°` numeral and the phone
number stay in Latin script in both languages.

## Brands & stock

`src/data/stock.ts` holds the Bosch / Midea / Mitsubishi Electric entries shown in the
"Brands & stock" section.

> **These are illustrative examples, not a live inventory.** They are based on real
> manufacturer ranges so the section has something concrete to show, and they carry no
> pricing. Replace `BRAND_STOCK` with real data — or point the module at an API — before
> treating anything on that section as accurate. The section renders a visible
> disclaimer saying the same thing.

Each unit is `{ model, kw, room, status }`, where `room` and `status` are keys into the
dictionary so they translate: `status` is `in` / `low` / `order`, and `room` is
`small` / `medium` / `large`.

## Video assets

The two clips on `/` are set in `src/data/videos.ts`:

```ts
export const AIRJOY_BACKGROUND_VIDEO = '...'   // autoplays, loops, always visible
export const AIRJOY_REVEAL_VIDEO     = '...'   // hidden until you click
```

They point at hotlinked stock footage so the page works out of the box. For production,
download the clips and serve them yourself from `public/` — hotlinking a third-party CDN
is fragile and those URLs can disappear. A cool gradient is painted behind both videos,
so a failed or slow-loading video degrades to a solid brand-coloured background rather
than a white screen.

## The enquiry form does not send anything

`Enquiry.tsx` builds a plain-text brief and downloads it via a blob URL. Nothing is
transmitted anywhere — there is no backend, no email, no third-party form service, and
no analytics. The on-page copy states this plainly. Wire it to a real endpoint before
expecting to receive enquiries.

## Deploying

The site is published to GitHub Pages from the `gh-pages` branch. To redeploy:

```bash
npm run deploy
```

That builds with `VITE_BASE=/airjoy/`, copies `index.html` to `404.html` (Pages
has no server-side rewrites, so that copy is what makes a deep link like
`/airjoy/site` boot the app) and force-pushes the result to `gh-pages`.

### Switching to automatic deploys

`deploy/github-pages-workflow.yml` is a ready-to-use GitHub Actions workflow that
rebuilds and redeploys on every push to `main`. It is not installed because the
token in use lacks the `workflow` scope. To enable it:

```bash
gh auth refresh -h github.com -s workflow     # approve once in the browser
mkdir -p .github/workflows
cp deploy/github-pages-workflow.yml .github/workflows/deploy.yml
git add .github && git commit -m "Add Pages deploy workflow" && git push
```

Then set Pages to build from GitHub Actions:

```bash
gh api -X PUT repos/tiao1314/airjoy/pages -f 'build_type=workflow'
```

After that `npm run deploy` and the `gh-pages` branch are no longer needed.

### Base path

`VITE_BASE` sets both the Vite `base` and the router `basename`, so the two can
never disagree. It defaults to `/` for local dev and root-hosted deploys; the
Pages build sets it to `/airjoy/`. If you move the site to a custom domain at the
root, drop `VITE_BASE` and rebuild.

## Project layout

```
src/
  components/    Header, Hero, TrustBar, Services, Process, Brands, FAQ,
                 Enquiry, Footer, LanguageSwitcher, CinematicHero
  pages/         CinematicPage (/), SitePage (/site)
  i18n/          en.ts, zh.ts, index.tsx (provider + useT)
  data/          stock.ts, videos.ts
  hooks/         useIsTouch
```
