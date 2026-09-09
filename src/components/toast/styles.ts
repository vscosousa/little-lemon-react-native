import { StyleSheet } from "react-native";

import {
  borderWidth,
  colors,
  fonts,
  fontSizes,
  lineHeights,
  radius,
  shadowElevation,
  shadowOpacity,
  sizes,
  spacing,
} from "@/constants/theme";

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    left: spacing.lg,
    right: spacing.lg,
    zIndex: 20,
    minHeight: sizes.md,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    overflow: "hidden",
    borderWidth: borderWidth.xs,
    borderColor: colors.light,
    borderRadius: radius.lg,
    backgroundColor: colors.white,
    shadowColor: colors.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: shadowOpacity.md,
    shadowRadius: shadowElevation.md,
    elevation: shadowElevation.md,
  },
  indicator: {
    width: 4,
    alignSelf: "stretch",
    borderRadius: radius.xxs,
  },
  successIndicator: {
    backgroundColor: colors.primaryGreen,
  },
  errorIndicator: {
    backgroundColor: colors.coral,
  },
  infoIndicator: {
    backgroundColor: colors.primaryYellow,
  },
  message: {
    flex: 1,
    color: colors.dark,
    fontFamily: fonts.karla.medium,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
  },
});

export default styles;
