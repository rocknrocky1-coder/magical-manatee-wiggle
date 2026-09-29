# TIRZAH — Handcrafted Indian Ethnic Wear

A React + Vite storefront for **TIRZAH**, a small-batch Indian ethnic wear label: mul cotton sarees, kurtis, co-ord sets and festive edits.

## Tech stack

- Vite + React + TypeScript
- Tailwind CSS with shadcn/ui components (`src/components/ui`)
- React Router (`src/App.tsx` holds the routes)
- TanStack Query + Supabase for the live catalog, orders and customer accounts
- Serverless API routes in `api/` (Supabase + Razorpay) for order creation and payment verification

## Local development

```bash
npm install --legacy-peer-deps
npm run dev
```

The dev server runs on <http://localhost:8080>.

Copy `.env.example` to `.env` and fill in the Supabase/Razorpay values to talk to the live
backend. Without them the storefront falls back to the bundled demo catalog in
`src/data/mockData.ts`, so the site is fully browsable offline.

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | ESLint |

## Deployment

- **GitHub Pages** — `.github/workflows/static.yml` builds on every push to `main` and
  publishes `dist/`. The app is served from the `/magical-manatee-wiggle/` subpath, which is
  set in `vite.config.ts` (`base`); the router picks that path up automatically through
  `import.meta.env.BASE_URL`, and a `404.html` SPA fallback keeps deep links working.
- **Vercel** — `vercel.json` rewrites all routes to `index.html` and hosts the `api/` functions.
