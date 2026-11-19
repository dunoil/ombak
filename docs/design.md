# OMBAK — design notes

## Concept

A template kit for a Bali surf forecast service's biggest day of the
month. One swell file (6 breaks, each with swell, period, wind, tides,
best window and the level it suits) renders level-filtered dawn-patrol
alert emails, the public swell page, printed A4 break charts and
square session cards. Style: "the surf poster" — warm sand `#f6eeda`,
deep palm ink `#14342b`, lagoon teal `#0f766e`, sunset coral `#e4572e`
reserved for epic breaks; Georgia display over Inter body.

Signature: the **SwellMark** — one bar per break, as tall as its swell,
coral when the break is epic — built from a Grid of Columns so it works
in an inbox, on the page, on the printed chart and on the card. "Epic"
is a rule in the data file (swell >= 1.5m, period >= 12s, offshore
wind), and the level filter (`breaksFor`) is a safety feature, not a
preference: a beginner is never sent to Padang Padang.

Breaks are the island's real geography (Padang Padang, Uluwatu,
Bingin, Balangan, Batu Bolong, Sanur Reef); the forecast numbers are
illustrative sample data, stated as such in the README.

## Build lessons

The kit passed the gate at 0 errors / 0 warnings on the first run —
the accumulated traps from SOWN, Release Ledger and Orbital (flat
theme defaults, array padding, Span-not-Text, no root tokens on
Canvas, primitive Svg children) are all recorded in those kits'
design notes and in this repo's AGENTS.md.
