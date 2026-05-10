# KVMTCC Tuition Centre — Website

Premium educational website for KVMTCC Tuition Centre. Static-export Next.js site with a Google Sheets-backed content management system, deployed to GitHub Pages with a custom domain via GitHub Actions CI/CD.

---

## What this project is

A high-end marketing site for a tuition centre serving Class 8–12 students across CBSE and State Board curricula. The site is fully static and free to host, but content (toppers, faculty, courses, testimonials, stats, timetables) lives in a Google Sheet that any non-technical admin can edit without touching code.

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
- **Course catalogue with modal** showing weekly timetable + assigned faculty
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
│   ├── CourseModal.js          # Per-course timetable + staff modal
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
| `Timetable` | Weekly schedule per course |
| `Testimonials` | Parent testimonials |
| `Stats` | Animated counter values (Years, Students, etc.) |

The sheet ID is hardcoded in `lib/sheets.js`. To use a different sheet, replace `SHEET_ID`.

For the admin who edits this content, point them to **`ADMIN_GUIDE.md`**.

### How fetching works

`lib/sheets.js` fetches each tab as CSV via Google's gviz endpoint:
```
https://docs.google.com/spreadsheets/d/<SHEET_ID>/gviz/tq?tqx=out:csv&sheet=<TabName>
```

The sheet must be shared as **"Anyone with the link → Viewer"**. No API key, no auth.

PapaParse turns the CSV into row objects keyed by column header. Helper functions like `getToppers()`, `getCourses()` then transform rows into the shapes components expect, including joining `Courses` with `CourseFaculty`, `Timetable`, and `Faculty`.

Results are cached in memory for the page lifetime to avoid redundant fetches across components.

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
Hard-refresh the browser (`Cmd+Shift+R`). The in-memory cache resets on each fresh page load.

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
