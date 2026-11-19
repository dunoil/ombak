import { mkdir, writeFile } from "node:fs/promises";
import { render, validate, formatDiagnostics } from "@hyper-elements/react";
import { renderPdf } from "@hyper-elements/react/pdf";
import { renderImage } from "@hyper-elements/react/image";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import DawnEmail from "../templates/dawn-email";
import BreakChartsDocument from "../templates/break-charts-document";
import { SessionCanvas } from "../templates/session-canvas";
import { swellDay, makeSurfers } from "../src/data/swell";

/**
 * The batch: one swell file -> a personalised dawn-patrol alert for
 * every surfer (only the breaks at or below their level), the printed
 * break charts (one A4 page per break) and one session card per break.
 *
 *   npm run make               180 surfer alerts + charts + 6 cards
 *   npm run make:sample        12 alerts, for a quick look
 *
 * The gate runs first: the alert email is validated before a single
 * file is written, so one bad forecast never becomes 180 bad alerts.
 * Surfer generation is deterministic — a corrections run re-renders
 * only the records that changed.
 */
const arg = process.argv.indexOf("--count");
const count = arg >= 0 ? Number(process.argv[arg + 1]) : 180;
const started = Date.now();

const gate = validate(<DawnEmail />);
if (!gate.valid) {
  console.error(formatDiagnostics(gate.diagnostics));
  process.exit(1);
}

await mkdir("out/alerts", { recursive: true });
const surfers = makeSurfers(count);
let emails = 0;
for (const surfer of surfers) {
  const { html, text } = await render(<DawnEmail surfer={surfer} />);
  const stem = `out/alerts/${surfer.ref.toLowerCase()}`;
  await writeFile(`${stem}.html`, html);
  if (text) await writeFile(`${stem}.txt`, text);
  emails++;
}

const charts = await renderPdf(<BreakChartsDocument />);
await writeFile("out/break-charts.pdf", charts.pdf);

let cards = 0;
const bold = "assets/fonts/Inter-Bold.woff";
const regular = "assets/fonts/Inter-Regular.woff";
if (existsSync(bold) && existsSync(regular)) {
  const fonts = [
    { family: "Inter", src: await readFile(regular), weight: 400 as const },
    { family: "Inter", src: await readFile(bold), weight: 700 as const },
  ];
  for (const spot of swellDay.breaks) {
    const { image } = await renderImage(<SessionCanvas spot={spot} />, { fonts });
    await writeFile(`out/alerts/card-${spot.id.toLowerCase()}.png`, image);
    cards++;
  }
} else {
  console.log("cards skipped: add Inter font files to assets/fonts/ (see its README)");
}

const summary = {
  day: `Bali swell — ${swellDay.date}`,
  emails,
  chartPages: swellDay.breaks.length,
  cards,
  seconds: Math.round((Date.now() - started) / 100) / 10,
};
await writeFile("out/batch.json", JSON.stringify(summary, null, 2) + "\n");
console.log(JSON.stringify(summary, null, 2));
