# Muhammad Sarmad — Portfolio

An animated personal portfolio built with **Next.js (App Router, TypeScript)**, **Tailwind CSS**, **GSAP** (`@gsap/react`, ScrollTrigger, SplitText, DrawSVG, MorphSVG), **Lenis** smooth scrolling and **React Three Fiber**.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build:

```bash
npm run build
npm start
npm run lint
```

Requires Node 20.9+.

## Edit the content

All copy, links and projects are in **`src/data/portfolio.ts`**. Anything marked `// TODO: replace` is placeholder text. That includes the role and tagline, the about copy, skills, three placeholder projects, the experience timeline, and the email, LinkedIn and résumé links.

- Empty links are hidden. The Contact section shows only the links you fill in (GitHub is set already).
- For a résumé, put the PDF in `public/` (for example `public/resume.pdf`) and set `resume: "/resume.pdf"`.
- Contact copy has one TODO in `src/components/sections/Contact.tsx`.

## Where things live

| Path | What |
| --- | --- |
| `src/data/portfolio.ts` | All content |
| `src/components/sections/` | Hero, About, Skills, Projects, Experience, Contact, Footer |
| `src/components/three/` | 3D hero scene (lazy-loaded, client-only) plus a static fallback |
| `src/components/ui/` | Preloader, nav, cursor, magnetic buttons, split-text reveal, SVG divider and signature |
| `src/lib/gsap.ts` | GSAP plugin registration |
| `src/app/globals.css` | Design tokens (colours, accent gradient), grain, utilities |

## Motion and performance notes

- **Reduced motion:** if `prefers-reduced-motion: reduce` is set, the site turns off Lenis, the preloader, the 3D render loop (a static gradient orb is shown instead), pinning and scroll animations. All content stays visible.
- **3D:** loaded with `next/dynamic` and `ssr: false`. The device pixel ratio is capped at 1.75. Rendering pauses when the hero is off-screen. If WebGL is unavailable or the scene throws, the static fallback is shown.
- **Fonts:** Instrument Serif, Geist and Geist Mono, self-hosted through `next/font`.

## Deploy on Vercel

1. Push this repo to GitHub.
2. On [vercel.com/new](https://vercel.com/new), import the repo. Vercel detects Next.js automatically, so the default settings work.
3. Click **Deploy**. Every later push to the main branch redeploys the site.

Or use the CLI: `npm i -g vercel && vercel` (and `vercel --prod` for production).
