# Admin Guide — KVMTCC Website

This guide is for the non-technical person who manages content on the KVMTCC website. **You don't need to know any coding to do this.** Everything is edited in a Google Sheet.

---

## How it works (in 30 seconds)

1. You edit a Google Sheet
2. Google saves automatically
3. Within 30 seconds, the next visitor to the website sees your changes

That's it. No "publish" button, no rebuilding, no waiting. The website pulls from your sheet every time someone loads it.

---

## The Google Sheet

The sheet has **7 tabs** at the bottom. Each tab controls one section of the website:

| Tab | What it controls on the site |
|---|---|
| **Toppers** | Hall of Fame cards |
| **Faculty** | Teacher profiles section |
| **Courses** | Course catalogue |
| **CourseFaculty** | Which teacher is assigned to which course (shown in the "Learn more" modal) |
| **Timetable** | Weekly schedule (shown in the "Learn more" modal) |
| **Testimonials** | Parent testimonial carousel |
| **Stats** | The animated number bar (10+ Years, 500+ Students, etc.) |

**Important:** Don't rename the tabs or change the column headers in row 1. The website looks for these names exactly.

---

## How to add a new entry

The pattern is the same for every tab:

1. Open the sheet
2. Click on the relevant tab (e.g., **Toppers**)
3. Scroll to the first empty row at the bottom
4. Type values into each column
5. Save happens automatically (Google Sheets is autosaving)
6. **Done.** The website will show it within 30 seconds.

---

## How to edit an existing entry

1. Click the cell with the value you want to change
2. Type the new value, press Enter
3. Saved automatically

---

## How to remove an entry

1. Click the row number on the left (selects the whole row)
2. Right-click → **Delete row**

Or temporarily hide an entry without losing the data:
- Cut the row (Cmd+X / Ctrl+X)
- Paste it on a backup tab (you can create one called `Drafts`)

---

## Tab-by-tab field reference

### Toppers tab

Columns: `Name | Grade | Marks | Subject | Image URL | Icon | Featured | Size | Order`

| Field | Example | Notes |
|---|---|---|
| Name | `Ananya Sharma` | Student name |
| Grade | `Class 12 — CBSE` | Grade and board |
| Marks | `495/500` | Total / Out-of |
| Subject | `Science Stream` | Distinction shown under the name |
| Image URL | `https://imgur.com/...jpg` | Photo of the student (see "Image hosting" below) |
| Icon | `Crown` | One of: `Crown` `Trophy` `Medal` `Star` |
| Featured | `TRUE` | Set TRUE for ONE topper to make them the big hero card. All others should be FALSE |
| Size | (blank) or `wide` `tall` `big` | See "Card sizes" below. Leave blank for a regular square card |
| Order | `1` | Number — lower numbers appear first |

### Faculty tab

Columns: `Name | Role | Qualification | Experience | Image URL | Order`

| Field | Example |
|---|---|
| Name | `Dr. Rajesh Kumar` |
| Role | `Head of Physics` |
| Qualification | `Ph.D, IIT Delhi` |
| Experience | `15+ Years` |
| Image URL | photo URL |
| Order | `1` |

### Courses tab

Columns: `Title | Badge | Icon | Description | Subjects | Duration | Students | Order`

| Field | Example | Notes |
|---|---|---|
| Title | `Class 12 — CBSE` | Main course name |
| Badge | `Flagship` | Tag shown on the card (`Flagship` / `Popular` / `New` / etc.) |
| Icon | `Atom` | One of: `Atom` `FlaskConical` `Calculator` `BookOpen` `PenLine` `Globe2` |
| Description | (free text) | Shown on the card |
| Subjects | `Physics, Chemistry, Mathematics, Biology` | **Comma-separated** — each becomes a pill |
| Duration | `12 Months` | |
| Students | `120+ enrolled` | Free text |
| Order | `1` | |

### CourseFaculty tab

Maps which faculty teach which subject for each course. Shown in the modal that opens when a visitor clicks "Learn more" on a course.

Columns: `Course | Faculty | Subject | Order`

| Field | Example | Notes |
|---|---|---|
| Course | `Class 12 — CBSE` | Must **exactly** match a Title from the Courses tab |
| Faculty | `Dr. Rajesh Kumar` | Must **exactly** match a Name from the Faculty tab |
| Subject | `Physics` | The subject this faculty teaches FOR THIS COURSE |
| Order | `1` | Display order within the course's faculty list |

Add one row per faculty assignment. So if a course has 4 teachers, that course will have 4 rows here.

### Timetable tab

Weekly schedule per course. Shown in the "Learn more" modal.

Columns: `Course | Day | Time | Subject | Order`

| Field | Example | Notes |
|---|---|---|
| Course | `Class 12 — CBSE` | Must match a Course Title exactly |
| Day | `Monday` | Full name (Monday, Tuesday, etc.) |
| Time | `4:00 — 5:30 PM` | Free text |
| Subject | `Physics` | What's taught at that slot |
| Order | `1` | Order within that day (1st session, 2nd session, etc.) |

### Testimonials tab

Columns: `Quote | Author | Relation | Image URL | Rating | Order`

| Field | Example |
|---|---|
| Quote | (the testimonial text) |
| Author | `Mrs. Sunita Iyer` |
| Relation | `Mother of Class 12 Topper` |
| Image URL | photo URL |
| Rating | `5` (number from 1 to 5) |
| Order | `1` |

### Stats tab

The animated counter row. Has exactly 4 entries.

Columns: `Icon | Value | Suffix | Label | Subtitle | Order`

| Field | Example | Notes |
|---|---|---|
| Icon | `Award` | One of: `Award` `Users` `TrendingUp` `BookOpen` |
| Value | `10` | The number that counts up. **Must be just digits, no symbols.** |
| Suffix | `+` | What appears after the number — `+`, `%`, etc. |
| Label | `Years Experience` | Big text under the number |
| Subtitle | `of academic excellence` | Smaller text below the label |
| Order | `1` | |

---

## Card sizes (Toppers only)

The Hall of Fame uses a "bento grid" — cards of different sizes arranged like a magazine layout. The `Size` column in the Toppers tab controls each card's shape.

| Size value | Shape | Cells used |
|---|---|---|
| (blank) | Regular square | 1 |
| `wide` | Wide banner (2 cols × 1 row) | 2 |
| `tall` | Tall portrait (1 col × 2 rows) | 2 |
| `big` | Large square (2 cols × 2 rows) | 4 |
| `feature` | Same as `big` | 4 |

**Featured students:** When `Featured = TRUE`, the card automatically becomes the big 2×2 hero card. If you also set `Size = tall`, the featured card becomes even taller (2×3) — useful when the photo is a tall portrait.

### Picking sizes that fill the layout cleanly

The grid has 4 columns. For a clean layout with no empty gaps, the **total cells** should be a multiple of 4.

A handy reference for combinations:

| Toppers | Recommended size mix | Total cells |
|---|---|---|
| 6 (default) | 1 featured + 3 wide + 2 square | 12 = 3 rows |
| 7 | 1 featured + 1 wide + 5 square | 11 — one gap |
| 7 | 1 featured + 2 wide + 4 square | 12 = 3 rows ✓ |
| 11 | 1 featured + 2 wide + 8 square | 16 = 4 rows ✓ |
| 12 (with `tall` featured) | featured-tall + 3 wide + 8 square | 20 = 5 rows ✓ |

If you don't care about gaps, just leave Size blank for new entries — they'll be squares.

---

## Image hosting

The website needs a **public URL** for every photo. You can't upload a photo directly to the sheet — only paste a URL.

### Easiest workflow: Imgur (no signup needed)

1. Go to [imgur.com](https://imgur.com)
2. Drag the photo onto the page (or click "New Post")
3. After it uploads, **right-click the image → "Copy image address"**
4. Paste that URL into the Image URL column

The URL will look like `https://i.imgur.com/abc123.jpg`. That's it.

### Alternative options

- **Unsplash** — free stock photos. Right-click any photo → "Copy image address." Good for placeholder photos before you have real ones.
- **Cloudinary** — free tier, requires signup. Best image quality.
- **Google Drive** — clunky URLs but works.

---

## When changes don't show up

**99% of the time, it's browser cache.** The website caches data while a tab is open.

Fix:
1. Close the website tab completely
2. Open it again

Or:
- **Hard-refresh:** `Cmd+Shift+R` on Mac, `Ctrl+Shift+R` on Windows

If after a hard refresh you still see old data:
- Wait 60 seconds and try again (Google's CDN sometimes takes a moment)
- Verify your sheet edit actually saved (Google shows "Saved" in the top-left when it has)

---

## Common mistakes to avoid

| Mistake | What happens |
|---|---|
| Renaming a tab | The website's section goes empty (it can't find the tab) |
| Changing column headers in row 1 | Same — the website looks for specific column names |
| Setting `Featured = TRUE` on multiple toppers | Multiple big cards may appear; only set TRUE on ONE |
| Typing a Course or Faculty name with a typo in the CourseFaculty tab | The faculty won't show in that course's modal (must match exactly) |
| Pasting a private/login-required image URL | The image will fail to load on the website |
| Leaving the `Order` column blank | Items appear in arbitrary order |
| Putting symbols in the Stats `Value` column | The counter won't animate (must be a plain number) |

---

## Adding a new course end-to-end

To add a complete new course (with timetable and assigned faculty), you need to update **3 tabs**:

1. **Courses tab** — add a row with the course details (Title, Badge, Description, etc.)
2. **CourseFaculty tab** — add one row per teacher assigned to this course
3. **Timetable tab** — add one row per session (e.g., 12 rows for 6 days × 2 sessions)

Once all three are saved, the new course appears in the catalogue. Visitors clicking "Learn more" will see the timetable and the assigned faculty pulled from those tabs.

---

## What the admin can NOT do from the sheet

These require a developer to change code:

- Adding a brand new section to the website (e.g., a Gallery)
- Changing the colors / theme / fonts
- Adding new icon options beyond the supported list
- Changing the layout of cards
- Adding form fields (contact form, enrolment, etc.)

Anything content-related (text, photos, prices, schedules, names) — yes, all from the sheet.

---

## Help

If something looks broken on the website:

1. Check the relevant Google Sheet tab — does the data look correct?
2. Hard-refresh the browser
3. If still broken, contact the developer with:
   - Which section is broken
   - Which row(s) you last edited
   - A screenshot of what's showing on the website
