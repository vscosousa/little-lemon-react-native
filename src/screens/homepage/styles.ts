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
  spacing,
} from "@/constants/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  body: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  // The hero floats above the list; letting touches through means drags on it
  // scroll the list and taps on it dismiss the keyboard like any list tap.
  hero: {
    pointerEvents: "none",
    paddingHorizontal: spacing["2xl"],
    paddingTop: spacing.xl,
    backgroundColor: colors.primaryGreen,
  },
  heroPinned: {
    paddingHorizontal: spacing["2xl"],
    paddingTop: spacing.lg,
    paddingBottom: spacing["2xl"],
    borderBottomLeftRadius: radius["2xl"],
    borderBottomRightRadius: radius["2xl"],
    backgroundColor: colors.primaryGreen,
    shadowColor: colors.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: shadowOpacity.sm,
    shadowRadius: shadowElevation.sm,
    elevation: shadowElevation.sm,
  },
  heroImage: {
    width: "100%",
    height: 200,
    marginBottom: spacing.lg,
    borderRadius: radius.xl,
    backgroundColor: colors.peach,
    resizeMode: "cover",
    shadowColor: colors.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: shadowOpacity.md,
    shadowRadius: shadowElevation.md,
    elevation: shadowElevation.md,
  },
  heroTitle: {
    marginBottom: -spacing.md,
    color: colors.primaryYellow,
    fontFamily: fonts.markazi.medium,
    fontSize: fontSizes["3xl"],
    lineHeight: fontSizes["3xl"],
  },
  heroSubtitle: {
    marginBottom: spacing.lg,
    color: colors.white,
    fontFamily: fonts.markazi.regular,
    fontSize: fontSizes["2xl"],
    lineHeight: fontSizes["2xl"],
  },
  heroDescription: {
    color: colors.white,
    fontFamily: fonts.karla.regular,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
  },
  // Keeping this space inside the list header makes it move at the same rate
  // as the hero edge throughout the collapse animation.
  listHeader: {
    paddingTop: spacing["2xl"],
  },
  sectionTitle: {
    paddingHorizontal: spacing["2xl"],
    color: colors.dark,
    fontFamily: fonts.karla.extraBold,
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.lg,
    textTransform: "uppercase",
  },
  separator: {
    height: borderWidth.xs,
    marginHorizontal: spacing["2xl"],
    backgroundColor: colors.light,
  },
  emptyText: {
    padding: spacing["2xl"],
    color: colors.dark,
    fontFamily: fonts.karla.regular,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    textAlign: "center",
  },
});

export default styles;
