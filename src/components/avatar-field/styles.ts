import { StyleSheet } from "react-native";

import { spacing } from "@/constants/theme";

const styles = StyleSheet.create({
  control: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xl,
  },
  actions: {
    flex: 1,
    flexDirection: "row",
    gap: spacing.md,
  },
  action: {
    flex: 1,
  },
});

export default styles;
