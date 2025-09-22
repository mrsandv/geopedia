import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "favourite_countries";

export type TFavorite = {
  code: string;
  name: string;
  emoji: string;
};

export type TFavourites = TFavorite[];

export const getFavorites = async (): Promise<TFavourites> => {
  const json = await AsyncStorage.getItem(STORAGE_KEY);
  return json ? JSON.parse(json) : [];
};

export const addFavorite = async (country: TFavorite): Promise<string> => {
  const favorites = await getFavorites();
  const exists = favorites.some((c) => c.code === country.code);
  if (!exists) {
    favorites.push(country);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    return "Se agregó el pais a favoritos";
  }
  return "Ya existia este registro.";
};

export const delFavorite = async (code: string) => {
  const favorites = await getFavorites();
  const updated = favorites.filter((c) => c.code !== code);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};
