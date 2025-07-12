import { CountryDetail } from "@/models";

const formattedBorder = (data: CountryDetail[]) => {
  return data.map((country) => ({
    name: country.name.common,
    cca3: country.cca3,
  }));
};

export const getBorderCountries = async (borders: string[]) => {
  try {
    const parseBorders = borders.join(",");
    const endPoint = `https://restcountries.com/v3.1/alpha?codes=${parseBorders}&fields=name,cca3`;
    const response = await fetch(endPoint);
    const data: CountryDetail[] = await response.json();
    return formattedBorder(data);
  } catch (error) {
    console.error("Error fetching country details:", error);
    return [];
  }
};

export const getCountryDetail = async (
  countryCode: string
): Promise<CountryDetail | null> => {
  try {
    const endPoint = `https://restcountries.com/v3.1/alpha/${countryCode}?fields=name,currencies,capital,region,subregion,languages,borders,population,tld,flags`;
    const response = await fetch(endPoint);
    const data = await response.json();
    if (data.borders && data.borders.length > 0) {
      data.borders = await getBorderCountries(data.borders);
    }
    if (data.status || data.message) {
      return null;
    }
    return data;
  } catch (error) {
    console.error("Error fetching country details:", error);
    return null;
  }
};
