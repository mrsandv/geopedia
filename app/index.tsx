import React from "react";
import { StyleSheet, Image, View } from "react-native";
import { useRouter } from "expo-router";
import { Button, Divider, Surface, Text } from "react-native-paper";

const HomeScreen = () => {
  const router = useRouter();

  return (
    <Surface style={styles.container}>
      <View style={{ alignItems: "center", gap: 10 }}>
        <Image style={styles.logo} source={require("../assets/logo.png")} />
        <Text style={styles.title}>Geopedia</Text>
        <Text style={styles.subtitle}>
          Explora y aprende sobre los paises del mundo y guarda tus favoritos.
        </Text>
      </View>
      <View style={styles.buttons}>
        <Button mode="contained" onPress={() => router.push("/continents/")}>
          Contientes
        </Button>
        <Button mode="contained" onPress={() => router.push("/countries/")}>
          Países
        </Button>
        <Button mode="contained" onPress={() => router.push("/favorites/")}>
          Favoritos
        </Button>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    justifyContent: "space-between",
  },
  logo: {
    height: 300,
    width: 300,
    borderRadius: 1000,
    marginTop: 50,
    alignSelf: "center",
  },
  title: { fontWeight: "bold", fontSize: 32, marginBottom: 10 },
  subtitle: { textAlign: "center", paddingHorizontal: 20, fontSize: 24 },
  buttons: {
    gap: 10,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 50,
  },
});

export default HomeScreen;
