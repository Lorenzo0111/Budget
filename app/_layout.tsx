import { ThemeProvider, useTheme } from "@/components/Theme";
import { Text } from "@/components/Themed";
import migrations from "@/drizzle/migrations";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { drizzle } from "drizzle-orm/expo-sqlite/driver";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { openDatabaseSync } from "expo-sqlite";
import { useEffect } from "react";
import { View } from "react-native";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";

import "react-native-reanimated";
import "../assets/global.css";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export const expo = openDatabaseSync("db.db", { enableChangeListener: true });
export const db = drizzle(expo);

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <RootLayoutNav />
    </ThemeProvider>
  );
}

function RootLayoutNav() {
  const theme = useTheme();
  const DefaultTheme =
    theme.colorScheme === "dark" ? MD3DarkTheme : MD3LightTheme;
  const { success, error } = useMigrations(db, migrations);
  if (error) {
    return (
      <View>
        <Text>Migration error: {error.message}</Text>
      </View>
    );
  }

  if (!success) {
    return (
      <View>
        <Text>Migration is in progress...</Text>
      </View>
    );
  }

  return (
    <PaperProvider
      theme={{
        ...DefaultTheme,
        roundness: 3,
        colors: {
          ...DefaultTheme.colors,
          ...theme,
          surface: theme.card,
          onSurfaceVariant: theme.placeholders,
          onSurface: theme.text,
        },
      }}
    >
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </PaperProvider>
  );
}
