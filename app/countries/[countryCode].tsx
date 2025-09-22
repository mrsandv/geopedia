import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useQuery } from "@apollo/client/react";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import {
  Card,
  Chip,
  Divider,
  Text,
  Button,
  Surface,
  useTheme,
  Snackbar,
} from "react-native-paper";
import { addFavorite, TFavorite } from "utils/storage";
import Loader from "components/Loader";
import Message from "components/Message";
import { TDetailedCountry } from "types";
import { GET_COUNTRY } from "utils/querys";

const CountryDetail = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [feedback, setFeedback] = useState("");
  const { countryCode } = useLocalSearchParams<{ countryCode: string }>();
  const { loading, error, data } = useQuery<TDetailedCountry>(GET_COUNTRY, {
    variables: { code: countryCode },
  });
  const { dark } = useTheme();
  const router = useRouter();

  const handleAddFavorite = async (country: TFavorite) => {
    const response = await addFavorite(country);
    setShowConfirm(true);
    setFeedback(response);
  };

  if (loading) return <Loader />;

  if (error)
    return (
      <Message
        title="Error"
        description={error?.message ?? "Error desconocido"}
      />
    );

  const country = data?.country;

  if (!country)
    return <Message title="Ups!" description="No se encontró el país" />;

  return (
    <Surface style={styles.container}>
      <Card style={styles.card} mode={dark ? "contained" : "elevated"}>
        <Card.Content>
          <Text
            variant="headlineLarge"
            style={styles.header}
          >{`${country.emoji} ${country.name}`}</Text>
          <Divider style={styles.divider} />
          <Button
            icon="star"
            onPress={() => {
              handleAddFavorite({
                code: countryCode,
                name: country.name,
                emoji: country.emoji,
              });
            }}
          >
            Agregar a favoritos
          </Button>
          <Divider style={styles.divider} />
          <Text>
            <Text style={styles.bold}>Código de país:</Text>
            {country.code || "N/A"}
          </Text>
          <Divider style={styles.divider} />

          <Text style={styles.bold}>
            Continente:{" "}
            <Link
              style={styles.link}
              href={`/continents/${country.continent.code}`}
            >
              {country.continent.name || "N/A"}
            </Link>
          </Text>
          <Divider style={styles.divider} />
          <Text>
            <Text style={styles.bold}>Capital:</Text> {country.capital || "N/A"}
          </Text>
          <Divider style={styles.divider} />
          <Text>
            <Text style={styles.bold}>Nombre nativo:</Text>{" "}
            {country.native || "N/A"}
          </Text>
          <Divider style={styles.divider} />
          <Text style={styles.bold}>Monedas:</Text>
          <View style={styles.chipContainer}>
            {country.currencies.map((cur) => {
              return !cur ? (
                <Text key="no-currency">N/A</Text>
              ) : (
                <Chip key={cur} style={styles.chip}>
                  {cur}
                </Chip>
              );
            })}
          </View>
          <Divider style={styles.divider} />
          <Text style={styles.bold}>Idiomas:</Text>
          <View style={styles.chipContainer}>
            {country.languages.length !== 0 ? (
              country.languages.map((lang) => {
                return !lang.name ? (
                  <Text key="no-language">N/A</Text>
                ) : (
                  <Chip key={lang.name} style={styles.chip}>
                    {lang.name}
                  </Chip>
                );
              })
            ) : (
              <Text>N/A</Text>
            )}
          </View>
        </Card.Content>
      </Card>
      <Snackbar
        visible={showConfirm}
        onDismiss={() => setShowConfirm(!showConfirm)}
        action={{
          label: "Ir a favoritos",
          onPress: () => {
            router.push("/favorites/");
          },
        }}
      >
        {feedback}
      </Snackbar>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  bold: {
    fontWeight: "600",
  },
  card: {
    elevation: 4,
    borderRadius: 12,
    paddingBottom: 16,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 8,
  },
  header: { textAlign: "center" },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  divider: {
    marginVertical: 12,
  },
  link: {
    color: "#8105dfff",
  },
});

export default CountryDetail;
