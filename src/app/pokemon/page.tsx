"use client";
import { useState, useEffect } from "react";
import { Pokemon, PokemonAPIResponse, PokemonType } from "../types";
import SearchBar from "../components/SearchBar";
import PokemonCard from "../components/PokemonCard";

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<Pokemon[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const fetchPokemons = async () => {
      const query = `
        query {
          pokemon_v2_pokemon(limit: 10) {
            id
            name
            pokemon_v2_pokemonsprites {
              sprites
            }
            pokemon_v2_pokemontypes {
              pokemon_v2_type {
                name
              }
            }
          }
        }
      `;
      try {
        const response = await fetch("https://beta.pokeapi.co/graphql/v1beta", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        });
        const json = await response.json();
        console.log("GraphQL response:", json);
        const results = json.data.pokemon_v2_pokemon.map(
          (p: PokemonAPIResponse) => {
            let image = "";
            if (p.pokemon_v2_pokemonsprites.length > 0) {
              const sprites = p.pokemon_v2_pokemonsprites[0].sprites;
              image = sprites.front_default;
            }
            const types = p.pokemon_v2_pokemontypes.map(
              (t: PokemonType) => t.pokemon_v2_type.name
            );
            return {
              id: p.id,
              name: p.name,
              image,
              types,
            };
          }
        );
        setPokemons(results);
      } catch (error) {
        console.error("Error fetching pokemons:", error);
      }
    };

    fetchPokemons();
  }, []);

  const toggleFavorite = (pokemon: Pokemon) => {
    setFavorites((prev) => {
      const isFav = prev.some((fav) => fav.id === pokemon.id);
      let updatedFavorites;
      if (isFav) {
        updatedFavorites = prev.filter((fav) => fav.id !== pokemon.id);
      } else {
        updatedFavorites = [...prev, pokemon];
      }
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const filteredPokemons = pokemons.filter(
    (pokemon) =>
      pokemon.name.toLowerCase().includes(search.toLowerCase()) ||
      pokemon.types.some((type) =>
        type.toLowerCase().includes(search.toLowerCase())
      )
  );

  return (
    <div className="container mx-auto py-40">
      <SearchBar
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or type..."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            image={pokemon.image}
            type={pokemon.types.join(" ")}
            isFavorite={favorites.some((fav) => fav.id === pokemon.id)}
            toggleFavorite={() => toggleFavorite(pokemon)}
          />
        ))}
      </div>
    </div>
  );
}
