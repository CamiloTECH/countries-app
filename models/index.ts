export interface Country {
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  name: {
    common: string;
    official: string;
    nativeName: {
      [languageCode: string]: {
        official: string;
        common: string;
      };
    };
  };
  cca3: string;
  capital: string[];
  region: string;
  population: number;
}

export interface CountryDetail extends Country {
  subregion: string;
  tld: string[];
  currencies: {
    [currencyCode: string]: {
      name: string;
      symbol: string;
    };
  };
  languages: {
    [languageCode: string]: string;
  };
  borders: { name: string; cca3: string }[];
}
