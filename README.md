# Transforming Leadership — Website Preview (`www.tleadership.com`)

Complete five-page executive coaching and peer mastermind website for **Dr. Steve Steff (Transforming Leadership)**.

- **Pages & Routes:**
  - `/` — Home
  - `/executive-coaching` — One-on-One Executive Coaching
  - `/mastermind-groups` — Mastermind Groups (faithful to client mockup + application form)
  - `/about` — About Dr. Steve Steff
  - `/insights` — Insights Index + `/insights/[slug]` Article Template (3 complete sample essays)
- **Centralized Copy:** 100% of site copy, metadata, testimonials, FAQs, and articles live in [`src/content.ts`](./src/content.ts).
- **Forms & Persistence:** Built with `react-hook-form` + accessible validation. Connects directly to **Supabase** (`@supabase/supabase-js`) or a webhook at `[FORM_ENDPOINT]`. Without one, preview mode clearly states that nothing was sent and offers a prefilled email draft instead.
- **Contact:** Working `mailto:` / `tel:` links and verified public social-profile URLs in the footer and `/about#contact`. No sixth marketing page was added.
- **Design:** Option A is selected: the third mastermind tier is **VP & Division Leader Circle**. Bracketed facts stay visible in plain text, without highlighting. Reduced-motion-friendly page entrance, section reveal and menu/accordion transitions are included.
- **Verified original-site details:** The founder biography, credentials, two tenure figures, PATH International partnership, named client testimonials, existing logo artwork and three Insights publication dates were checked against `https://www.tleadership.com/` and its linked pages. Retired offers and old team bios were not reintroduced.

---

## 1. Quick Start & Build Instructions

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Run production build (outputs dist/index.html)
npm run build

# 4. Preview production build locally
npm run preview
```

With the dev server running, optional responsive smoke tests can be run with `node scripts/smoke.mjs`. They exercise the main routes (including trailing-slash deep links) at 375px, 768px, 1024px and 1440px, plus the mobile menu, FAQ keyboard behavior, contact/social links, application tier preselection and both demo email drafts. The browser is a development-only dependency.

This is a Vite single-page build. Configure the production web host to serve `dist/index.html` for unknown application routes so direct visits to `/about`, `/mastermind-groups` and `/insights/[slug]` work.

---

## 2. Connecting Supabase (or `[FORM_ENDPOINT]`)

No custom backend server is required. To persist Mastermind applications and 20-Minute Call requests directly to **Supabase**:

1. Create a `.env` file in the project root:
   ```bash
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-public-anon-key
   ```
2. Run this SQL in your Supabase SQL Editor to create the two submission tables with public insert policies:
   ```sql
   create table if not exists public.mastermind_applications (
     id uuid primary key default gen_random_uuid(),
     name text not null,
     email text not null,
     phone text not null,
     title_and_company text not null,
     people_you_lead text not null,
     which_circle text not null,
     biggest_challenge text not null,
     how_did_you_hear text,
     submitted_at timestamptz not null default now()
   );

   create table if not exists public.call_requests (
     id uuid primary key default gen_random_uuid(),
     name text not null,
     email text not null,
     role text not null,
     interest text not null,
     notes text,
     submitted_at timestamptz not null default now()
   );

   alter table public.mastermind_applications enable row level security;
   alter table public.call_requests enable row level security;

   create policy "Allow public insert on mastermind_applications"
     on public.mastermind_applications for insert to anon with check (true);

   create policy "Allow public insert on call_requests"
     on public.call_requests for insert to anon with check (true);
   ```
3. **Alternative Webhook Option:** If you prefer Formspree, Basin, or Zapier instead of Supabase, replace `SITE_CONFIG.formEndpoint` (`'[FORM_ENDPOINT]'`) in `src/content.ts` with your HTTPS POST endpoint.

---

## 3. Complete `[PLACEHOLDER]` Checklist (`src/content.ts`)

Every unconfirmed item remains visible inside plain `[brackets]` without background, borders or highlighting.

### Global Configuration & Logos (`SITE_CONFIG` & `TRUSTED_LOGOS`)
| Placeholder | Location in `src/content.ts` | Appears On | What to Supply |
|---|---|---|---|
| `[FORM_ENDPOINT]` | `SITE_CONFIG.formEndpoint` | `/mastermind-groups#apply`, Booking Modal | Form webhook URL (or configure `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY`) |
| `[BOOKING_CALENDAR_URL]` | `SITE_CONFIG.bookingCalendarUrl` | Global `Book a Call` Modal | Live Calendly / SavvyCal / Microsoft Bookings link |
| `info@tleadership.com`, `866.900.9009` | `SITE_CONFIG.contactEmail`, `contactPhone` | Footer, `/about#contact`, booking dialog | Public details found on existing site; client should reconfirm before launch |
| LinkedIn, Facebook, X URLs | `SOCIAL_LINKS` | Footer, `/about#contact` | Links found on existing site / Steve's LinkedIn; reconfirm they remain active |
| Privacy / terms request links | `SITE_CONFIG.footer.legalLinks` | Global Footer | Replace email-request links with approved policies when available (no dead `/about#privacy` anchors) |
| Ply Gem / US LBM wordmarks | `TRUSTED_LOGOS` | `/` Hero, `/mastermind-groups` Logo Strip | Text-only until approved logo files are supplied; confirm public logo permissions |
| Builders FirstSource, PlayPower, Polydeck | `public/images/brands/` & `TRUSTED_LOGOS` | Both trusted-by logo strips | Artwork copied from the existing client website and shown in grayscale |

### Testimonials (`TESTIMONIALS`)
| Placeholder | Location in `src/content.ts` | Appears On | What to Supply |
|---|---|---|---|
| Gina Butler quote & founder title | `TESTIMONIALS.gina` | `/`, `/executive-coaching`, `/mastermind-groups`, `/about` | Verbatim excerpt & title from current live site; reconfirm reuse approval |
| Gary Robinette quote & CEO title | `TESTIMONIALS.gary` | `/`, `/mastermind-groups`, `/about` | Verbatim excerpt from live site; confirm whether CEO is the current title |
| Ron **Kuehl** quote & EVP title | `TESTIMONIALS.ron` | `/`, `/executive-coaching`, `/mastermind-groups` | Verified on live site as **Ron Kuehl**, EVP at Polydeck Screen Corporation (not "Ron Kuhl"); excerpt avoids outdated broader-audience language |

### Photography (`PhotoPlaceholder` captions)
| Placeholder | Location in `src/content.ts` | Appears On | What to Supply |
|---|---|---|---|
| Dr. Steve Steff photo (provided by client) | `public/images/steve-steff.jpg` & `PREVIEW_IMAGES.portrait` | `/` Hero, Home About Teaser, `/about` Hero, Mastermind Facilitator, booking dialog | Already supplied and locally stored; optionally supply a higher-resolution version later |
| `[Photo: STEVE_PHOTO — One-on-one executive coaching conversation]` | `EXECUTIVE_COACHING_CONTENT.hero.photoPlaceholder` | `/executive-coaching` Hero | Coaching session or portrait photo |
| `[Photo: Mastermind hero background — senior peers around boardroom table]` | `MASTERMIND_CONTENT.hero.bgPhotoPlaceholder` | `/mastermind-groups` Hero | Wide dark-toned boardroom photo (`>= 1920x1080px`) |
| `[Photo: facilitated session]` | `MASTERMIND_CONTENT.peerRoom.photoPlaceholder` | `/mastermind-groups` Peer Room | Candid facilitated group session photo |
| Article Hero Captions (3x) | `INSIGHTS_POSTS[*].heroCaption` | `/insights`, `/insights/[slug]` | 16:9 editorial feature images |

The Steve portrait is the client-provided LinkedIn image, downloaded once to `public/images/steve-steff.jpg` so it does not break if the expiring LinkedIn image URL changes. It is **not** an Unsplash stock portrait. Other photos remain Unsplash previews; URLs are stored in `PREVIEW_IMAGES` and `INSIGHTS_POSTS[*].previewImage`:

- Mastermind hero: `https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1920&q=76`
- Peer session: `https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=78`
- Article photos: see `INSIGHTS_POSTS[*].previewImage` in `src/content.ts`.

Original portrait URL provided by the client: `https://media.licdn.com/dms/image/v2/D4E03AQFJj9C6o59MNw/profile-displayphoto-shrink_400_400/B4EZUkz70hHMAk-/0/1740079349522?e=1796860800&v=beta&t=ieI98Ws0MUFhZBZgTxHdAfZmxf9FO-6wUA4MXvKneDE`.

### Page-Specific Facts, Pricing & Dates
| Placeholder | Location in `src/content.ts` | Appears On | What to Supply |
|---|---|---|---|
| Two decades as a business owner; over fifteen years as a consultant | `HOME_CONTENT`, `MASTERMIND_CONTENT`, `ABOUT_CONTENT` | `/`, `/mastermind-groups`, `/about` | Exact distinction published on `/our-dna/` (not presented as coaching tenure) |
| `[High-potential directors by invitation]` | `EXECUTIVE_COACHING_CONTENT.whoItsFor.bullets` | `/executive-coaching` | Confirm invitation-only director phrasing |
| `[12 sessions/year]` & `[in-person option]` | `EXECUTIVE_COACHING_CONTENT.whatsIncluded` | `/executive-coaching` | Confirm 1:1 annual session count & format |
| `[Optional stakeholder 360 interviews...]` | `EXECUTIVE_COACHING_CONTENT.whatsIncluded` | `/executive-coaching` | Confirm whether 360 interviews are included |
| `[Month]` & `[Month Year]` | `MASTERMIND_CONTENT.hero` & `growthBand` | `/mastermind-groups` | Next cohort month and year (e.g., `September`, `September 2026`) |
| `$[X]/month` & `or $[Y] per year` | `MASTERMIND_CONTENT.pricing` | `/mastermind-groups` | Final monthly and annual mastermind investment |
| `[3 or more]` | `MASTERMIND_CONTENT.pricing` & `faqs` | `/mastermind-groups` | Minimum seats for company group rate |
| `[4 hours — confirm exact timing]` & `[6–12 months]` | `MASTERMIND_CONTENT.faqs` | `/mastermind-groups` | Exact half-day duration & calendar notice window |
| `[2]` | `MASTERMIND_CONTENT.applicationSection` | `/mastermind-groups#apply` | Confirmed application response SLA in business days |
| `[confirm industry / leadership background]` | `ABOUT_CONTENT.story` | `/about` | Early-career industry detail in paragraph 1 |
| `[Client to confirm Values & Faith copy: ...]` | `ABOUT_CONTENT.valuesAndFaith` | `/about` | Final approved Values & Faith paragraph |
| `[Confirm whether the published 3%... is still current]` | `ABOUT_CONTENT.givingBack` | `/about` | Original site states a 3% revenue donation to local PATH International centers; client reconfirms current status |

### Sourced Insights Posts

The three Insights cards now summarize actual articles from the original website, rather than presenting invented 2026 post dates or an unsupported 40% claim:

| New Route | Original Source | Verified Publish Date |
|---|---|---|
| `/insights/behaviors-vs-outcomes` | `https://www.tleadership.com/2023/06/23/behaviors-vs-outcomes/` | June 23, 2023 |
| `/insights/gaining-alignment-to-your-vision` | `https://www.tleadership.com/2019/09/16/gaining-alignment-vision/` | September 16, 2019 |
| `/insights/brainstorming-and-vision` | `https://www.tleadership.com/2018/07/07/brainstorming-and-vision/` | July 7, 2018 |

The post bodies are concise editorial adaptations of the existing articles, not invented performance statistics. Review and approve final wording before launch.

### Mastermind Tier Decision

Option A is implemented consistently across the circle cards, application dropdown and FAQ: **CEO & Owner Circle**, **Executive Circle**, and **VP & Division Leader Circle**. All target senior leaders. The previous "Emerging Leader Circle" and manager-level audience have been removed. Confirm the final caps and cadence before launch.

### Before Launch

The provided Steve photo and three verified client-logo assets are already in place. Before launch, approve remaining bracketed faith/PATH language, supply final Mastermind pricing and cohort dates, confirm logo usage and contact/social details, replace remaining Unsplash group/article previews if desired, add approved legal policies, set a live booking-calendar URL and connect Supabase or `[FORM_ENDPOINT]`. Without a submission backend, validated forms offer an email draft but do **not** claim delivery.
