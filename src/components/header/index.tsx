import { Image, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Avatar } from "@/components/avatar";

import styles from "./styles";

type HeaderProps = {
  /** Shows the back button in the left slot. */
  showBackButton?: boolean;
  /** Called when the back button is pressed. */
  onBackPress?: () => void;
  /** Shows the small avatar in the right slot. */
  showAvatar?: boolean;
  /** Image passed through to the avatar. */
  avatarUri?: string | null;
  /** Initials fallback passed through to the avatar. */
  avatarInitials?: string;
  /** Shows the bottom shadow, e.g. once content scrolls beneath the header. */
  elevated?: boolean;
};

/**
 * Screen header and top safe area, with an optional back button, avatar, and shadow.
 * @returns The rendered header.
 * @example
 * <Header
 *   showBackButton
 *   onBackPress={() => router.back()}
 *   elevated={isHeaderElevated}
 * />
 */
export function Header({
  showBackButton = false,
  onBackPress,
  showAvatar = false,
  avatarUri,
  avatarInitials,
  elevated = false,
}: HeaderProps) {
  return (
    <SafeAreaView
      edges={["top"]}
      style={[styles.safeArea, elevated && styles.elevated]}
    >
      <View style={styles.header}>
        <View style={styles.sideSlot}>
          {showBackButton && (
            <Pressable
              accessibilityLabel="Go back"
              accessibilityRole="button"
              hitSlop={8}
              onPress={onBackPress}
              style={({ pressed }) => [
                styles.backButton,
                pressed && styles.pressed,
              ]}
            >
              <View style={styles.backIcon} />
            </Pressable>
          )}
        </View>

        <Image
          accessibilityLabel="Little Lemon"
          source={require("../../../assets/images/logo.png")}
          style={styles.logo}
        />

        <View style={[styles.sideSlot, styles.rightSlot]}>
          {showAvatar && (
            <Avatar
              imageUri={avatarUri}
              initials={avatarInitials}
              size="small"
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
