"use client";
import { useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import { Pokemon } from "../types";

export default function Favorites() {
  const [favorites, setFavorites] = useState<Pokemon[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const removeFavorite = (pokemon: Pokemon) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== pokemon.id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="container mx-auto py-40">
      <h1 className="text-center text-3xl font-bold text-black my-12">
        Favorite Pokémons
      </h1>
      {favorites.length === 0 ? (
        <p className="text-center text-gray-600">
          You don’t have any favorite Pokémon yet.{" "}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.image}
              type={pokemon.types.join(" ")}
              isFavorite={favorites.some((fav) => fav.id === pokemon.id)}
              toggleFavorite={() => removeFavorite(pokemon)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
