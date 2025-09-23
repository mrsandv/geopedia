import { FlatList, StyleSheet } from "react-native";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  IconButton,
  MD3Colors,
  Searchbar,
  Surface,
} from "react-native-paper";
import { delFavorite, getFavorites } from "utils/storage";
import ListItem from "components/ListItem";
import CustomDialog from "components/Dialog";
import Message from "components/Message";
import { filterCountries } from "utils/filters";
import { TCountry } from "types";

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState<TCountry[]>([]);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [search, setSearch] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<{
    code: string;
    name: string;
  } | null>(null);

  const load = async () => {
    setIsloading(true);
    setFavorites(await getFavorites());
    setIsloading(false);
  };
  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (code: string) => {
    await delFavorite(code);
    load();
  };

  const filteredCountries = useMemo(
    () => filterCountries(favorites, search),
    [search, favorites],
  );

  const handleDeleteConfirmation = (item: TCountry) => {
    setSelectedCountry(item);
    setDialogVisible(true);
  };

  const renderCases = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" />;
    }
    if (filteredCountries.length === 0) {
      const message = search
        ? "No se encontraron registros"
        : "Aún no existen favortitos registrados";
      return <Message title="Ups!" description={message} />;
    }

    return (
      <FlatList
        data={filteredCountries}
        renderItem={({ item }) => (
          <ListItem
            item={item}
            action={
              <IconButton
                mode="contained"
                icon="delete"
                iconColor={MD3Colors.error50}
                size={20}
                onPress={() => handleDeleteConfirmation(item)}
              />
            }
          />
        )}
        keyExtractor={(item) => item.code}
      />
    );
  };

  return (
    <Surface style={styles.container}>
      <Searchbar
        style={styles.searchbar}
        mode="bar"
        placeholder="Buscar país..."
        value={search}
        onChangeText={setSearch}
      />
      {renderCases()}
      <CustomDialog
        title="Confirmar"
        description={
          selectedCountry
            ? `Vas a eliminar el elemento [${selectedCountry.name}] de tus favoritos`
            : ""
        }
        visible={dialogVisible}
        onClose={() => setDialogVisible(false)}
        onAccept={() => {
          if (selectedCountry) handleDelete(selectedCountry.code);
          setDialogVisible(false);
        }}
      />
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

export default FavoritesScreen;
