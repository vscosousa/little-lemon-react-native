import { MaterialIcons } from "@react-native-vector-icons/material-icons";
import { useRef } from "react";
import { Pressable, TextInput } from "react-native";

import { colors } from "@/constants/theme";

import styles from "./styles";

type SearchBarProps = {
  /** The current search text. */
  value: string;
  /** Called on every change. */
  onChangeText: (text: string) => void;
  /** Called when the input gains focus. */
  onFocus?: () => void;
};

/**
 * An always-visible search field with Material icons and a clear action that
 * only appears once there is text to remove.
 *
 * @param props - Controlled search value and change callback.
 * @returns The rendered search field.
 * @example
 * <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
 */
export function SearchBar({ value, onChangeText, onFocus }: SearchBarProps) {
  const inputRef = useRef<TextInput>(null);

  // The whole pill focuses the input, not just the text line inside it.
  return (
    <Pressable
      accessible={false}
      onPress={() => inputRef.current?.focus()}
      style={styles.field}
    >
      <MaterialIcons
        accessible={false}
        color={colors.dark}
        name="search"
        size={22}
      />

      <TextInput
        accessibilityLabel="Search menu"
        onChangeText={onChangeText}
        onFocus={onFocus}
        placeholder="Search menu"
        placeholderTextColor={colors.translucent.dark}
        ref={inputRef}
        style={styles.input}
        value={value}
      />

      {value.length > 0 && (
        <Pressable
          accessibilityLabel="Clear search"
          accessibilityRole="button"
          hitSlop={8}
          onPress={() => onChangeText("")}
          style={({ pressed }) => [
            styles.clearButton,
            pressed && styles.clearButtonPressed,
          ]}
        >
          <MaterialIcons
            accessible={false}
            color={colors.translucent.dark}
            name="cancel"
            size={20}
          />
        </Pressable>
      )}
    </Pressable>
  );
}
