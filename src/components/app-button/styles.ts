import { StyleSheet } from "react-native";

import {
  colors,
  fonts,
  fontSizes,
  radius,
  sizes,
  spacing,
} from "@/constants/theme";

const styles = StyleSheet.create({
  button: {
    minHeight: sizes.md,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
    borderRadius: radius.lg,
  },
  primary: {
    backgroundColor: colors.primaryGreen,
  },
  secondary: {
    backgroundColor: colors.light,
  },
  yellow: {
    backgroundColor: colors.primaryYellow,
  },
  compact: {
    minWidth: 82,
    minHeight: sizes.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
  },
  label: {
    color: colors.dark,
    fontFamily: fonts.karla.bold,
    fontSize: fontSizes.sm,
  },
  primaryLabel: {
    color: colors.white,
  },
  secondaryLabel: {
    color: colors.primaryGreen,
  },
  compactLabel: {
    fontSize: fontSizes.xs,
  },
  disabled: {
    opacity: 0.45,
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.98 }],
  },
});

export default styles;
