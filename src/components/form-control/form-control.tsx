import type { PropsWithChildren } from "react";
import { Text, View } from "react-native";

import styles from "./styles";

type FormControlProps = PropsWithChildren<{
  /** The field's visible label. */
  label: string;
}>;

/**
 * Shared field label wrapper for form controls. Parents space fields with `gap`.
 *
 * @param props - Label and child control.
 * @returns The rendered field wrapper.
 * @example
 * <FormControl label="Avatar">
 *   <Avatar imageUri={imageUri} initials={initials} />
 * </FormControl>
 */
export function FormControl({ children, label }: FormControlProps) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      {children}
    </View>
  );
}
