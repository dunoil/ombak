import {
  Column,
  Grid,
  Row,
  Span,
  Table,
  TableCell,
  TableRow,
  Text,
  token,
} from "@hyper-elements/react";
import type { BreakSpot, SwellDay } from "../data/swell";
import { isEpic } from "../data/swell";

/**
 * Shared components — plain functions returning elements, used under
 * several roots, which is exactly why the dawn alert, the public page
 * and the printed chart can never disagree about a wave.
 */

/**
 * The SwellMark: one bar per break, its height the swell in metres —
 * teal for a good break, coral for an epic one. Built from a Grid of
 * Columns, never an Svg, never an image: an Email cannot hold an Svg
 * and inboxes block images. It is the day, drawn.
 */
export function SwellMark({
  breaks,
  unit = 8,
}: {
  breaks: BreakSpot[];
  unit?: number;
}) {
  return (
    <Grid
      columns={6}
      style={{ gap: 3, width: 6 * 10 + 15, alignItems: "end" }}
      stackOnMobile={false}
    >
      {breaks.map((spot) => (
        <Column
          key={spot.id}
          style={{
            backgroundColor: isEpic(spot) ? "#e4572e" : "#2aa198",
            width: 10,
            height: Math.max(6, Math.round(spot.swellHeight * unit)),
            borderRadius: 2,
          }}
        />
      ))}
    </Grid>
  );
}

export function Wordmark({ day }: { day: SwellDay }) {
  return (
    <Row style={{ gap: 12, alignItems: "center" }} stackOnMobile={false}>
      <SwellMark breaks={day.breaks} unit={5} />
      <Column style={{ gap: 0 }}>
        <Text style={{ fontWeight: 700, fontSize: 17, letterSpacing: 1 }}>
          OMBAK
        </Text>
        <Text style={{ apply: ["quiet"] }}>
          {day.service} · {day.date}
        </Text>
      </Column>
    </Row>
  );
}

export function Eyebrow({ children }: { children: string }) {
  return <Text style={{ apply: ["eyebrow"] }}>{children}</Text>;
}

/** The day at a glance, as a mono line. */
export function DayLine({ day }: { day: SwellDay }) {
  const epic = day.breaks.filter(isEpic).length;
  const biggest = day.breaks.reduce((a, b) =>
    a.swellHeight >= b.swellHeight ? a : b,
  );
  return (
    <Text style={{ apply: ["mono"], color: token("colors.muted") }}>
      {`${day.breaks.length} breaks · biggest ${biggest.swellHeight}m at ${biggest.name} · ${epic} epic`}
    </Text>
  );
}

/** Breaks as a chart table — email and document. Cells hold text/Spans. */
export function BreakTable({ breaks }: { breaks: BreakSpot[] }) {
  return (
    <Table>
      <TableRow header>
        <TableCell>
          <Span style={{ fontWeight: 700 }}>Break</Span>
        </TableCell>
        <TableCell>
          <Span style={{ fontWeight: 700 }}>Swell</Span>
        </TableCell>
        <TableCell>
          <Span style={{ fontWeight: 700 }}>Period</Span>
        </TableCell>
        <TableCell>
          <Span style={{ fontWeight: 700 }}>Best window</Span>
        </TableCell>
      </TableRow>
      {breaks.map((spot) => (
        <TableRow key={spot.id}>
          <TableCell>
            <Span style={{ fontWeight: 700 }}>{spot.name}</Span>
            {isEpic(spot) ? (
              <Span style={{ color: "#b23c17", fontWeight: 700 }}>
                {" "}
                · EPIC
              </Span>
            ) : null}
          </TableCell>
          <TableCell>
            <Span style={{ apply: ["mono"] }}>{`${spot.swellHeight}m`}</Span>
          </TableCell>
          <TableCell>
            <Span style={{ apply: ["mono"] }}>{`${spot.period}s`}</Span>
          </TableCell>
          <TableCell>{spot.bestWindow}</TableCell>
        </TableRow>
      ))}
    </Table>
  );
}

/** The epic breaks, called out on their own — email and page. */
export function EpicBlock({ day }: { day: SwellDay }) {
  const epic = day.breaks.filter(isEpic);
  if (epic.length === 0) return null;
  return (
    <Column
      style={{
        gap: 10,
        padding: 18,
        backgroundColor: "#fdeee7",
        border: { width: 1, style: "solid", color: "#e4572e" },
        borderRadius: 8,
      }}
    >
      <Text style={{ fontWeight: 700, color: "#b23c17" }}>
        Epic today — {epic.length} breaks firing
      </Text>
      {epic.map((spot) => (
        <Text key={spot.id} style={{ fontSize: 14 }}>
          <Span style={{ fontWeight: 700 }}>
            {spot.name} — {spot.swellHeight}m at {spot.period}s,{" "}
            {spot.wind} wind.
          </Span>{" "}
          Best {spot.bestWindow}. {spot.note}
        </Text>
      ))}
    </Column>
  );
}

export function KitFooter() {
  return (
    <Column style={{ gap: 6, alignItems: "center" }}>
      <Text style={{ apply: ["quiet"], textAlign: "center" }}>
        Ombak · Bali Swell Service · Respect the lineup, leave the beach
        cleaner than you found it
      </Text>
      <Text style={{ apply: ["quiet"], textAlign: "center" }}>
        One swell file rendered this — dawn alert, swell page, break
        charts and session cards — with Hyper Elements.
      </Text>
    </Column>
  );
}
