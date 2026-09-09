import { type ComponentProps, useState } from "react";
import {
  type StyleProp,
  TextInput,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import { MaskedTextInput } from "react-native-mask-text";

import { FormControl } from "@/components/form-control";
import { colors } from "@/constants/theme";

import styles from "./styles";

type FormFieldProps = ComponentProps<typeof TextInput> & {
  /** The field's visible label. */
  label: string;
  /** `react-native-mask-text` mask pattern, e.g. `"(999) 999-9999"`. Renders a masked input when set. */
  mask?: string;
  /** Extra style(s) merged onto the field container. */
  containerStyle?: StyleProp<ViewStyle>;
  /** Extra style(s) merged onto the text input. */
  inputStyle?: StyleProp<TextStyle>;
  /** Extra style(s) merged onto the label text. */
  labelStyle?: StyleProp<TextStyle>;
  /** Called with both the masked and raw text on every change, when `mask` is set. */
  onChangeMaskedText?: (text: string, rawText: string) => void;
};

/**
 * Labeled text input, optionally mask-formatted, with shared focus styling.
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
  containerStyle,
  inputStyle,
  labelStyle,
  onChangeText,
  onChangeMaskedText,
  onFocus,
  onBlur,
  ...inputProps
}: FormFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const sharedProps = {
    ...inputProps,
    accessibilityLabel: inputProps.accessibilityLabel ?? label,
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
    style: [
      styles.control,
      styles.input,
      isFocused && styles.inputFocused,
      inputStyle,
    ],
  };

  return (
    <FormControl
      label={label}
      containerStyle={containerStyle}
      labelStyle={labelStyle}
    >
      {mask ? (
        <MaskedTextInput
          {...sharedProps}
          mask={mask}
          onChangeText={(text, rawText) => {
            onChangeText?.(text);
            onChangeMaskedText?.(text, rawText);
          }}
        />
      ) : (
        <TextInput {...sharedProps} onChangeText={onChangeText} />
      )}
    </FormControl>
  );
}
