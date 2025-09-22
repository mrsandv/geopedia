import { TCountry } from "types";

export const filterCountries = (dataset: TCountry[], search: string) =>
  dataset.filter((country: TCountry) => {
    const query = search.toLowerCase();
    return (
      country.name.toLowerCase().includes(query) ||
      (country.emoji?.toLowerCase() ?? "").includes(query) ||
      country.code.toLowerCase().includes(query)
    );
  });
