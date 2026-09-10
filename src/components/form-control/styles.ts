import { StyleSheet } from "react-native";

import {
  colors,
  fonts,
  fontSizes,
  lineHeights,
  spacing,
} from "@/constants/theme";

const styles = StyleSheet.create({
  label: {
    marginBottom: spacing.sm,
    marginLeft: spacing.xxs,
    color: colors.dark,
    fontFamily: fonts.karla.bold,
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
  },
});

export default styles;
