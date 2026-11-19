import {
  Canvas,
  Column,
  Heading,
  Row,
  Text,
  token,
} from "@hyper-elements/react";
import { swellDay } from "../src/data/swell";
import type { BreakSpot, SwellDay } from "../src/data/swell";
import { isEpic } from "../src/data/swell";
import { ombakTheme } from "../src/theme";
import { SwellMark } from "../src/components/shared";

/**
 * OUTPUT 4 — The session card (Canvas root, 1080 x 1080 -> PNG).
 *
 * A square card per break, rendered on the server with renderImage():
 * poster bands of palm, lagoon and sunset, the swell as the hero
 * number. The batch makes one card per break (6 cards); this default
 * export is the day's biggest break. Fonts arrive as bytes; nothing is
 * fetched.
 */
export function SessionCanvas({
  day = swellDay,
  spot,
}: {
  day?: SwellDay;
  spot?: BreakSpot;
}) {
  const hero =
    spot ??
    day.breaks.reduce((a, b) =>
      a.swellHeight * a.period >= b.swellHeight * b.period ? a : b,
    );
  const epic = isEpic(hero);
  return (
    <Canvas
      theme={ombakTheme}
      width={1080}
      height={1080}
      title={`${hero.name} — ${hero.swellHeight}m at ${hero.period}s, ${day.date}`}
      lang="en"
      style={{
        padding: 72,
        gap: 28,
        justifyContent: "space-between",
        backgroundColor: "#14342b",
      }}
    >
      <Column
        style={{ gap: 28, justifyContent: "space-between", height: 936 }}
        tokens={{
          colors: { foreground: "#f6eeda", muted: "#b9c4b2", primary: "#7fd1c0" },
        }}
      >
        <Row style={{ gap: 16, alignItems: "center" }} stackOnMobile={false}>
          <SwellMark breaks={day.breaks} unit={10} />
          <Column style={{ gap: 0 }}>
            <Text style={{ fontWeight: 700, fontSize: 30, letterSpacing: 2 }}>
              OMBAK
            </Text>
            <Text style={{ fontSize: 20, color: token("colors.muted") }}>
              {day.service}
            </Text>
          </Column>
        </Row>

        <Column style={{ gap: 22 }}>
          <Column
            style={{
              backgroundColor: epic ? "#e4572e" : "#2aa198",
              height: 18,
              borderRadius: 4,
            }}
          />
          <Text
            style={{
              color: epic ? "#ffb59d" : "#7fd1c0",
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: 2,
            }}
          >
            {epic ? "EPIC TODAY" : "SURF TODAY"} · {hero.coast.toUpperCase()} ·{" "}
            {day.date}
          </Text>
          <Heading level={1} style={{ fontSize: 80, lineHeight: 1.05 }}>
            {hero.name}: {hero.swellHeight}m at {hero.period}s
          </Heading>
          <Text style={{ fontSize: 28 }}>
            {hero.wind} wind. Best {hero.bestWindow}. Suits {hero.minLevel}{" "}
            and up.
          </Text>
          <Text style={{ fontSize: 24, color: token("colors.muted") }}>
            {hero.note}
          </Text>
        </Column>

        <Column style={{ gap: 12 }}>
          <Text style={{ apply: ["mono"], fontSize: 22, color: token("colors.muted") }}>
            Break {hero.id} · One swell file rendered this card, the dawn
            alert, the swell page and the printed break chart.
          </Text>
          <Text style={{ fontSize: 20, color: token("colors.muted") }}>
            Ombak · Every break, every tide · Respect the lineup.
          </Text>
        </Column>
      </Column>
    </Canvas>
  );
}

SessionCanvas.PreviewProps = { day: swellDay };
export default SessionCanvas;
