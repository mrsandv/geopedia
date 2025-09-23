import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useQuery } from "@apollo/client/react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Button, Surface, Snackbar } from "react-native-paper";
import { addFavorite, checkIsAlreadyFavorite } from "utils/storage";
import Loader from "components/Loader";
import Message from "components/Message";
import { TCountry, TDetailedCountry } from "types";
import { GET_COUNTRY } from "utils/querys";
import CountryInfo from "components/CountryInfo";

type TCountryData = {
  country?: TDetailedCountry;
};

const CountryDetail = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isalreadyFav, setIsAlreadyFav] = useState(false);
  const { countryCode } = useLocalSearchParams<{ countryCode: string }>();
  const { loading, error, data } = useQuery<TCountryData>(GET_COUNTRY, {
    variables: { code: countryCode },
  });
  const router = useRouter();

  const checkFavStatus = async (code: string) => {
    const response = await checkIsAlreadyFavorite(code);
    setIsAlreadyFav(response);
  };

  useEffect(() => {
    checkFavStatus(countryCode);
  }, [countryCode]);

  const handleAddFavorite = async (country: TCountry) => {
    const response = await addFavorite({
      name: country.name,
      code: country.code,
      emoji: country.emoji,
    });
    setShowConfirm(true);
    setIsAlreadyFav(true);
    setFeedback(response);
  };

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

  const country = data?.country;

  if (!country) {
    return <Message title="Ups!" description="No se encontró el país" />;
  }

  return (
    <Surface style={styles.container}>
      <CountryInfo
        country={country}
        favoriteAction={
          <Button
            icon="star"
            disabled={isalreadyFav}
            onPress={() => {
              handleAddFavorite(country);
            }}
          >
            Agregar a favoritos
          </Button>
        }
      />
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
});

export default CountryDetail;
