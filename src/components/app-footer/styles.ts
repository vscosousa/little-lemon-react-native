import { StyleSheet } from "react-native";

import {
  colors,
  shadowElevation,
  shadowOpacity,
  spacing,
} from "@/constants/theme";

const styles = StyleSheet.create({
  footer: {
    zIndex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: colors.white,
  },
  elevated: {
    shadowColor: colors.dark,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: shadowOpacity.sm,
    shadowRadius: shadowElevation.sm,
    elevation: shadowElevation.sm,
  },
});

export default styles;
