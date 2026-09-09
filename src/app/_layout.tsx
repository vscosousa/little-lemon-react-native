import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";

import { fonts } from "@/constants/theme";
import { UserProvider, useUser } from "@/context/user-context";

/**
 * Loads app fonts, wires up safe-area and user context providers, and renders the app.
 * @returns The app root, or `null` while fonts are still loading.
 */
export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    [fonts.karla.regular]: require("../../assets/fonts/Karla-Regular.ttf"),
    [fonts.karla.medium]: require("../../assets/fonts/Karla-Medium.ttf"),
    [fonts.karla.bold]: require("../../assets/fonts/Karla-Bold.ttf"),
    [fonts.karla.extraBold]: require("../../assets/fonts/Karla-ExtraBold.ttf"),
    [fonts.markazi
      .regular]: require("../../assets/fonts/MarkaziText-Regular.ttf"),
    [fonts.markazi
      .medium]: require("../../assets/fonts/MarkaziText-Medium.ttf"),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <UserProvider>
        <RootNavigator />
      </UserProvider>
    </SafeAreaProvider>
  );
}

/**
 * Routes to onboarding or the profile screen based on onboarding state.
 * @returns The navigation stack, or `null` while user state is still loading.
 */
function RootNavigator() {
  const { isLoading, isOnboarded } = useUser();

  if (isLoading) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!isOnboarded}>
        <Stack.Screen name="index" />
      </Stack.Protected>

      <Stack.Protected guard={isOnboarded}>
        <Stack.Screen name="profile" />
      </Stack.Protected>
    </Stack>
  );
}
