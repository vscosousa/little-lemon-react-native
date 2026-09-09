import { StyleSheet } from "react-native";

import {
  borderWidth,
  colors,
  fonts,
  fontSizes,
  radius,
  sizes,
  spacing,
} from "@/constants/theme";

const styles = StyleSheet.create({
  control: {
    minHeight: sizes.md,
    paddingHorizontal: spacing.lg,
    borderWidth: borderWidth.xs,
    borderColor: colors.light,
    borderRadius: radius.md,
    backgroundColor: colors.light,
  },
  input: {
    color: colors.dark,
    fontFamily: fonts.karla.regular,
    fontSize: fontSizes.sm,
  },
  inputFocused: {
    borderColor: colors.primaryGreen,
    backgroundColor: colors.white,
  },
});

export default styles;
