import { StyleSheet } from "react-native";

import {
  colors,
  radius,
  shadowElevation,
  shadowOpacity,
  sizes,
  spacing,
} from "@/constants/theme";

const styles = StyleSheet.create({
  safeArea: {
    zIndex: 1,
    backgroundColor: colors.white,
  },
  safeAreaLight: {
    backgroundColor: colors.primaryGreen,
  },
  header: {
    minHeight: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
  },
  elevated: {
    shadowColor: colors.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: shadowOpacity.sm,
    shadowRadius: shadowElevation.sm,
    elevation: shadowElevation.sm,
  },
  sideSlot: {
    width: sizes.sm,
    alignItems: "flex-start",
  },
  rightSlot: {
    alignItems: "flex-end",
  },
  backButton: {
    width: sizes.sm,
    height: sizes.sm,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
  },
  backIcon: {
    width: 12,
    height: 12,
    marginLeft: spacing.xs,
    borderLeftWidth: 2.5,
    borderBottomWidth: 2.5,
    borderColor: colors.primaryGreen,
    borderRadius: radius.xxs,
    transform: [{ rotate: "45deg" }],
  },
  backIconLight: {
    borderColor: colors.white,
  },
  logo: {
    position: "absolute",
    left: "50%",
    width: 132,
    height: 38,
    resizeMode: "contain",
    transform: [{ translateX: -66 }],
  },
  pressed: {
    backgroundColor: colors.light,
  },
  pressedLight: {
    backgroundColor: colors.translucent.dark,
  },
});

export default styles;
