import AsyncStorage from "@react-native-async-storage/async-storage";
import { TCountry } from "types";

const STORAGE_KEY = "favourite_countries";

export const getFavorites = async (): Promise<TCountry[]> => {
  const json = await AsyncStorage.getItem(STORAGE_KEY);
  return json ? JSON.parse(json) : [];
};

export const checkIsAlreadyFavorite = async (
  code: string,
): Promise<boolean> => {
  const favorites = await getFavorites();
  return favorites.some((c) => c.code === code);
};

export const addFavorite = async (country: TCountry): Promise<string> => {
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
