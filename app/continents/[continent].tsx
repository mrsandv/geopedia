import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";
import { router, useLocalSearchParams } from "expo-router";

type TCountry = {
  code: string;
  name: string;
  emoji: string;
};

type TData = {
  countries: TCountry[];
};

const Countries = () => {
  const { continent } = useLocalSearchParams<{ continent: string }>();
  console.log(continent);
  const GET_COUNTRIES = gql`
    query Countries($code: String) {
      countries(filter: { continent: { eq: $code } }) {
        code
        name
        emoji
      }
    }
  `;

  const { loading, error, data } = useQuery<TData>(GET_COUNTRIES, {
    variables: { code: continent },
  });

  if (loading) return <Text>Cargando…</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const countries = data?.countries ?? [];

  return (
    <View>
      <FlatList
        data={countries}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/countries/${item.code}`)}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.code}
      />
    </View>
  );
};

export default Countries;
