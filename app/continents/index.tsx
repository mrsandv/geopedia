import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { useQuery } from "@apollo/client/react";
import { Surface } from "react-native-paper";
import { GET_CONTINENTS } from "utils/querys";
import ListItem from "components/ListItem";
import { TContinent } from "types";
import Loader from "components/Loader";
import Message from "components/Message";

type TData = {
  continents: TContinent[];
};

const Continents = () => {
  let { loading, data, error } = useQuery<TData>(GET_CONTINENTS);

  if (loading) {
    return <Loader />;
  }

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
  },
});

export default Continents;
