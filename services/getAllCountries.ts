import { Country } from "@/models";
const endPoint =
  "https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags,cca3";

export const getAllCountries = async (): Promise<Country[]> => {
  try {
    const response = await fetch(endPoint);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
};
