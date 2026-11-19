import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { formatDiagnostics, render } from "@hyper-elements/react";
import { renderPdf } from "@hyper-elements/react/pdf";
import { renderImage } from "@hyper-elements/react/image";
import DawnEmail from "../templates/dawn-email";
import SwellPage from "../templates/swell-page";
import BreakChartsDocument from "../templates/break-charts-document";
import SessionCanvas from "../templates/session-canvas";

/**
 * Render the four committed examples into out/ :
 *   box-email.html + .txt | box-page.html
 *   packing-document.html + packing-slips.pdf
 *   recipe-card.html (+ recipe-card.png when font files are present)
 *
 * renderPdf() and renderImage() fetch nothing: fonts go in as bytes.
 * Drop Inter TTF files into assets/fonts/ (see assets/fonts/README.md)
 * to enable the PNG; without them the script says so, plainly.
 */
await mkdir("out", { recursive: true });

const email = await render(<DawnEmail />);
await writeFile("out/dawn-email.html", email.html);
await writeFile("out/dawn-email.txt", email.text);
console.log("dawn-email:", formatDiagnostics(email.diagnostics) || "clean");

const page = await render(<SwellPage />);
await writeFile("out/swell-page.html", page.html);
console.log("swell-page:", formatDiagnostics(page.diagnostics) || "clean");

const bold = "assets/fonts/Inter-Bold.woff";
const regular = "assets/fonts/Inter-Regular.woff";
const hasFonts = existsSync(bold) && existsSync(regular);
const fontFiles = hasFonts
  ? [
      { family: "Inter", src: await readFile(regular), weight: 400 as const },
      { family: "Inter", src: await readFile(bold), weight: 700 as const },
    ]
  : undefined;

const doc = <BreakChartsDocument />;
const printed = await render(doc);
await writeFile("out/break-charts.html", printed.html);
// With no font files given, renderPdf() draws in the standard PDF fonts
// (Helvetica/Times) and warns about it in diagnostics — it never fetches.
const pdf = await renderPdf(doc, fontFiles ? { fonts: fontFiles } : undefined);
await writeFile("out/break-charts.pdf", pdf.pdf);
console.log(
  "break-charts: print HTML + PDF written",
  formatDiagnostics(pdf.diagnostics) || "",
);

const card = <SessionCanvas />;
const cardHtml = await render(card);
await writeFile("out/session-card.html", cardHtml.html);

if (hasFonts && fontFiles) {
  const { image, diagnostics } = await renderImage(card, {
    fonts: fontFiles,
  });
  await writeFile("out/session-card.png", image);
  console.log("session-card PNG:", formatDiagnostics(diagnostics) || "clean");
} else {
  console.log(
    "recipe-card: HTML written. PNG skipped — add Inter TTF files to assets/fonts/ (they are passed to renderImage() as bytes; nothing is fetched).",
  );
}
