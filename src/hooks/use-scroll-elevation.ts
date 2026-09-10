import { useRef, useState } from "react";
import type {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";

/**
 * Derives header/footer shadow visibility from scroll position, per the
 * top-boundary rule: header hides at the top and shows once content scrolls
 * beneath it; footer shows while more content remains below the viewport.
 *
 * @returns Elevation flags and the props to spread onto a `ScrollView`.
 * @example
 * const { isFooterElevated, isHeaderElevated, scrollProps } =
 *   useScrollElevation();
 *
 * <Header elevated={isHeaderElevated} />
 * <ScrollView {...scrollProps} />
 * <AppFooter elevated={isFooterElevated} />
 */
export function useScrollElevation() {
  const [isHeaderElevated, setIsHeaderElevated] = useState(false);
  const [isFooterElevated, setIsFooterElevated] = useState(false);
  const scrollMetrics = useRef({
    contentHeight: 0,
    offsetY: 0,
    viewportHeight: 0,
  });

  function updateElevation() {
    const { contentHeight, offsetY, viewportHeight } = scrollMetrics.current;

    setIsHeaderElevated(offsetY > 1);

    if (!contentHeight || !viewportHeight) return;

    setIsFooterElevated(offsetY + viewportHeight < contentHeight - 1);
  }

  return {
    isFooterElevated,
    isHeaderElevated,
    scrollProps: {
      onContentSizeChange(_width: number, height: number) {
        scrollMetrics.current.contentHeight = height;
        updateElevation();
      },
      onLayout(event: LayoutChangeEvent) {
        scrollMetrics.current.viewportHeight = event.nativeEvent.layout.height;
        updateElevation();
      },
      onScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
        const { contentOffset, contentSize, layoutMeasurement } =
          event.nativeEvent;

        scrollMetrics.current = {
          contentHeight: contentSize.height,
          offsetY: contentOffset.y,
          viewportHeight: layoutMeasurement.height,
        };
        updateElevation();
      },
      scrollEventThrottle: 16,
    },
  };
}
