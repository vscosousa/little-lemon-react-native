import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { Suspense } from "react";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";

import { fonts } from "@/constants/theme";
import { UserProvider, useUser } from "@/context/user-context";
import { migrateMenuDb } from "@/data/menu-database";

/**
 * Loads bundled fonts and composes the app's safe-area, SQLite, and user-state
 * providers around the root navigator.
 *
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
      <Suspense fallback={null}>
        <SQLiteProvider databaseName="littlelemon.db" onInit={migrateMenuDb} useSuspense>
          <UserProvider>
            <RootNavigator />
          </UserProvider>
        </SQLiteProvider>
      </Suspense>
    </SafeAreaProvider>
  );
}

/**
 * Protects onboarding and signed-in routes using the restored onboarding state.
 *
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
        <Stack.Screen name="homepage" />
        <Stack.Screen name="profile" />
      </Stack.Protected>
    </Stack>
  );
}
