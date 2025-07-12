"use client";

import { FC, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge, Button } from "@/components/ui";
import { Skeleton } from "@/components/ui/skeleton";
import { CountryDetail as CountryModel } from "@/models";
import { getCountryDetail } from "@/services";

interface Props {
  countryCode: string;
}

const CountryDetail: FC<Props> = ({ countryCode }) => {
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState<CountryModel | null>(null);

  useEffect(() => {
    setLoading(true);
    getCountryDetail(countryCode)
      .then((data) => setCountry(data))
      .catch(() => setCountry(null))
      .finally(() => setLoading(false));
  }, [countryCode]);

  if (loading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-10 w-20" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-10">
          <Skeleton className="aspect-[3/2] w-full" />
          <div className="space-y-6">
            <Skeleton className="h-8 w-48" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-4 w-full" />
                ))}
              </div>
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-4 w-full" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!country) {
    return (
      <div className="space-y-8">
        <Link href="/">
          <Button variant="outline" className="gap-2 bg-transparent">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
        <div className="text-center py-10">
          <p className="text-muted-foreground">Country not found.</p>
        </div>
      </div>
    );
  }

  const formatPopulation = (population: number) => {
    return population.toLocaleString();
  };

  const getNativeName = () => {
    if (!country.name.nativeName) return country.name.common;
    const nativeNames = Object.values(country.name.nativeName).pop();
    if (!nativeNames) return country.name.common;
    return nativeNames.common;
  };

  const getCurrencies = () => {
    if (!country.currencies) return "N/A";
    return Object.values(country.currencies)
      .map((currency) => currency.name)
      .join(", ");
  };

  const getLanguages = () => {
    if (!country.languages) return "N/A";
    return Object.values(country.languages).join(", ");
  };

  return (
    <div className="space-y-8">
      <Link href="/">
        <Button variant="outline" className="gap-2 bg-transparent">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-10">
        <div className="aspect-[3/2] relative border border-input rounded-lg overflow-hidden">
          <Image
            fill
            src={country.flags.svg || country.flags.png}
            alt={country.flags.alt || country.name.common}
            crossOrigin="anonymous"
            className="object-cover rounded-lg"
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{country.name.common}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Native Name:</span>{" "}
                {getNativeName()}
              </p>
              <p>
                <span className="font-semibold">Population:</span>{" "}
                {formatPopulation(country.population)}
              </p>
              <p>
                <span className="font-semibold">Region:</span> {country.region}
              </p>
              <p>
                <span className="font-semibold">Sub Region:</span>{" "}
                {country.subregion || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Capital:</span>{" "}
                {country.capital?.[0] || "N/A"}
              </p>
            </div>

            <div className="space-y-2">
              <p>
                <span className="font-semibold">Top Level Domain:</span>{" "}
                {country.tld?.[0] || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Currencies:</span>{" "}
                {getCurrencies()}
              </p>
              <p>
                <span className="font-semibold">Languages:</span>{" "}
                {getLanguages()}
              </p>
            </div>
          </div>

          {country.borders && country.borders.length > 0 && (
            <div className="space-y-4 flex gap-2 flex-col md:flex-row">
              <p className="font-semibold min-w-max m-0">Border Countries:</p>
              <div className="flex flex-wrap gap-2">
                {country.borders.map((border) => (
                  <Link key={border.cca3} href={`/country/${border.cca3}`}>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-muted shadow-sm"
                    >
                      {border.name}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
