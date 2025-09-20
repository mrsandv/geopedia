import { StatusBar, StyleSheet, Text, View } from "react-native";
import { useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";
import { useLocalSearchParams } from "expo-router";

type TCountry = {
  country: {
    code: string;
    name: string;
    emoji: string;
    capital: string;
    continent: {
      name: string;
    }
    currencies: string[];
    languages: {
      name: string;
    }[];
    native: string;
  }
}

const Countries = () => {
  const { countryCode } = useLocalSearchParams<{ countryCode: string }>();
  const GET_COUNTRY = gql`
    query Country($code: ID!) {
      country(code: $code) {
        name
        emoji
        capital
        continent{
          name
        }
        currencies
        languages{
          name
        }
        native
      }
    }
  `;

  const { loading, error, data } = useQuery<TCountry>(GET_COUNTRY, {
    variables: { code: countryCode },
  });

  if (loading) return <Text>Cargando…</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const country = data?.country
  if (!country) return <Text>No se encontró el país</Text>

  return (
    <View>
      <Text>{country.name}</Text>
      <Text>{country.capital}</Text>
      <Text>{country.continent.name}</Text>
      <Text>{country.currencies.join(", ")}</Text>
      <Text>{country.languages.map(lang => lang.name).join(", ")}</Text>
      <Text>{country.native}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
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