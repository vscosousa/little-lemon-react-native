import { StyleSheet } from "react-native";

import {
  colors,
  fonts,
  fontSizes,
  lineHeights,
  spacing,
} from "@/constants/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: spacing["2xl"],
    paddingTop: spacing["3xl"],
    paddingBottom: spacing["2xl"],
  },
  intro: {
    marginBottom: spacing["3xl"],
    color: colors.primaryGreen,
    fontFamily: fonts.markazi.medium,
    fontSize: fontSizes["2xl"],
    lineHeight: lineHeights.xl,
    textAlign: "center",
  },
  fields: {
    gap: spacing.xl,
  },
  nextButtonLabel: {
    fontSize: fontSizes.md,
  },
});

export default styles;
