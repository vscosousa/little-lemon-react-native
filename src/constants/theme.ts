/** Brand, neutral, and translucent colors shared by the application. */
export const colors = {
  primaryGreen: "#495E57",
  primaryYellow: "#F4CE14",
  coral: "#EE9972",
  peach: "#FBDABB",
  light: "#EDEFEE",
  dark: "#333333",
  white: "#FFFFFF",
  transparent: "transparent",
  /** Sixty-percent opacity variants for overlays and interaction states. */
  translucent: {
    primaryGreen: "#495E5799",
    primaryYellow: "#F4CE1499",
    coral: "#EE997299",
    peach: "#FBDABB99",
    light: "#EDEFEE99",
    dark: "#33333399",
    white: "#FFFFFF99",
  },
} as const;

/** Registered Expo Font family names and supported weights. */
export const fonts = {
  karla: {
    regular: "Karla_400Regular",
    medium: "Karla_500Medium",
    bold: "Karla_700Bold",
    extraBold: "Karla_800ExtraBold",
  },
  markazi: {
    regular: "MarkaziText_400Regular",
    medium: "MarkaziText_500Medium",
  },
} as const;

/** Semantic font-size scale, expressed in density-independent pixels. */
export const fontSizes = {
  xs: 14,
  sm: 16,
  md: 18,
  lg: 20,
  xl: 24,
  "2xl": 40,
  "3xl": 64,
} as const;

/** Line-height scale paired with the application's typography. */
export const lineHeights = {
  xs: 18,
  sm: 20,
  md: 22,
  lg: 26,
  xl: 48,
  "2xl": 72,
} as const;

/** Spacing scale used for layout, padding, margins, and gaps. */
export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
  "4xl": 40,
  "5xl": 48,
  "6xl": 64,
  "7xl": 80,
  "8xl": 96,
} as const;

/** Border-radius scale, including a fully rounded value. */
export const radius = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
  full: 999,
} as const;

/** Border-width scale, expressed in density-independent pixels. */
export const borderWidth = {
  xs: 1,
  sm: 2,
  md: 4,
  lg: 8,
  xl: 12,
} as const;

/** Shared control and avatar size scale. */
export const sizes = {
  xxs: 24,
  xs: 32,
  sm: 40,
  md: 48,
  lg: 56,
  xl: 64,
  "2xl": 80,
  "3xl": 96,
} as const;

/** Android elevation values mirrored by corresponding iOS shadow radii. */
export const shadowElevation = {
  sm: 10,
  md: 12,
  lg: 16,
} as const;

/** Opacity levels for component shadows. */
export const shadowOpacity = {
  sm: 0.12,
  md: 0.14,
  lg: 0.18,
} as const;
