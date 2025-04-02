"use client";
import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import PokemonCard from "../components/PokemonCard";

interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
}

interface PokemonSprite {
  sprites: string;
}

interface PokemonType {
  pokemon_v2_type: {
    name: string;
  };
}

interface PokemonAPIResponse {
  id: number;
  name: string;
  pokemon_v2_pokemonsprites: PokemonSprite[];
  pokemon_v2_pokemontypes: PokemonType[];
}

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");

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

  const filteredPokemons = pokemons.filter(
    (pokemon) =>
      pokemon.name.toLowerCase().includes(search.toLowerCase()) ||
      pokemon.types.some((type) =>
        type.toLowerCase().includes(search.toLowerCase())
      )
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Pokémon Explorer</h1>
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
          />
        ))}
      </div>
    </div>
  );
}
