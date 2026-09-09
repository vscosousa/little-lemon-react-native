import type { PropsWithChildren } from "react";
import {
  type StyleProp,
  Text,
  type TextStyle,
  View,
  type ViewStyle,
} from "react-native";

import styles from "./styles";

type FormControlProps = PropsWithChildren<{
  /** The field's visible label. */
  label: string;
  /** Extra style(s) merged onto the field container. */
  containerStyle?: StyleProp<ViewStyle>;
  /** Extra style(s) merged onto the label text. */
  labelStyle?: StyleProp<TextStyle>;
}>;

/**
 * Shared field label and vertical spacing wrapper for form controls.
 * @returns The rendered field wrapper.
 * @example
 * <FormControl label="Avatar">
 *   <Avatar imageUri={imageUri} initials={initials} />
 * </FormControl>
 */
export function FormControl({
  children,
  label,
  containerStyle,
  labelStyle,
}: FormControlProps) {
  return (
    <View style={[styles.field, containerStyle]}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      {children}
    </View>
  );
}
