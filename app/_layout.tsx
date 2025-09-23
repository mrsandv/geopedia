import { ApolloProvider } from "@apollo/client/react";
import { Stack, useRouter, useSegments } from "expo-router";
import {
  Appbar,
  IconButton,
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
} from "react-native-paper";
import { useState } from "react";
import { client } from "utils/apollo";
import { StatusBar } from "expo-status-bar";

type TTheme = "light" | "dark" | "system";

const RootLayout = () => {
  const router = useRouter();
  const segments = useSegments();
  const canGoBack = segments.length >= 1;

  const [theme, setTheme] = useState<TTheme>("light");

  const handleThemeToggle = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <PaperProvider theme={theme === "dark" ? MD3DarkTheme : MD3LightTheme}>
      <ApolloProvider client={client}>
        <Appbar.Header>
          {canGoBack && <Appbar.BackAction onPress={() => router.back()} />}
          <IconButton
            size={24}
            icon="theme-light-dark"
            onPress={handleThemeToggle}
          />
          <Appbar.Content title="Geopedia" />
        </Appbar.Header>
        <StatusBar style="auto" />
        <Stack
          screenOptions={{ headerShown: false, animation: "fade_from_bottom" }}
        />
      </ApolloProvider>
    </PaperProvider>
  );
};

export default RootLayout;
