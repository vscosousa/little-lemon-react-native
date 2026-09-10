import { MaterialIcons } from "@react-native-vector-icons/material-icons";
import { useState } from "react";
import { Image, Text, View } from "react-native";

import { colors } from "@/constants/theme";
import type { MenuItem as MenuItemData } from "@/types/menu";

import styles from "./styles";

type MenuItemProps = {
  /** The menu item to render. */
  item: MenuItemData;
};

/**
 * A single menu row with dish details and a thumbnail that falls back to an
 * accessible placeholder when its remote image cannot be loaded.
 *
 * @param props - Menu-row properties.
 * @param props.item - The SQLite-backed dish to display.
 * @returns The rendered row.
 * @example
 * <MenuItem item={item} />
 */
export function MenuItem({ item }: MenuItemProps) {
  const [failedImageUrl, setFailedImageUrl] = useState<string | null>(null);
  const hasImageError = failedImageUrl === item.imageUrl;

  return (
    <View style={styles.row}>
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      </View>

      {hasImageError ? (
        <View
          accessibilityLabel={`Image unavailable for ${item.name}`}
          accessibilityRole="image"
          style={[styles.thumbnail, styles.thumbnailPlaceholder]}
        >
          <MaterialIcons
            accessible={false}
            color={colors.primaryGreen}
            name="image-not-supported"
            size={32}
          />
        </View>
      ) : (
        <Image
          accessibilityLabel={`${item.name} dish`}
          onError={() => setFailedImageUrl(item.imageUrl)}
          source={{ uri: item.imageUrl }}
          style={styles.thumbnail}
        />
      )}
    </View>
  );
}
