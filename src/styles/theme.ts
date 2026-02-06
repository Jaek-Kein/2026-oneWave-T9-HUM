export const theme = {
  color: {
    bg: "#F7F8FA",
    surface: "#FFFFFF",
    text: "#111827",
    subtext: "#6B7280",
    line: "#E5E7EB",
    blue: "#2563EB",
    blueHover: "#1D4ED8",
    chip: "#F3F4F6",
    chipActive: "#111827",
  },
  radius: {
    xl: 20,
    lg: 16,
    md: 12,
  },
  shadow: {
    sm: "0 1px 2px rgba(0,0,0,0.06)",
    md: "0 8px 24px rgba(0,0,0,0.08)",
  },
  space: (n: number) => `${n * 4}px`,
  bp: {
    lg: 1024,
  },
} as const;

export type AppTheme = typeof theme;
