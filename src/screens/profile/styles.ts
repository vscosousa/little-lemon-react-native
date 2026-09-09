import { StyleSheet } from "react-native";

import {
  borderWidth,
  colors,
  fonts,
  fontSizes,
  lineHeights,
  radius,
  spacing,
} from "@/constants/theme";

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.white },
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing["2xl"],
    paddingBottom: spacing["2xl"],
  },
  sections: {
    gap: spacing["3xl"],
  },
  sectionTitle: {
    marginBottom: spacing.xl,
    color: colors.dark,
    fontFamily: fonts.karla.extraBold,
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.lg,
  },
  lastField: {
    marginBottom: 0,
  },
  notificationGroup: {
    overflow: "hidden",
    borderWidth: borderWidth.xs,
    borderColor: colors.light,
    borderRadius: radius.md,
  },
  footerButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: spacing.md,
    marginTop: spacing.md,
  },
  footerButton: {
    flex: 1,
  },
});

export default styles;
