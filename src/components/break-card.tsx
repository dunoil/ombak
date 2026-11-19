import { Column, Row, Text, defineElement, prop, token } from "@hyper-elements/react";

/**
 * `ombak.BreakCard` — one surf break, as a poster card: its name, swell
 * and period as the heroes, wind, best window, the level it suits and
 * an epic flag when the rule says so.
 *
 * A custom element because the break is the kit's unit of reuse: the
 * page grids six of them, and a mistyped swell height or a missing best
 * window should be a diagnostic with a path, not a broken chart. Props
 * are typed with the prop.* builders.
 */
export const BreakCard = defineElement({
  type: "ombak.BreakCard",
  label: "Break card",
  description:
    "One surf break: name, coast, swell height, period, wind, best window, level and note.",
  props: {
    name: prop.text({ label: "Break name", required: true }),
    coast: prop.text({ label: "Coast", required: true }),
    swellHeight: prop.number({ label: "Swell height (m)", required: true }),
    period: prop.number({ label: "Period (s)", required: true }),
    wind: prop.choice(["offshore", "cross-shore", "onshore"] as const, {
      label: "Wind",
      default: "offshore",
    }),
    bestWindow: prop.text({ label: "Best window", required: true }),
    level: prop.text({ label: "Suits level", required: true }),
    epic: prop.boolean({ label: "Epic today", default: false }),
    note: prop.text({ label: "Note", required: true }),
  },
  render: ({ name, coast, swellHeight, period, wind, bestWindow, level, epic, note }) => {
    return (
      <Column
        style={{
          gap: 8,
          backgroundColor: token("colors.paper"),
          border: {
            width: 1,
            style: "solid",
            color: epic ? "#e4572e" : token("colors.border"),
          },
          borderRadius: 10,
          padding: 18,
        }}
      >
        <Row style={{ gap: 10, alignItems: "center" }} stackOnMobile={false}>
          <Column
            style={{
              backgroundColor: epic ? "#e4572e" : "#2aa198",
              width: 10,
              height: Math.max(8, Math.round(swellHeight * 8)),
              borderRadius: 2,
            }}
          />
          <Text style={{ fontWeight: 700, fontSize: 16 }}>{name}</Text>
          <Text style={{ apply: ["quiet"] }}>{coast}</Text>
          {epic ? (
            <Text style={{ color: "#b23c17", fontWeight: 700, fontSize: 12 }}>
              EPIC
            </Text>
          ) : null}
        </Row>
        <Text style={{ fontWeight: 700, fontSize: 15 }}>
          {swellHeight}m at {period}s · {wind} wind
        </Text>
        <Text style={{ fontSize: 14 }}>
          Best {bestWindow}. Suits {level} and up. {note}
        </Text>
      </Column>
    );
  },
});
