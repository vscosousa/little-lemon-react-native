import { Text } from "react-native";

import styles from "./styles";

/**
 * States what the `*` on required form-field labels means. Render it once per
 * form, after the last field.
 *
 * @returns The rendered note.
 * @example
 * <FormField label="Email" required value={email} onChangeText={setEmail} />
 * <RequiredLegend />
 */
export function RequiredLegend() {
  return <Text style={styles.legend}>Fields marked with * are required</Text>;
}
