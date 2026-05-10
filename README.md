# KVMTCC Tuition Centre — Website

Premium educational website for KVMTCC Tuition Centre. Static-export Next.js site with a Google Sheets-backed content management system, deployed to GitHub Pages with a custom domain via GitHub Actions CI/CD.

---

## What this project is

A high-end marketing site for a tuition centre serving Class 8–12 students across CBSE and State Board curricula. The site is fully static and free to host, but content (toppers, faculty, courses, testimonials, stats, contact details) lives in a Google Sheet that any non-technical admin can edit without touching code.

When the admin updates the sheet, the website fetches the new data on the next page load — no rebuild required.

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router, static export) |
| UI | React 19 |
| Styling | Tailwind CSS 3.4 |
| Animations | Framer Motion 11 |
| Icons | Lucide React |
| CSV parsing | papaparse |
| Content store | Google Sheets (public CSV via gviz endpoint) |
| Hosting | GitHub Pages |
| CI/CD | GitHub Actions |

---

## Features

- **Modern dark / clean academic light theme** with a toggle (persists per browser)
- **Dynamic mouse-reactive background** with cursor-following spotlight + parallax orbs
- **Bento-grid Hall of Fame** with admin-controllable card sizes (`featured`, `wide`, `tall`, `big`, square)
- **Animated stats bar** with count-up numbers
- **Course catalogue with modal** showing assigned faculty + subject pills
- **Glassmorphic testimonial carousel** with auto-advance
- **Faculty section** with hover glow on circular avatars
- **Reveal-on-scroll** animations across every section
- **Mobile-first responsive design** with auto-orbiting spotlight on touch devices
- **Google Sheets CMS** — non-technical content editing
- **Free hosting** on GitHub Pages with custom domain support

---

## Project structure

```
kvm website final/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD
├── app/
│   ├── globals.css             # Tailwind + theme tokens + glass + bento styles
│   ├── layout.js               # Root layout, fonts, theme init script
│   └── page.js                 # Main page composition
├── components/
│   ├── Navbar.js
│   ├── Hero.js
│   ├── StatsBar.js
│   ├── HallOfFame.js
│   ├── Courses.js
│   ├── CourseModal.js          # Per-course faculty + subject details modal
│   ├── Faculty.js
│   ├── Testimonials.js
│   ├── Footer.js
│   ├── DynamicBackground.js    # Mouse-reactive spotlight + orbs
│   └── ThemeToggle.js          # Dark/light toggle button
├── lib/
│   └── sheets.js               # Google Sheets fetcher + data shapers
├── public/
│   ├── .nojekyll               # Disables Jekyll on GitHub Pages
│   └── CNAME                   # Custom domain (you create this)
├── jsconfig.json               # @/* path aliases
├── next.config.mjs             # Static export config
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── README.md                   # This file
└── ADMIN_GUIDE.md              # Content management guide for non-tech admin
```

---

## Quick start (local development)

### Prerequisites
- Node.js 18 or newer
- npm

### Setup
```bash
# Install dependencies
npm install

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build (test before pushing)
```bash
npm run build
```
Produces a static `out/` folder. If this succeeds, CI will succeed too.

---

## Content management

Content is managed in a Google Sheet, NOT in code. The sheet has 7 tabs:

| Tab | Purpose |
|---|---|
| `Toppers` | Hall of Fame student records |
| `Faculty` | Teacher profiles |
| `Courses` | Course catalogue |
| `CourseFaculty` | Which faculty teach which subjects per course |
| `Testimonials` | Parent testimonials |
| `Stats` | Animated counter values (Years, Students, etc.) |
| `Contact` | Phone, email, address, social links shown in the footer |

The sheet ID is hardcoded in `lib/sheets.js`. To use a different sheet, replace `SHEET_ID`.

For the admin who edits this content, point them to **`ADMIN_GUIDE.md`**.

### How fetching works (and why static export still allows live updates)

The site uses Next.js `output: "export"` — the build produces plain static HTML/CSS/JS. **No server runs at request time.** That would normally mean content is frozen at build time, BUT the data fetching here is deliberately client-side:

- `lib/sheets.js` is marked `"use client"` and exported helpers run in the browser.
- Every data-displaying component (`HallOfFame`, `Faculty`, `Courses`, `Testimonials`, `StatsBar`, `Footer`) is a `"use client"` component that fires `getXxx()` from a `useEffect` on mount.
- `fetchTab()` uses `fetch(url, { cache: "no-store" })`, which bypasses both Next.js's fetch cache and any HTTP cache layer.
- The endpoint is Google's gviz CSV export:
  ```
  https://docs.google.com/spreadsheets/d/<SHEET_ID>/gviz/tq?tqx=out:csv&sheet=<TabName>
  ```
  The sheet must be shared as **"Anyone with the link → Viewer"**. No API key, no auth.

So the runtime flow is: **static HTML loads → JS hydrates → `useEffect` fetches CSV from Google → PapaParse → component renders with live data.** Every page load gets fresh sheet content (~30s after the admin saves, accounting for Google's CDN propagation).

A small in-memory `Map` in `fetchTab()` deduplicates calls within a single page session — e.g., when multiple components ask for `getCourses()` it only hits Google once per page lifetime. That cache is wiped on every full page reload because the module re-initializes.

**Trade-offs of this approach:**
- ✅ Static export = free GitHub Pages hosting, fast CDN delivery, no server costs
- ✅ Live content updates without rebuilding
- ✅ No API keys or auth complexity
- ⚠️ Initial page load shows skeleton/loading states for ~200–500ms while the fetch completes
- ⚠️ Sheet must remain publicly readable (which is fine for a marketing site — the data shows up on the site anyway)

If you ever wanted **build-time** data baking instead (faster initial paint, requires a rebuild trigger when the sheet changes), you'd convert the components to Server Components, call the fetcher directly in them, and add a Sanity-style webhook from the sheet to trigger GitHub Actions. Not needed for current scale.

---

## Deployment

This project is configured for **GitHub Pages** with a custom domain, deployed via **GitHub Actions** on every push to `main`.

### One-time setup

1. **Push the repo to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<username>/<repo>.git
   git push -u origin main
   ```

2. **Set the custom domain.** Create `public/CNAME` with your domain (e.g., `kvmtcc.in`):
   ```bash
   echo "kvmtcc.in" > public/CNAME
   git add public/CNAME && git commit -m "Add CNAME" && git push
   ```

3. **Enable GitHub Pages.** On GitHub: repo → Settings → Pages → Source: **GitHub Actions**.

4. **Configure DNS at your registrar.** For the apex domain:
   ```
   A    @    185.199.108.153
   A    @    185.199.109.153
   A    @    185.199.110.153
   A    @    185.199.111.153
   ```
   Or for a subdomain:
   ```
   CNAME    www    <username>.github.io
   ```

DNS propagates in 5–60 minutes. After that, the site is live.

### How CI/CD works

`.github/workflows/deploy.yml` defines the pipeline:

1. Triggered on every `push` to `main` (also manually via "Run workflow")
2. Checks out the repo
3. Installs dependencies (`npm ci`)
4. Builds the static site (`npm run build`)
5. Uploads `out/` to GitHub Pages
6. Deploys

Total runtime: ~2 minutes.

### Updating content vs. updating code

| Action | Mechanism | Time to live |
|---|---|---|
| Admin edits Google Sheet | Browser fetches on next page load | ~30 seconds |
| Developer pushes code change to `main` | GitHub Actions builds + deploys | ~2 minutes |
| Manual deploy trigger | Repo → Actions → "Deploy to GitHub Pages" → Run workflow | ~2 minutes |

---

## Customization

### Theme colors
Edit `tailwind.config.js`:
- `navy.*` — primary dark colors
- `gold.*` — accent palette
- `cream.*` — light-mode background palette

### Theme variables
Edit `app/globals.css` — both `:root` (light) and `.dark` (dark) blocks define semantic colors backed by CSS custom properties.

### Glass / bento card styles
Defined in `app/globals.css` under `@layer components` and at the bottom — `.glass`, `.glass-strong`, `.bento-card`.

### Hall of Fame card sizes
Logic lives in `lib/sheets.js` → `getSpan()`. Maps the Size column from the sheet to Tailwind grid spans. To add a new size keyword (e.g., `panoramic`), extend that function.

### Adding a new section
1. Create a component in `components/`
2. Add a fetcher to `lib/sheets.js` if it needs sheet data
3. Import + render in `app/page.js`

---

## Troubleshooting

### "Module not found: Can't resolve 'papaparse'"
Run `npm install`.

### Stats Bar (or any section) is empty
The sheet tab name doesn't exactly match what the code expects (case-sensitive, no leading/trailing spaces). Check tab names: `Toppers`, `Faculty`, `Courses`, `CourseFaculty`, `Timetable`, `Testimonials`, `Stats`.

### Sheet changes don't show up on the website

The site fetches sheet data client-side on every page load — no rebuild needed. If a recent edit isn't visible:

1. **Hard-refresh** (`Cmd+Shift+R` / `Ctrl+Shift+R`) — wipes the page's in-memory `fetchTab` cache and re-runs the gviz fetch.
2. **Wait 30–60 seconds** — Google's CDN can take a moment to propagate sheet edits to the CSV endpoint.
3. **Test the endpoint directly** — open in incognito:
   ```
   https://docs.google.com/spreadsheets/d/<SHEET_ID>/gviz/tq?tqx=out:csv&sheet=<TabName>
   ```
   If the CSV reflects your edit, the sheet side is fine. If not, the gviz cache hasn't refreshed yet — wait another minute.
4. **Check tab name spelling** (case-sensitive, no leading/trailing spaces). Google falls back to the first tab when a name doesn't match, which silently produces wrong data shape.

Note: this is **not** a `next build` problem. The Next.js static export bakes only HTML shells; the actual sheet data loads in the browser on every visit, so no rebuild is ever required for content updates. Rebuilds (via `git push` → GitHub Actions) are only needed for code/UI changes.

### `npm audit` shows vulnerabilities
**Do not run `npm audit fix --force`.** It will downgrade Next.js to a 6-year-old version. Most reported vulns are transitive dependencies in `next` itself and are non-exploitable for a static site.

### GitHub Pages deploy fails
- Confirm Pages source is set to "GitHub Actions" (not "Deploy from branch")
- Confirm `npm run build` succeeds locally
- Check the Actions tab for the specific error

### Custom domain not working
- DNS records correct? (use `dig <domain>` to verify)
- `public/CNAME` file present and contains only the bare domain (no `https://`, no trailing slash)?
- Wait at least 30 minutes for DNS propagation
- Check GitHub Pages settings — should show your domain with a green check after verification

---

## License

Private project for KVMTCC Tuition Centre. All rights reserved.

---

## Documentation

- **`README.md`** (this file) — for developers and deployers
- **`ADMIN_GUIDE.md`** — for the non-technical admin managing content via Google Sheets
