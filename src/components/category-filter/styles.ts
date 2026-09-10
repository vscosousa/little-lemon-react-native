import { StyleSheet } from "react-native";

import { colors, fonts, fontSizes, radius, spacing } from "@/constants/theme";

const styles = StyleSheet.create({
  content: {
    gap: spacing.sm,
    paddingHorizontal: spacing["2xl"],
    paddingVertical: spacing.lg,
  },
  pill: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: colors.light,
  },
  pillSelected: {
    backgroundColor: colors.primaryGreen,
  },
  label: {
    color: colors.dark,
    fontFamily: fonts.karla.extraBold,
    fontSize: fontSizes.sm,
  },
  labelSelected: {
    color: colors.white,
  },
});

export default styles;
