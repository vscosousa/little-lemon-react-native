import { StyleSheet } from "react-native";

import {
  colors,
  fonts,
  fontSizes,
  lineHeights,
  radius,
  spacing,
} from "@/constants/theme";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.lg,
    paddingHorizontal: spacing["2xl"],
    paddingVertical: spacing.lg,
  },
  details: {
    flex: 1,
    gap: spacing.xs,
  },
  name: {
    color: colors.dark,
    fontFamily: fonts.karla.bold,
    fontSize: fontSizes.md,
  },
  description: {
    color: colors.dark,
    fontFamily: fonts.karla.regular,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    opacity: 0.7,
  },
  price: {
    marginTop: spacing.sm,
    color: colors.dark,
    fontFamily: fonts.karla.medium,
    fontSize: fontSizes.sm,
  },
  thumbnail: {
    alignSelf: "center",
    width: 80,
    height: 80,
    borderRadius: radius.sm,
  },
  thumbnailPlaceholder: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.light,
  },
});

export default styles;
