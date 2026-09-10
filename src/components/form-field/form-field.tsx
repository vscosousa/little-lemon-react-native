import { type ComponentProps, useState } from "react";
import { TextInput } from "react-native";
import { MaskedTextInput } from "react-native-mask-text";

import { FormControl } from "@/components/form-control/form-control";
import { colors } from "@/constants/theme";

import styles from "./styles";

type FormFieldProps = ComponentProps<typeof TextInput> & {
  /** The field's visible label. */
  label: string;
  /** `react-native-mask-text` mask pattern, e.g. `"(999) 999-9999"`. Renders a masked input when set. */
  mask?: string;
  /** Marks the field as required with `*`; explain it on the screen with `RequiredLegend`. */
  required?: boolean;
};

/**
 * Labeled text input, optionally mask-formatted, with shared focus styling.
 *
 * Native `TextInput` properties are forwarded to the rendered plain or masked
 * input, while accessibility and brand-color defaults are supplied centrally.
 *
 * @param props - Label, optional mask, required marker, and text-input properties.
 * @returns The rendered field.
 * @example
 * <FormField
 *   label="Phone number"
 *   mask="(999) 999-9999"
 *   value={draft.phoneNumber}
 *   onChangeText={(formatted) => updateField("phoneNumber", formatted)}
 *   keyboardType="phone-pad"
 * />
 */
export function FormField({
  label,
  mask,
  required = false,
  onChangeText,
  onFocus,
  onBlur,
  ...inputProps
}: FormFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const sharedProps = {
    ...inputProps,
    accessibilityLabel:
      inputProps.accessibilityLabel ?? (required ? `${label}, required` : label),
    placeholderTextColor:
      inputProps.placeholderTextColor ?? colors.primaryGreen,
    selectionColor: inputProps.selectionColor ?? colors.primaryGreen,
    clearButtonMode: inputProps.clearButtonMode ?? ("while-editing" as const),
    onFocus: (event: Parameters<NonNullable<typeof onFocus>>[0]) => {
      setIsFocused(true);
      onFocus?.(event);
    },
    onBlur: (event: Parameters<NonNullable<typeof onBlur>>[0]) => {
      setIsFocused(false);
      onBlur?.(event);
    },
    style: [styles.control, styles.input, isFocused && styles.inputFocused],
  };

  return (
    <FormControl label={label} required={required}>
      {mask ? (
        <MaskedTextInput
          {...sharedProps}
          mask={mask}
          onChangeText={(text) => onChangeText?.(text)}
        />
      ) : (
        <TextInput {...sharedProps} onChangeText={onChangeText} />
      )}
    </FormControl>
  );
}
