# Examples — real artefacts from the demo run

Produced by `npm run render` on the sample day in `src/data/swell.ts`
(Bali, Friday 20 November 2026). Nothing here is hand-made: if it is
in this folder, the library rendered it.

- `dawn-email.html` / `dawn-email.txt` — the dawn-patrol alert email
  and its plain-text twin (the greeting shows `{{first_name}}` because
  the sample renders the template itself; the batch fills real names
  and filters the breaks to each surfer's level).
- `swell-page.html` — the public swell page.
- `break-charts.pdf` — the printed charts: one A4 page per break,
  with its full tide table.
- `session-card.png` — the biggest break as a square card (1080×1080).

Regenerate everything with `npm run check && npm run render`.
