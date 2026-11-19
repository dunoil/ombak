/**
 * The swell file — the kit's single source of truth.
 *
 * One day's forecast for Bali's west and east coasts: every break with
 * its swell, period, wind, tides, best window and the level it suits.
 * The dawn-patrol alert email, the public swell page, the printed
 * break charts and the session cards all read this file, so they can
 * never disagree about a wave.
 */

export type Level = "beginner" | "intermediate" | "advanced" | "expert";

export const levelRank: Record<Level, number> = {
  beginner: 1,
  intermediate: 2,
  advanced: 3,
  expert: 4,
};

export interface TideEntry {
  time: string;
  kind: "High" | "Low";
  height: number; // metres
}

export interface BreakSpot {
  /** Stable spot id, e.g. "BRK-ULU". */
  id: string;
  name: string;
  coast: string;
  swellHeight: number; // metres
  period: number; // seconds
  wind: "offshore" | "cross-shore" | "onshore";
  bestWindow: string;
  minLevel: Level;
  crowd: string;
  note: string;
  tides: TideEntry[];
}

export interface SwellDay {
  service: string;
  island: string;
  date: string;
  summary: string;
  breaks: BreakSpot[];
}

export interface Surfer {
  firstName: string;
  level: Level;
  ref: string;
}

/** An epic break today: solid swell, long period, offshore wind. */
export function isEpic(spot: BreakSpot): boolean {
  return spot.swellHeight >= 1.5 && spot.period >= 12 && spot.wind === "offshore";
}

/** Breaks a surfer can actually handle, best first. */
export function breaksFor(day: SwellDay, level: Level): BreakSpot[] {
  return day.breaks
    .filter((b) => levelRank[b.minLevel] <= levelRank[level])
    .sort((a, b) => b.swellHeight * b.period - a.swellHeight * a.period);
}

export const swellDay: SwellDay = {
  service: "Ombak — Bali Swell Service",
  island: "Bali",
  date: "Friday, 20 November 2026",
  summary:
    "The swell of the month arrives overnight: a long-period groundswell lights up the Bukit reefs at dawn, offshore until late morning, while the beach breaks stay friendly for everyone else. One forecast file produced every alert, chart and card in this kit.",
  breaks: [
    {
      id: "BRK-PDG",
      name: "Padang Padang",
      coast: "Bukit — west",
      swellHeight: 2.1,
      period: 14,
      wind: "offshore",
      bestWindow: "06:30–09:30, mid tide pushing in",
      minLevel: "expert",
      crowd: "Heavy — the tube does not share",
      note: "The left of the season so far. Deep, fast, and shallow inside — experts only, leash up, respect the locals' priority.",
      tides: [
        { time: "04:58", kind: "Low", height: 0.6 },
        { time: "11:12", kind: "High", height: 2.3 },
        { time: "17:20", kind: "Low", height: 0.7 },
        { time: "23:31", kind: "High", height: 2.1 },
      ],
    },
    {
      id: "BRK-ULU",
      name: "Uluwatu",
      coast: "Bukit — west",
      swellHeight: 1.9,
      period: 14,
      wind: "offshore",
      bestWindow: "06:00–10:00, all tides on the lower reef",
      minLevel: "advanced",
      crowd: "Busy at the cave, thinner down the line",
      note: "Every section working — Temples through the Racetrack. The paddle out is the price of admission.",
      tides: [
        { time: "04:55", kind: "Low", height: 0.6 },
        { time: "11:09", kind: "High", height: 2.3 },
        { time: "17:17", kind: "Low", height: 0.7 },
        { time: "23:28", kind: "High", height: 2.1 },
      ],
    },
    {
      id: "BRK-BIN",
      name: "Bingin",
      coast: "Bukit — west",
      swellHeight: 1.5,
      period: 13,
      wind: "offshore",
      bestWindow: "07:00–10:30, low-to-mid tide",
      minLevel: "advanced",
      crowd: "Moderate — short wave, quick rotation",
      note: "Mechanical little barrels over the reef. Too shallow at dead low; wait for the push.",
      tides: [
        { time: "05:01", kind: "Low", height: 0.6 },
        { time: "11:15", kind: "High", height: 2.2 },
        { time: "17:23", kind: "Low", height: 0.8 },
        { time: "23:34", kind: "High", height: 2.0 },
      ],
    },
    {
      id: "BRK-BAL",
      name: "Balangan",
      coast: "Bukit — west",
      swellHeight: 1.4,
      period: 12,
      wind: "cross-shore",
      bestWindow: "06:30–09:00, before the wind",
      minLevel: "intermediate",
      crowd: "Light early",
      note: "Long left walls with room to move. The cross-shore wind chops it after nine — go early or not at all.",
      tides: [
        { time: "05:03", kind: "Low", height: 0.7 },
        { time: "11:17", kind: "High", height: 2.2 },
        { time: "17:25", kind: "Low", height: 0.8 },
        { time: "23:36", kind: "High", height: 2.0 },
      ],
    },
    {
      id: "BRK-CGU",
      name: "Batu Bolong, Canggu",
      coast: "West coast",
      swellHeight: 0.9,
      period: 11,
      wind: "cross-shore",
      bestWindow: "06:00–08:30, dawn glass",
      minLevel: "beginner",
      crowd: "Friendly and full — share the peak",
      note: "Soft, slow peaks made for longboards and first green waves. The friendliest water on the island today.",
      tides: [
        { time: "05:10", kind: "Low", height: 0.7 },
        { time: "11:24", kind: "High", height: 2.1 },
        { time: "17:32", kind: "Low", height: 0.9 },
        { time: "23:43", kind: "High", height: 1.9 },
      ],
    },
    {
      id: "BRK-SAN",
      name: "Sanur Reef",
      coast: "East coast",
      swellHeight: 1.6,
      period: 13,
      wind: "offshore",
      bestWindow: "07:30–11:00, mid-to-high tide only",
      minLevel: "intermediate",
      crowd: "Light — the boat ride filters it",
      note: "The east coast wakes up on big swells: a long right over the reef, boat access only, and it needs the tide. Miss the window and it is a lake.",
      tides: [
        { time: "05:20", kind: "Low", height: 0.8 },
        { time: "11:34", kind: "High", height: 2.0 },
        { time: "17:42", kind: "Low", height: 0.9 },
        { time: "23:53", kind: "High", height: 1.8 },
      ],
    },
  ],
};

export const sampleSurfer: Surfer = {
  firstName: "Made",
  level: "advanced",
  ref: "SRF-0042",
};

const FIRST = [
  "Made", "Kadek", "Wayan", "Nyoman", "Ketut", "Ayu", "Budi", "Sari",
  "Agus", "Dewi", "Putu", "Raka", "Luh", "Gede", "Iluh", "Bagus",
  "Sinta", "Eka", "Yoga", "Rina",
];
const LEVELS: Level[] = ["beginner", "intermediate", "advanced", "expert"];

/**
 * Deterministic surfer generation — no clock, no randomness.
 * Regenerating the batch after fixing one record reproduces every other
 * record byte-for-byte, which is what makes a corrections pass honest.
 */
export function makeSurfers(count: number): Surfer[] {
  const out: Surfer[] = [];
  for (let i = 0; i < count; i++) {
    out.push({
      firstName: FIRST[(i * 7 + 3) % FIRST.length],
      level: LEVELS[(i * 3 + 1) % LEVELS.length],
      ref: `SRF-${String(100 + ((i * 41) % 880)).padStart(4, "0")}`,
    });
  }
  return out;
}
