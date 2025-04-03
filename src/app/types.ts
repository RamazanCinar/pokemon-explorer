export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
}

export interface PokemonSprite {
  sprites: string;
}

export interface PokemonType {
  pokemon_v2_type: {
    name: string;
  };
}

export interface PokemonAPIResponse {
  id: number;
  name: string;
  pokemon_v2_pokemonsprites: PokemonSprite[];
  pokemon_v2_pokemontypes: PokemonType[];
}

export interface PokemonCardProps {
  id: number;
  name: string;
  image: string;
  type: string;
  isFavorite: boolean;
  toggleFavorite: () => void;
}
