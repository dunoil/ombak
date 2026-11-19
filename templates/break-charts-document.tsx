import {
  Column,
  Document,
  Heading,
  PageFooter,
  PageHeader,
  PageNumber,
  Row,
  Span,
  Table,
  TableCell,
  TableRow,
  Text,
} from "@hyper-elements/react";
import { swellDay } from "../src/data/swell";
import type { SwellDay } from "../src/data/swell";
import { ombakTheme } from "../src/theme";
import { BreakTable, SwellMark } from "../src/components/shared";

/**
 * OUTPUT 3 — The break charts (Document root -> print HTML via
 * render(), PDF via renderPdf() from @hyper-elements/react/pdf).
 *
 * One A4 chart per break, printed for the board rack and the warung
 * wall: the break's numbers, its full tide table, and the note that
 * keeps visitors out of trouble. The chart on the wall and the alert
 * in the inbox are the same file's children.
 */
export function BreakChartsDocument({ day = swellDay }: { day?: SwellDay }) {
  return (
    <Document
      theme={ombakTheme}
      size="A4"
      margin={42}
      title={`Bali break charts — ${day.date}`}
      lang="en"
      style={{ gap: 20 }}
    >
      <PageHeader style={{ padding: { bottom: 10 } }}>
        <Row style={{ gap: 10, alignItems: "center" }} stackOnMobile={false}>
          <SwellMark breaks={day.breaks} unit={4} />
          <Text style={{ fontWeight: 700, fontSize: 11 }}>
            {day.service} · Break charts · {day.date}
          </Text>
        </Row>
      </PageHeader>
      <PageFooter style={{ padding: { top: 10 } }}>
        <Text style={{ fontSize: 10, color: "#5d6b5e" }}>
          Chart <PageNumber /> of <PageNumber total /> · One swell file
          rendered this chart · Ombak · {day.date}
        </Text>
      </PageFooter>

      {day.breaks.map((spot) => (
        <Document.Page key={spot.id} style={{ gap: 16 }}>
          <Row style={{ gap: 16, alignItems: "center" }} stackOnMobile={false}>
            <Column style={{ gap: 4 }}>
              <Heading level={1} style={{ fontSize: 26 }}>
                {spot.name}
              </Heading>
              <Text>
                {spot.coast} · {spot.swellHeight}m at {spot.period}s ·{" "}
                {spot.wind} wind · suits {spot.minLevel} and up
              </Text>
            </Column>
            <Text style={{ apply: ["stamp"], color: "#0f766e" }}>
              PIN UP
            </Text>
          </Row>

          <Text>{spot.note}</Text>
          <Text>
            Best window: {spot.bestWindow}. Crowd: {spot.crowd}.
          </Text>

          <Heading level={3}>All breaks today</Heading>
          <BreakTable breaks={day.breaks} />

          <Heading level={3}>Tides at {spot.name}</Heading>
          <Table>
            <TableRow header>
              <TableCell>
                <Span style={{ fontWeight: 700 }}>Time</Span>
              </TableCell>
              <TableCell>
                <Span style={{ fontWeight: 700 }}>Tide</Span>
              </TableCell>
              <TableCell>
                <Span style={{ fontWeight: 700 }}>Height</Span>
              </TableCell>
            </TableRow>
            {spot.tides.map((tide) => (
              <TableRow key={tide.time}>
                <TableCell>
                  <Span style={{ apply: ["mono"] }}>{tide.time}</Span>
                </TableCell>
                <TableCell>{tide.kind}</TableCell>
                <TableCell>
                  <Span style={{ apply: ["mono"] }}>{`${tide.height}m`}</Span>
                </TableCell>
              </TableRow>
            ))}
          </Table>

          <Column
            style={{
              gap: 6,
              padding: { top: 12 },
              border: { top: "1px dashed #5d6b5e" },
            }}
          >
            <Text style={{ fontWeight: 700 }}>
              Session log — fill in by hand, photograph, send to the
              service.
            </Text>
            <Text>
              Surfed ☐ · Too big ☐ · Too small ☐ · Board ____________ ·
              Best wave ______________________________________
            </Text>
          </Column>
        </Document.Page>
      ))}
    </Document>
  );
}

BreakChartsDocument.PreviewProps = { day: swellDay };
export default BreakChartsDocument;
