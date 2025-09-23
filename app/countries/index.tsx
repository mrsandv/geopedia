import { FlatList, StyleSheet } from "react-native";
import { useQuery } from "@apollo/client/react";
import { useState } from "react";
import { Searchbar, Surface } from "react-native-paper";
import Message from "components/Message";
import { TCountry } from "types";
import { GET_COUNTRIES } from "utils/querys";
import { filterCountries } from "utils/filters";
import Loader from "components/Loader";
import ListItem from "components/ListItem";

type TData = {
  countries: TCountry[];
};

const Countries = () => {
  let { loading, error, data } = useQuery<TData>(GET_COUNTRIES);
  const [search, setSearch] = useState("");

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
        mode="bar"
        style={styles.searchbar}
        placeholder="Buscar país..."
        value={search}
        onChangeText={setSearch}
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
