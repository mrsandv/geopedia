import React from "react";
import { FlatList, StyleSheet, StatusBar } from "react-native";
import { useQuery } from "@apollo/client/react";
import { Surface } from "react-native-paper";
import { GET_CONTINENTS } from "utils/querys";
import ListItem from "components/ListElement";
import { TContinent } from "types";
import Loader from "components/Loader";
import Message from "components/Message";

type TData = {
  continents: TContinent[];
};

const Continents = () => {
  let { loading, data, error } = useQuery<TData>(GET_CONTINENTS);

  if (loading) return <Loader />;

  if (error)
    return (
      <Message
        title="Error"
        description={error?.message ?? "Error desconocido"}
      />
    );

  const continents = data?.continents ?? [];

  return (
    <Surface style={styles.container}>
      <FlatList
        data={continents}
        keyExtractor={(item) => item.code}
        contentContainerStyle={{ paddingBottom: 16 }}
        renderItem={({ item }) => (
          <ListItem type="continent" item={{ ...item, emoji: "🌎" }} />
        )}
      />
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    paddingHorizontal: 16,
  },
});

export default Continents;
