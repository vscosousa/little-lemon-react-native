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
 * @returns Elevation flags and scroll/layout event handlers to wire up to a `ScrollView`.
 * @example
 * const {
 *   handleContentSizeChange,
 *   handleScroll,
 *   handleScrollLayout,
 *   isFooterElevated,
 *   isHeaderElevated,
 * } = useScrollElevation();
 *
 * <Header elevated={isHeaderElevated} />
 * <ScrollView
 *   onContentSizeChange={handleContentSizeChange}
 *   onLayout={handleScrollLayout}
 *   onScroll={handleScroll}
 *   scrollEventThrottle={16}
 * />
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

  /** Recomputes header/footer elevation from the latest scroll metrics. */
  function updateElevation() {
    const { contentHeight, offsetY, viewportHeight } = scrollMetrics.current;
    const shouldElevateHeader = offsetY > 1;

    setIsHeaderElevated(shouldElevateHeader);

    if (!contentHeight || !viewportHeight) return;

    const shouldElevateFooter = offsetY + viewportHeight < contentHeight - 1;

    setIsFooterElevated(shouldElevateFooter);
  }

  /**
   * Updates scroll metrics from a ScrollView scroll event.
   * @param event - The native scroll event, passed to `ScrollView`'s `onScroll`.
   */
  function handleScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;

    scrollMetrics.current = {
      contentHeight: contentSize.height,
      offsetY: contentOffset.y,
      viewportHeight: layoutMeasurement.height,
    };
    updateElevation();
  }

  /**
   * Updates the tracked content height when the scrollable content resizes.
   * @param _width - Unused; passed by `ScrollView`'s `onContentSizeChange`.
   * @param height - The new content height.
   */
  function handleContentSizeChange(_width: number, height: number) {
    scrollMetrics.current.contentHeight = height;
    updateElevation();
  }

  /**
   * Updates the tracked viewport height when the ScrollView lays out.
   * @param event - The layout event, passed to `ScrollView`'s `onLayout`.
   */
  function handleScrollLayout(event: LayoutChangeEvent) {
    scrollMetrics.current.viewportHeight = event.nativeEvent.layout.height;
    updateElevation();
  }

  return {
    handleContentSizeChange,
    handleScroll,
    handleScrollLayout,
    isFooterElevated,
    isHeaderElevated,
  };
}
