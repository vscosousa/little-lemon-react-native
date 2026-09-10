import { useEffect, useRef, useState } from "react";
import { Animated, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import styles from "./styles";

/** Semantic and visual tones supported by {@link Toast}. */
export type ToastVariant = "success" | "error";

type ToastProps = {
  /** The feedback text to display. */
  message: string;
  /** Called after the toast finishes its exit animation. */
  onDismiss: () => void;
  /** Visual/semantic tone. */
  variant: ToastVariant;
};

const DURATION_MS = 3000;

const indicatorStyles = {
  success: styles.successIndicator,
  error: styles.errorIndicator,
};

/**
 * Brief, non-blocking feedback banner that animates in, auto-dismisses, and animates out.
 *
 * @param props - Toast content, tone, and dismissal callback.
 * @returns The rendered toast.
 * @example
 * {toast && (
 *   <Toast
 *     message={toast.message}
 *     variant={toast.variant}
 *     onDismiss={() => setToast(null)}
 *   />
 * )}
 */
export function Toast({ message, onDismiss, variant }: ToastProps) {
  const insets = useSafeAreaInsets();
  const [progress] = useState(() => new Animated.Value(0));
  const onDismissRef = useRef(onDismiss);

  useEffect(() => {
    onDismissRef.current = onDismiss;
  }, [onDismiss]);

  useEffect(() => {
    Animated.spring(progress, {
      toValue: 1,
      damping: 18,
      stiffness: 180,
      mass: 0.8,
      useNativeDriver: true,
    }).start();

    const timeout = setTimeout(() => {
      Animated.timing(progress, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) onDismissRef.current();
      });
    }, DURATION_MS);

    return () => {
      clearTimeout(timeout);
      progress.stopAnimation();
    };
  }, [progress]);

  return (
    <Animated.View
      accessibilityLiveRegion="polite"
      accessibilityRole="alert"
      pointerEvents="none"
      style={[
        styles.toast,
        {
          top: insets.top + 76,
          opacity: progress,
          transform: [
            {
              translateY: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [-12, 0],
              }),
            },
          ],
        },
      ]}
    >
      <View style={[styles.indicator, indicatorStyles[variant]]} />
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
}
