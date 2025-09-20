import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";
import { router } from "expo-router";
import { useState } from "react";

type TCountry = {
  code: string;
  name: string;
  emoji: string;
};

type TData = {
  countries: TCountry[];
};

const Countries = () => {
  const GET_COUNTRIES = gql`
    query Countries {
      countries {
        code
        name
        emoji
      }
    }
  `;

  const { loading, error, data } = useQuery<TData>(GET_COUNTRIES);
  const [search, setSearch] = useState("");

  if (loading) return <Text>Cargando…</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const countries = data?.countries ?? [];

  const filteredCountries = countries.filter((country) => {
    return country.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <View>
      <TextInput
        placeholder="Buscar país..."
        value={search}
        onChangeText={setSearch}
        style={styles.input}
      />
      <FlatList
        data={filteredCountries}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/countries/${item.code}`)}
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
  input: {
    borderRadius: 10,
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

export default Countries;
