import { StyleSheet } from "react-native";

import {
  borderWidth,
  colors,
  fonts,
  fontSizes,
  radius,
} from "@/constants/theme";

const styles = StyleSheet.create({
  avatar: {
    width: 76,
    height: 76,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderWidth: borderWidth.sm,
    borderColor: colors.light,
    borderRadius: radius.full,
    backgroundColor: colors.light,
  },
  smallAvatar: {
    width: 42,
    height: 42,
    borderWidth: 0,
    borderRadius: radius.full,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  initials: {
    color: colors.primaryGreen,
    fontFamily: fonts.karla.extraBold,
    fontSize: fontSizes.xl,
  },
  smallInitials: {
    fontSize: fontSizes.xs,
  },
});

export default styles;
