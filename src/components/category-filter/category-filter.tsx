import { Pressable, ScrollView, Text } from "react-native";

import styles from "./styles";

type CategoryFilterProps = {
  /** The distinct category names to render as pills. */
  categories: string[];
  /** Currently selected categories. An empty set means "show all". */
  selected: Set<string>;
  /** Called with a category when its pill is pressed. */
  onToggle: (category: string) => void;
};

/**
 * Horizontally scrolling row of toggleable category pills.
 *
 * @param props - Available categories, current selection, and toggle callback.
 * @returns The rendered row.
 * @example
 * <CategoryFilter
 *   categories={categories}
 *   selected={selectedCategories}
 *   onToggle={toggleCategory}
 * />
 */
export function CategoryFilter({
  categories,
  selected,
  onToggle,
}: CategoryFilterProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      {categories.map((category) => {
        const isSelected = selected.has(category);

        return (
          <Pressable
            key={category}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
            onPress={() => onToggle(category)}
            style={[styles.pill, isSelected && styles.pillSelected]}
          >
            <Text
              style={[
                styles.label,
                isSelected && styles.labelSelected,
              ]}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
