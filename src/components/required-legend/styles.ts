import { StyleSheet } from "react-native";

import { colors, fonts, fontSizes, lineHeights } from "@/constants/theme";

const styles = StyleSheet.create({
  legend: {
    color: colors.dark,
    fontFamily: fonts.karla.regular,
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
  },
});

export default styles;
