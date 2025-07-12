"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui";
import { Country } from "@/models";
import { FC } from "react";

interface Props {
  country: Country;
}

const CountryCard: FC<Props> = ({ country }) => {
  const formatPopulation = (population: number) => {
    return population.toLocaleString();
  };

  return (
    <Link href={`/country/${country.cca3}`}>
      <Card className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer py-0 shadow-md">
        <div className="aspect-[3/2] relative border-b border-input">
          <Image
            fill
            src={country.flags.svg || country.flags.png}
            alt={country.flags?.alt || country.name.common}
            className="object-cover"
            crossOrigin="anonymous"
          />
        </div>
        <CardContent className="p-6 pt-0">
          <h3 className="font-bold text-lg mb-4">{country.name.common}</h3>
          <div className="space-y-1 text-sm">
            <p>
              <span className="font-semibold">Population:</span>{" "}
              {formatPopulation(country.population)}
            </p>
            <p>
              <span className="font-semibold">Region:</span> {country.region}
            </p>
            <p>
              <span className="font-semibold">Capital:</span>{" "}
              {country.capital?.[0] || "N/A"}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CountryCard;
