import { StyleSheet } from "react-native";

import {
  colors,
  fonts,
  fontSizes,
  lineHeights,
  sizes,
  spacing,
} from "@/constants/theme";

const styles = StyleSheet.create({
  row: {
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.white,
  },
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.light,
  },
  label: {
    flex: 1,
    marginRight: spacing.lg,
    color: colors.dark,
    fontFamily: fonts.karla.regular,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.md,
  },
  toggleContainer: {
    width: sizes.md,
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    backgroundColor: colors.light,
  },
});

export default styles;
