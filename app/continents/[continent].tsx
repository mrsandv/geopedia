import { FlatList, StyleSheet } from "react-native";
import { useQuery } from "@apollo/client/react";
import { useLocalSearchParams } from "expo-router";
import { Searchbar, Surface } from "react-native-paper";
import { useState } from "react";
import Loader from "components/Loader";
import Message from "components/Message";
import { filterCountries } from "utils/filters";
import ListItem from "components/ListElement";
import { GET_COUNTRIES_BY_CODE } from "utils/querys";
import { TCountry } from "types";

type TData = {
  countries: TCountry[];
};

const Countries = () => {
  const { continent } = useLocalSearchParams<{ continent: string }>();
  const [search, setSearch] = useState("");

  let { loading, error, data } = useQuery<TData>(GET_COUNTRIES_BY_CODE, {
    variables: { code: continent },
  });

  if (loading) return <Loader />;
  if (error)
    return (
      <Message
        title="Error"
        description={error?.message ?? "Error desconocido"}
      />
    );

  const countries = data?.countries ?? [];

  const filteredCountries = filterCountries(countries, search);

  return (
    <Surface style={styles.container}>
      <Searchbar
        placeholder="Buscar país..."
        value={search}
        onChangeText={setSearch}
        style={styles.searchbar}
      />
      {filteredCountries.length === 0 ? (
        <Message title="Ups!" description="No se encontraron registros" />
      ) : (
        <FlatList
          data={filteredCountries}
          renderItem={({ item }) => <ListItem item={item} />}
          keyExtractor={(item) => item.code}
        />
      )}
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchbar: {
    margin: 10,
  },
});

export default Countries;
