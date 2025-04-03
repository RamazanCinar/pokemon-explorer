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
    <div>
      <h1>Favorite Pokémons</h1>
      <div>
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
    </div>
  );
}
