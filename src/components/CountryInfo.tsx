import { Link } from "expo-router";
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Chip, Divider, Text, useTheme } from "react-native-paper";
import { TDetailedCountry } from "types";

type TCountryInfo = {
  country: TDetailedCountry;
  favoriteAction: ReactNode;
};

const CountryInfo = ({ country, favoriteAction }: TCountryInfo) => {
  const { dark } = useTheme();

  return (
    <Card style={styles.card} mode={dark ? "contained" : "elevated"}>
      <Card.Content>
        <Text
          variant="headlineLarge"
          style={styles.header}
        >{`${country.emoji} ${country.name}`}</Text>
        <Divider style={styles.divider} />
        {favoriteAction}
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
  );
};

const styles = StyleSheet.create({
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

export default CountryInfo;
