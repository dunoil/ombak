import {
  Button,
  Circle,
  Column,
  Grid,
  Heading,
  Page,
  Path,
  Row,
  Section,
  Svg,
  Text,
  token,
} from "@hyper-elements/react";
import { swellDay } from "../src/data/swell";
import type { SwellDay } from "../src/data/swell";
import { isEpic } from "../src/data/swell";
import { ombakTheme } from "../src/theme";
import { DayLine, EpicBlock, KitFooter, SwellMark } from "../src/components/shared";
import { BreakCard } from "../src/components/break-card";

/**
 * OUTPUT 2 — The public swell page (Page root -> responsive web HTML,
 * no client-side JavaScript).
 *
 * The poster: a sunset hero with real Svg sun-and-waves art (allowed
 * here, forbidden in the email), every break as a typed
 * ombak.BreakCard, and the day's ethics printed where everyone can see
 * them.
 */
export function SwellPage({ day = swellDay }: { day?: SwellDay }) {
  return (
    <Page
      theme={ombakTheme}
      width={1100}
      title={`Bali swell — ${day.date}`}
      description={day.summary}
      lang="en"
      style={{ gap: 0 }}
    >
      <Section
        style={{
          backgroundColor: "#14342b",
          padding: [48, 40],
          gap: 20,
          mobile: { padding: [32, 20] },
        }}
        tokens={{
          colors: {
            foreground: "#f6eeda",
            muted: "#b9c4b2",
            primary: "#7fd1c0",
          },
        }}
      >
        <Row style={{ gap: 32, alignItems: "start" }}>
          <Column style={{ gap: 14 }}>
            <Text
              style={{
                color: "#7fd1c0",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              {`${day.service} · ${day.date}`}
            </Text>
            <Heading level={1} style={{ fontSize: 46, mobile: { fontSize: 30 } }}>
              Bali is firing. Go early.
            </Heading>
            <Text style={{ fontSize: 17 }}>{day.summary}</Text>
            <DayLine day={day} />
            <Row style={{ gap: 12 }}>
              <Button href="https://ombak.example/alerts">
                Get dawn alerts
              </Button>
              <Button
                href="https://ombak.example/charts"
                variant="secondary"
                style={{ color: "#14342b" }}
              >
                Print today's charts
              </Button>
            </Row>
          </Column>
          <Column style={{ gap: 12, alignItems: "center" }}>
            <Svg
              width={220}
              height={160}
              viewBox="0 0 220 160"
              title="Sun over Balinese waves"
            >
              <Circle cx={110} cy={62} r={30} style={{ fill: "#e9a426" }} />
              <Path
                d="M0 96 Q 27 78 55 96 T 110 96 T 165 96 T 220 96 V160 H0 Z"
                style={{ fill: "#0f766e" }}
              />
              <Path
                d="M0 118 Q 27 102 55 118 T 110 118 T 165 118 T 220 118 V160 H0 Z"
                style={{ fill: "#2aa198" }}
              />
              <Path
                d="M0 140 Q 27 126 55 140 T 110 140 T 165 140 T 220 140 V160 H0 Z"
                style={{ fill: "#e4572e", opacity: 0.9 }}
              />
            </Svg>
            <SwellMark breaks={day.breaks} unit={10} />
            <Text style={{ apply: ["quiet"], color: "#b9c4b2", textAlign: "center" }}>
              The swell mark: one bar per break, as tall as its swell,
              coral when it is epic — the same mark your dawn alert and
              printed chart carry.
            </Text>
          </Column>
        </Row>
      </Section>

      <Section style={{ padding: [36, 40], gap: 24, mobile: { padding: [24, 20] } }}>
        <EpicBlock day={day} />
        <Heading level={2}>The six breaks</Heading>
        <Grid columns={2} style={{ gap: 16 }}>
          {day.breaks.map((spot) => (
            <BreakCard
              key={spot.id}
              name={spot.name}
              coast={spot.coast}
              swellHeight={spot.swellHeight}
              period={spot.period}
              wind={spot.wind}
              bestWindow={spot.bestWindow}
              level={spot.minLevel}
              epic={isEpic(spot)}
              note={spot.note}
            />
          ))}
        </Grid>
        <Text style={{ color: token("colors.muted"), fontSize: 13 }}>
          Local rules everywhere on this page: the surfer closest to the
          peak has priority, never drop in, and the warung coffee after
          is not optional.
        </Text>
      </Section>

      <Section style={{ padding: [28, 40], mobile: { padding: [20, 20] } }}>
        <KitFooter />
      </Section>
    </Page>
  );
}

SwellPage.PreviewProps = { day: swellDay };
export default SwellPage;
