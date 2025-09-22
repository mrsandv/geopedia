import { FlatList, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { IconButton, MD3Colors, Searchbar, Surface } from "react-native-paper";
import { delFavorite, getFavorites, TFavourites } from "utils/storage";
import ListItem from "components/ListElement";
import CustomDialog from "components/Dialog";
import Message from "components/Message";
import { filterCountries } from "utils/filters";

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState<TFavourites>([]);
  const [search, setSearch] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<{
    code: string;
    name: string;
  } | null>(null);

  const load = async () => setFavorites(await getFavorites());
  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (code: string) => {
    await delFavorite(code);
    load();
  };

  const filteredCountries = filterCountries(favorites, search);

  return (
    <Surface style={styles.container}>
      <Searchbar
        style={styles.searchbar}
        mode="bar"
        placeholder="Buscar país..."
        value={search}
        onChangeText={setSearch}
      />
      {filteredCountries.length === 0 ? (
        <Message title="Ups!" description="No se encontraron registros" />
      ) : (
        <FlatList
          data={filteredCountries}
          renderItem={({ item }) => (
            <>
              <ListItem
                item={item}
                action={
                  <IconButton
                    mode="contained"
                    icon="delete"
                    iconColor={MD3Colors.error50}
                    size={20}
                    onPress={() => {
                      setSelectedCountry(item);
                      setDialogVisible(true);
                    }}
                  />
                }
              />
            </>
          )}
          keyExtractor={(item) => item.code}
        />
      )}
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
