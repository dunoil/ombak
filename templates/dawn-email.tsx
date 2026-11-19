import {
  Button,
  Column,
  Email,
  Heading,
  Link,
  MergeTag,
  Text,
} from "@hyper-elements/react";
import { swellDay } from "../src/data/swell";
import type { Surfer, SwellDay } from "../src/data/swell";
import { breaksFor } from "../src/data/swell";
import { ombakTheme } from "../src/theme";
import {
  BreakTable,
  DayLine,
  EpicBlock,
  KitFooter,
  Wordmark,
} from "../src/components/shared";

/**
 * OUTPUT 1 — The dawn-patrol alert email (Email root -> email-safe
 * HTML + a plain-text twin from the same render).
 *
 * Personal in the way that keeps people safe: each surfer gets only
 * the breaks at or below their level, from the same swell file the
 * charts are printed from. No Svg, no remote images: the SwellMark is
 * layout, so the day survives image-blocking inboxes.
 */
export function DawnEmail({
  day = swellDay,
  surfer,
}: {
  day?: SwellDay;
  surfer?: Surfer;
}) {
  const breaks = surfer ? breaksFor(day, surfer.level) : day.breaks;
  return (
    <Email
      theme={ombakTheme}
      width={600}
      previewText={`Dawn patrol: ${breaks.length} breaks suit you today — biggest ${Math.max(...breaks.map((b) => b.swellHeight))}m. Epic ones marked.`}
      title={`Bali swell — ${day.date}`}
      lang="en"
      style={{ gap: 20 }}
    >
      <Column style={{ apply: ["card"] }}>
        <Wordmark day={day} />
        <Heading level={1} style={{ mobile: { fontSize: 26 } }}>
          Selamat pagi, <MergeTag name="first_name" />
        </Heading>
        <Text>{day.summary}</Text>
        <DayLine day={day} />
        <EpicBlock day={day} />
        <Heading level={2}>
          {surfer
            ? `Your breaks (${surfer.level})`
            : "Every break today"}
        </Heading>
        <BreakTable breaks={breaks} />
        <Button href="https://ombak.example/today">
          See the full swell chart
        </Button>
        {surfer ? (
          <Text style={{ apply: ["quiet"] }}>
            Dawn alert for {surfer.ref}, surfing at {surfer.level} level.
            We never send you a break above your level — if a spot is not
            listed, today is not its day for you.
          </Text>
        ) : null}
      </Column>
      <KitFooter />
      <Text style={{ apply: ["quiet"], textAlign: "center" }}>
        You receive dawn alerts because you surf with Ombak.{" "}
        <Link href="{{unsubscribe_url}}">Unsubscribe</Link>
      </Text>
    </Email>
  );
}

DawnEmail.PreviewProps = { day: swellDay };
export default DawnEmail;
