"use client";

import { FC, useEffect, useMemo, useState } from "react";

import { Skeleton } from "@/components/ui";
import { Country } from "@/models";
import {
  allCountriesAtom,
  currentPageAtom,
  searchTermAtom,
  selectedRegionAtom,
} from "@/store";
import { useAtom, useAtomValue } from "jotai";
import Pagination from "../Pagination";
import CountryCard from "../CountryCard";
import { getAllCountries } from "@/services";

const itemsPerPage = 8;

const Countries: FC = () => {
  const searchTerm = useAtomValue(searchTermAtom);
  const selectedRegion = useAtomValue(selectedRegionAtom);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const [allCountries, setAllCountries] = useAtom(allCountriesAtom);

  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState<Country[]>(allCountries);

  const totalPages = Math.ceil(countries.length / itemsPerPage);

  const currentCountries = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return countries.slice(startIndex, startIndex + itemsPerPage);
  }, [countries, currentPage]);

  useEffect(() => {
    if (!allCountries || allCountries.length === 0) {
      setLoading(true);
      getAllCountries()
        .then((data) => {
          setAllCountries(data);
          setCountries(data);
        })
        .catch(() => {
          setAllCountries([]);
          setCountries([]);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let filtered = allCountries;

    if (searchTerm) {
      filtered = filtered.filter((country) => {
        return country.name.common
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
    }
    if (selectedRegion && selectedRegion !== "all") {
      filtered = filtered.filter((country) => {
        return country.region === selectedRegion;
      });
    }
    setCurrentPage(1);
    setCountries(filtered);
  }, [searchTerm, selectedRegion, setCurrentPage]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-10 md:p-0 gap-6">
        {Array.from({ length: itemsPerPage }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-40 w-full" />
            <div className="space-y-2 p-4">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-3 w-2/3" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {countries.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No countries found matching your criteria.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-10 md:p-0 gap-6">
            {currentCountries.map((country) => (
              <CountryCard key={country.cca3} country={country} />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Countries;
