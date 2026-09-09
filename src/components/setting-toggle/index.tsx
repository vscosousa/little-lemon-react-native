import { Pressable, Switch, Text, View } from "react-native";

import { colors } from "@/constants/theme";

import styles from "./styles";

type SettingToggleProps = {
  /** The setting's visible label. */
  label: string;
  /** Whether the switch is on. */
  value: boolean;
  /** Called with the new value when the row is pressed or the switch is toggled. */
  onValueChange: (value: boolean) => void;
  /** Shows a bottom divider, for all but the last row in a group. */
  showDivider?: boolean;
};

/**
 * Binary setting/preference row with a label and a switch.
 * @returns The rendered row.
 * @example
 * <SettingToggle
 *   label="Newsletter"
 *   value={draft.notifications.newsletter}
 *   onValueChange={(value) => updateNotification("newsletter", value)}
 * />
 */
export function SettingToggle({
  label,
  value,
  onValueChange,
  showDivider = false,
}: SettingToggleProps) {
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      onPress={() => onValueChange(!value)}
      style={({ pressed }) => [
        styles.row,
        showDivider && styles.divider,
        pressed && styles.pressed,
      ]}
    >
      <Text style={styles.label}>{label}</Text>
      <View style={styles.toggleContainer}>
        <Switch
          accessible={false}
          ios_backgroundColor={colors.light}
          onValueChange={onValueChange}
          pointerEvents="none"
          thumbColor={colors.white}
          trackColor={{ false: colors.light, true: colors.primaryGreen }}
          value={value}
        />
      </View>
    </Pressable>
  );
}
