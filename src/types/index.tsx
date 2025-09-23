export type TContinent = {
  code: string;
  name: string;
};

export type TCountry = {
  code: string;
  name: string;
  emoji?: string;
};

export type TDetailedCountry = {
  code: string;
  name: string;
  emoji: string;
  capital: string;
  continent: {
    name: string;
    code: string;
  };
  currencies: string[];
  languages: {
    name: string;
  }[];
  native: string;
};
