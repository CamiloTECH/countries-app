"use client";
import { Country } from "@/models";
import { atom } from "jotai";

export const searchTermAtom = atom("");
export const currentPageAtom = atom(1);
export const selectedRegionAtom = atom("");
export const allCountriesAtom = atom<Country[]>([]);
