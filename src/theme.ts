import { defineTheme } from "@hyper-elements/react";

/**
 * OMBAK theme — "the surf poster": warm sand, deep palm ink, one lagoon
 * teal, sunset coral reserved for epic breaks. Georgia display type
 * over an Inter body — a postcard from the Bukit, not a dashboard.
 *
 * One theme serves all four roots, so it carries NO `mobile` blocks
 * (phone styles are an error in a Document or a Canvas); Email and Page
 * templates set their own phone styles.
 */
export const ombakTheme = defineTheme({
  colors: {
    background: "#f6eeda",
    paper: "#fffaf0",
    foreground: "#14342b",
    muted: "#5d6b5e",
    primary: "#0f766e",
    primaryForeground: "#ffffff",
    border: "#ddd0ae",
  },
  spacing: { xs: 4, sm: 8, md: 16, lg: 28, xl: 44 },
  fontSizes: { sm: 12, md: 15, lg: 19, xl: 30 },
  lineHeights: { tight: 1.25, normal: 1.55 },
  fonts: {
    body: "Inter, Helvetica, Arial, sans-serif",
    heading: "Georgia, 'Times New Roman', serif",
    mono: "'Cascadia Code', Consolas, 'Courier New', monospace",
  },
  radii: { sm: 4, md: 10 },
  elements: {
    Heading: {
      fontFamily: "Georgia, 'Times New Roman', serif",
      fontWeight: 700,
      letterSpacing: -0.3,
      by: {
        level: {
          1: { fontSize: 33 },
          2: { fontSize: 23 },
          3: { fontSize: 16 },
        },
      },
    },
    Text: { fontSize: 15, lineHeight: 1.55 },
    Button: {
      backgroundColor: "#0f766e",
      fontWeight: 700,
      padding: [12, 22],
      borderRadius: 8,
      hover: { backgroundColor: "#115e59" },
      variants: {
        secondary: {
          backgroundColor: "#fffaf0",
          color: "#14342b",
          border: { width: 1, style: "solid", color: "#14342b" },
          hover: { backgroundColor: "#f6eeda" },
        },
        small: { fontSize: 13, padding: [8, 14] },
      },
    },
    Table: { border: { bottom: "1px solid #ddd0ae" } },
    TableCell: { padding: [10, 8], fontSize: 13 },
  },
  styles: {
    card: {
      backgroundColor: "#fffaf0",
      padding: 28,
      gap: 16,
      borderRadius: 10,
      border: { width: 1, style: "solid", color: "#ddd0ae" },
    },
    quiet: { color: "#5d6b5e", fontSize: 12 },
    eyebrow: {
      color: "#0f766e",
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: 2,
      textTransform: "uppercase",
    },
    stamp: {
      fontFamily: "'Cascadia Code', Consolas, 'Courier New', monospace",
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: 1,
      padding: [5, 10],
      border: { width: 1, style: "dashed", color: "#0f766e" },
      borderRadius: 4,
    },
    mono: {
      fontFamily: "'Cascadia Code', Consolas, 'Courier New', monospace",
      fontSize: 13,
    },
  },
  formats: {
    email: { elements: { Button: { borderRadius: 3 } } },
    document: {
      styles: { quiet: { fontSize: 10 } },
      elements: { Text: { fontSize: 11, lineHeight: 1.45 } },
    },
  },
});

declare module "@hyper-elements/react" {
  interface Register {
    theme: typeof ombakTheme;
  }
}
