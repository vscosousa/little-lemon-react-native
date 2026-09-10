import { router, usePathname } from "expo-router";
import { Image, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Avatar } from "@/components/avatar/avatar";

import styles from "./styles";

type HeaderProps = {
  /** Shows the back button in the left slot. */
  showBackButton?: boolean;
  /** Shows the small avatar in the right slot. */
  showAvatar?: boolean;
  /** Image passed through to the avatar. */
  avatarUri?: string | null;
  /** Initials fallback passed through to the avatar. */
  avatarInitials?: string;
  /** Shows the bottom shadow, e.g. once content scrolls beneath the header. */
  elevated?: boolean;
  /**
   * `"light"` swaps to a green background and white logo/icons, for sitting
   * directly on top of matching content (e.g. before a screen's hero has
   * scrolled away). Defaults to `"dark"`, the standard white header.
   */
  variant?: "dark" | "light";
};

/**
 * Screen header and top safe area, with an optional back button, avatar, and shadow.
 *
 * @param props - Header navigation, avatar, elevation, and color-variant options.
 * @returns The rendered header.
 * @example
 * <Header showBackButton elevated={isHeaderElevated} />
 */
export function Header({
  showBackButton = false,
  showAvatar = false,
  avatarUri,
  avatarInitials,
  elevated = false,
  variant = "dark",
}: HeaderProps) {
  const isOnProfile = usePathname() === "/profile";
  const isLight = variant === "light";
  const pressedStyle = isLight ? styles.pressedLight : styles.pressed;

  return (
    <SafeAreaView
      edges={["top"]}
      style={[
        styles.safeArea,
        isLight && styles.safeAreaLight,
        elevated && styles.elevated,
      ]}
    >
      <View style={styles.header}>
        <View style={styles.sideSlot}>
          {showBackButton && (
            <Pressable
              accessibilityLabel="Go back"
              accessibilityRole="button"
              hitSlop={8}
              onPress={() => router.canGoBack() && router.back()}
              style={({ pressed }) => [
                styles.backButton,
                pressed && pressedStyle,
              ]}
            >
              <View style={[styles.backIcon, isLight && styles.backIconLight]} />
            </Pressable>
          )}
        </View>

        <Image
          accessibilityLabel="Little Lemon"
          source={
            isLight
              ? require("../../../assets/images/logo-light.png")
              : require("../../../assets/images/logo.png")
          }
          style={styles.logo}
        />

        <View style={[styles.sideSlot, styles.rightSlot]}>
          {showAvatar && (
            <Pressable
              accessibilityLabel="View profile"
              accessibilityRole="button"
              disabled={isOnProfile}
              hitSlop={8}
              onPress={() => router.navigate("/profile")}
              style={({ pressed }) => pressed && pressedStyle}
            >
              <Avatar
                imageUri={avatarUri}
                initials={avatarInitials}
                size="small"
              />
            </Pressable>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
