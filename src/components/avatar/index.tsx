import { Image, Text, View } from "react-native";

import styles from "./styles";

type AvatarProps = {
  /** Image to render. Falls back to `initials` when unset. */
  imageUri?: string | null;
  /** Fallback text shown when no `imageUri` is given. Defaults to `"LL"`. */
  initials?: string;
  /** Rendered diameter. Defaults to `"large"`. */
  size?: "small" | "large";
};

/**
 * Profile image, falling back to initials when no image is set.
 * @returns The rendered avatar.
 * @example
 * <Avatar imageUri={profile.imageUri} initials="JD" size="small" />
 */
export function Avatar({
  imageUri,
  initials = "LL",
  size = "large",
}: AvatarProps) {
  const isSmall = size === "small";

  return (
    <View style={[styles.avatar, isSmall && styles.smallAvatar]}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <Text style={[styles.initials, isSmall && styles.smallInitials]}>
          {initials || "LL"}
        </Text>
      )}
    </View>
  );
}
