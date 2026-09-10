import { StyleSheet } from "react-native";

import {
  colors,
  fonts,
  fontSizes,
  radius,
  shadowElevation,
  shadowOpacity,
  sizes,
  spacing,
} from "@/constants/theme";

const styles = StyleSheet.create({
  field: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    height: sizes.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.full,
    backgroundColor: colors.white,
    shadowColor: colors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: shadowOpacity.sm,
    shadowRadius: shadowElevation.sm,
    elevation: shadowElevation.sm,
  },
  input: {
    flex: 1,
    alignSelf: "stretch",
    color: colors.dark,
    fontFamily: fonts.karla.regular,
    fontSize: fontSizes.sm,
  },
  clearButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  clearButtonPressed: {
    opacity: 0.6,
  },
});

export default styles;
