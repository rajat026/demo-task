import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import type { Pokemon } from "./types";

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonList {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

export const pokemonApiSlice = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getPokemon: builder.query<PokemonList, number>({
      query: (limit) => `pokemon/?limit=${limit}&offset=0`,
      cacheTime: 5 * 60 * 1000, // in milliseconds
      providesTags: ["Pokemon"], // Tag posts data for caching
      cacheOptions: {
        ttl: 300, // Time-to-live (in seconds) for cached data
      },
    }),
  }),
});

export const { useGetPokemonQuery } = pokemonApiSlice;
