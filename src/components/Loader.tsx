import React from "react";
import { StyleSheet } from "react-native";
import { ActivityIndicator, Surface } from "react-native-paper";

const Loader = () => (
  <Surface style={styles.container}>
    <ActivityIndicator animating={true} size="large" />
  </Surface>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loader;
