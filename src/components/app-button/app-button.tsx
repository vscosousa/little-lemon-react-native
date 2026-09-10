import {
  Pressable,
  type StyleProp,
  Text,
  type TextStyle,
  type ViewStyle,
} from "react-native";

import styles from "./styles";

/** Available Little Lemon button color treatments. */
type ButtonVariant = "primary" | "secondary" | "yellow";

type AppButtonProps = {
  /** The button's visible text. */
  label: string;
  /** Called when the button is pressed. */
  onPress: () => void;
  /** Brand color treatment. Defaults to `"primary"`. */
  variant?: ButtonVariant;
  /** Renders at the smaller control size, for secondary/inline actions. */
  compact?: boolean;
  /** Disables press handling and applies the disabled visual state. */
  disabled?: boolean;
  /** Extra style(s) merged onto the pressable container. */
  style?: StyleProp<ViewStyle>;
  /** Extra style(s) merged onto the label text. */
  labelStyle?: StyleProp<TextStyle>;
};

/**
 * Primary, secondary, or yellow brand action button, with an optional compact size.
 *
 * @param props - Button properties.
 * @returns The rendered button.
 * @example
 * <AppButton label="Save changes" variant="yellow" onPress={handleSave} />
 */
export function AppButton({
  label,
  onPress,
  variant = "primary",
  compact = false,
  disabled = false,
  style,
  labelStyle,
}: AppButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        styles[variant],
        compact && styles.compact,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}
    >
      <Text
        style={[
          styles.label,
          variant === "primary" && styles.primaryLabel,
          variant === "secondary" && styles.secondaryLabel,
          compact && styles.compactLabel,
          labelStyle,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}
