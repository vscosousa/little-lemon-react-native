import type { PropsWithChildren } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "./styles";

type AppFooterProps = PropsWithChildren<{
  /** Shows the top shadow, e.g. while scrollable content remains below the viewport. */
  elevated?: boolean;
}>;

/**
 * Content-sized screen footer with bottom safe-area handling and an optional top shadow.
 *
 * @param props - Footer properties and content.
 * @returns The rendered footer.
 * @example
 * <AppFooter elevated={isFooterElevated}>
 *   <AppButton label="Next" onPress={handleNext} />
 * </AppFooter>
 */
export function AppFooter({ children, elevated = false }: AppFooterProps) {
  return (
    <SafeAreaView
      edges={["bottom"]}
      style={[styles.footer, elevated && styles.elevated]}
    >
      {children}
    </SafeAreaView>
  );
}
