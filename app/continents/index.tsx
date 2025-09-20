import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";
import { router } from "expo-router";

type TContinent = {
  code: string;
  name: string;
};

type TData = {
  continents: TContinent[];
};

const Continents = () => {
  const GET_CONTINENTS = gql`
    query Continents {
      continents {
        code
        name
      }
    }
  `;

  const { loading, data, error } = useQuery<TData>(GET_CONTINENTS);
  console.log({ loading, data, error });

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Cargando…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  const continents = data?.continents ?? [];

  return (
    <View>
      <FlatList
        data={continents}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              router.push(`/continents/${item.code}`);
            }}
          >
            <Text style={styles.item}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.code}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default Continents;
