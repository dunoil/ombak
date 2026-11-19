# Competition submission — OMBAK (posted 19 Nov 2026 as a bonus entry)

Target: GitHub Discussions → **Challenge Submissions** in `hyper-elements/hyper-elements`
Repository: https://github.com/dunoil/ombak
All numbers below come from the actual run on 19 Nov 2026 (`out/checks.json`, `out/batch.json`).

---

### Which challenge are you entering?
Hyper Elements Template Challenge (November 2026)

### Project name
OMBAK — Every break, every tide: a Bali surf kit (dawn-patrol alert email, swell page, printed break charts PDF, session cards from one swell file)

### Project description

One swell file in → **180 personalised dawn-patrol alerts, a 6-page break-chart PDF, a public swell page and 6 session cards** out — from one theme and one set of shared components.

A forecast is a promise people paddle out on. If the email says Padang Padang is 2.1 metres and the chart on the warung wall says 1.4, someone drives an hour on a lie. This kit makes disagreement impossible by construction — and two rules live in the data, not in anyone's judgement on the day: **"epic" is computed** (swell ≥ 1.5m, period ≥ 12s, offshore wind), and **the level filter is a safety feature** — each surfer's alert lists only breaks at or below their level, so a beginner is never sent to Padang Padang, because their email does not contain it.

- **Dawn alert email** (`Email` → `render()`) — epic breaks called out first, then the surfer's own breaks only. No Svg, no remote images: the SwellMark (one bar per break, as tall as its swell, coral when epic) is a `Grid` of `Column`s, so the day survives image-blocking inboxes. `MergeTag` greeting; plain-text twin from the same render.
- **Swell page** (`Page` → `render()`) — the poster: a sunset hero with real `Svg` sun-and-waves art (allowed here, forbidden in the email), every break as a typed `ombak.BreakCard`, lineup ethics printed where everyone can see them, no client-side JavaScript.
- **Break charts** (`Document` → `renderPdf()`) — one A4 chart per break, printed for the board rack and the warung wall: the break's numbers, its **full tide table**, and a hand-written session log. No browser makes this PDF.
- **Session cards** (`Canvas` → `renderImage()`) — 1080×1080 PNGs, one per break, the swell as the hero number on poster bands of palm and sunset. Server-rendered; fonts in as bytes; nothing fetched.

**Measured on the demo run (19 Nov 2026):** 180 surfer alerts · 6 chart pages in one PDF · 6 session cards · **gate: 0 errors, 0 warnings** · full batch in **2.9s**.

**Corrections pass:** surfer generation is deterministic (no clock, no randomness), so fixing one record re-renders only that record — the other 179 alerts are byte-identical.

### Public GitHub repository URL
https://github.com/dunoil/ombak

### How did you use Hyper Elements?

- **One `defineTheme()`** carries all four roots — warm sand, deep palm ink, lagoon teal, Georgia display over an Inter body, named `card`/`stamp`/`mono` styles, Button variants, per-format overrides. The theme carries no `mobile` blocks on purpose — phone styles are an error in a Document or a Canvas.
- **Shared components across roots** (`Wordmark`, `SwellMark`, `DayLine`, `BreakTable`, `EpicBlock`) are why the emailed break and the printed break are the same break.
- **Each root plays to its medium.** The Page gets full `Svg` sun-and-waves art; the Email, which cannot hold an Svg, gets the SwellMark as layout instead — the same information, drawn the way each medium allows.
- **A custom element with `defineElement()`**: `ombak.BreakCard` with typed props (`prop.text`, `prop.number`, `prop.choice`, `prop.boolean`). A mistyped swell height is a diagnostic with a path, before anything renders.
- **`validate()` as a gate, not a linter.** The batch validates before writing a single file. `out/checks.json` makes the verdict a file instead of a claim.
- **Token scopes for the dark grounds**: the Page hero and the Canvas card invert via `tokens` on a Section/Column — the theme itself never changes.
- **`@hyper-elements/email-clients`** for client proof (`npm run clients`): 5 previews of the email as classic Outlook, Gmail and Apple Mail draw it; screenshots in `docs/`.
- **CLI-ready**: `npx hyper-elements check templates/` reports **4 templates: 0 errors, 0 warnings, 0 skipped** (verified 19 Nov 2026).
- **Written for agents too** (`AGENTS.md`): ten invariants an agent must not break.

**Run it:** `npm install && npm run check && npm run render && npm run make` (180 alerts) · `npm run make:sample` (12) · `npm run clients`. Node 20+. `examples/` holds one artefact of each kind. The breaks are Bali's real geography; the forecast figures are illustrative sample data, not a real forecast.

### Live preview URL (optional)
No hosted preview. `examples/` in the repository contains the dawn alert (HTML + plain text), the swell page, the break charts as a PDF and the biggest break's session card PNG, all from the demo run — and `docs/` holds screenshots of every output, including the email as Outlook and Gmail render it.

### Submission confirmation
- [x] I have starred the Hyper Elements repository. (Starred 18 Nov 2026; same account.)
- [x] My repository is public and contains the complete source code and required README.
- [x] My submission meets the requirements of the selected challenge.
