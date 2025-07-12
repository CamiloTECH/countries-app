"use client";

import { Search } from "lucide-react";
import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";

import { searchTermAtom, selectedRegionAtom } from "@/store";
import { useAtom } from "jotai";
import { FC } from "react";
import { useDebouncedCallback } from "use-debounce";

const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

const Filters: FC = () => {
  const [searchTerm, setSearchTerm] = useAtom(searchTermAtom);
  const [selectedRegion, setSelectedRegion] = useAtom(selectedRegionAtom);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearchTerm(value);
  }, 500);

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between">
      <div className="relative flex-1 w-full md:max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          className="pl-10"
          defaultValue={searchTerm}
          placeholder="Search for a country..."
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </div>
      <Select value={selectedRegion} onValueChange={setSelectedRegion}>
        <SelectTrigger className="w-full md:w-48">
          <SelectValue placeholder="Filter by Region" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Regions</SelectItem>
          {regions.map((region) => (
            <SelectItem key={region} value={region}>
              {region}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filters;
