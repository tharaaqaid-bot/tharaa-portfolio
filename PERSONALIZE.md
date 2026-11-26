# Personalization checklist — Tharaa Qaid portfolio

This site is complete and works locally, but the biography, projects, and contact details are **realistic placeholders**. Replace the items below before publishing. Every placeholder is also marked with a `PERSONALIZE` comment inside `index.html`.

## 1. Contact details (most important)

| Location in `index.html` | Placeholder | Replace with |
| --- | --- | --- |
| `#emailLink` | `hello@tharaaqaid.example` | Your real email address (also used by the copy button and prepared email). |
| `#mailtoLink` | same placeholder address | Updated automatically from `#emailLink` when the form is submitted. |
| `.contact__details` | `Sana'a, Yemen · Remote` | Your real city / work arrangement. |
| `.contact__details` | `Within 2–3 working days` | Your actual response time. |
| `.social-links a` | `in`, `ig`, `be` placeholder links | Replace `href="#contact"` with your real profile URLs and remove the `data-placeholder` attribute. Until then, clicking shows a reminder toast instead of navigating. |

The contact form is a **local demo**: it validates input and prepares a `mailto:` message, but it does not send data to a server. To make it send automatically, connect your own form service or backend in `js/main.js` (inside the `#contactForm` submit handler).

## 2. Hero / introduction

- Name in `<h1 id="heroTitle">`: **Tharaa Qaid**.
- Role and one-line intro in `.hero__role` and `.hero__text`.
- `.hero__meta`: location, focus area, availability status.
- Replace `images/portrait.svg` with your own photo. Keep the same filename, or update the `<img src>` in the hero. The visible caption `.hero__caption` can then be removed.
- `images/portrait.svg` is an original vector illustration created for this template — it is safe to replace.

## 3. About

- The biography paragraphs in `.about__body`.
- The pull quote and signature in `.about__card`.
- The three `.stat` numbers (`data-count="6"`, `4`, `100`) and their labels.
- The three words in `.about__stamp`.

## 4. Skills

- All six `.skill-card` titles, descriptions, category (`data-category`), and proficiency values.
- The proficiency percentages are `style="--level: 92%"` values and are duplicated in `.skill-card__foot` text — update both.
- The tool list in `.skills__tools`.

## 5. Projects

Each `.project-card` contains its content in `data-*` attributes, which feed the case-study modal:

- `data-title`, `data-year`, `data-role`, `data-summary`, `data-highlights` (separate items with `|`).
- Visible category, title, and year inside `.project-card__info`.
- The image in `.project-card__media` — replace the four files in `images/`:
  - `project-maison-noor.svg`
  - `project-fieldnotes.svg`
  - `project-terra.svg`
  - `project-mawadda.svg`
- Remove or rename the `Sample project` badge and the `.projects__footnote` when using real work.
- The two filter groups (skills and projects) are driven by `data-filter` / `data-category` values. If you add a new category, add a matching filter button.

All four projects are fictional sample case studies (`Maison Noor`, `Fieldnotes Journal`, `Terra Studio`, `Al Mawadda`).

## 6. Education

- The three `.timeline__item` entries: dates, degree/course titles, institutions, and descriptions.
- Text explicitly marked `placeholder institution` and `placeholder provider`.

## 7. Brand details

- Browser title and meta description in `<head>`.
- Monogram `TQ` appears in the header, hero seal, and footer.
- Footer copyright text and the `Personalization notes` link (remove it when the site is live).
- Colours, typography, spacing, and radii are variables at the top of `css/style.css`.

## Fonts

The site uses high-quality system font stacks (Georgia / Palatino for display and Avenir / Segoe UI for body) so it works offline with zero external requests. See `fonts/README.md` if you want to add your own local font files.

## Assets

Every image is a locally created SVG in `images/`. There are no CDN links, external fonts, analytics, or remote scripts. After replacing files, search the project for `.example` and `placeholder` to catch remaining demo text.
