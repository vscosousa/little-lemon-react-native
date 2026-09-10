import type { PropsWithChildren } from "react";
import { Text, View } from "react-native";

import styles from "./styles";

type FormControlProps = PropsWithChildren<{
  /** The field's visible label. */
  label: string;
  /** Appends `*` to the label; explain it on the screen with `RequiredLegend`. */
  required?: boolean;
}>;

/**
 * Shared field label wrapper for form controls. Parents space fields with `gap`.
 *
 * @param props - Label, required marker, and child control.
 * @returns The rendered field wrapper.
 * @example
 * <FormControl label="Avatar">
 *   <Avatar imageUri={imageUri} initials={initials} />
 * </FormControl>
 */
export function FormControl({
  children,
  label,
  required = false,
}: FormControlProps) {
  return (
    <View>
      <Text style={styles.label}>{required ? `${label} *` : label}</Text>
      {children}
    </View>
  );
}
