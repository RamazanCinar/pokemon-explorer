import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import PokemonCard from "../app/components/PokemonCard";
import { PokemonCardProps } from "@/app/types";

export default {
  title: "Composants/PokemonCard",
  component: PokemonCard,
  argTypes: {
    toggleFavorite: { action: "toggleFavorite" },
  },
} as Meta<typeof PokemonCard>;

const Template: StoryFn<typeof PokemonCard> = (args) => {
  const [isFav, setIsFav] = useState(args.isFavorite);
  const handleToggleFavorite = () => {
    setIsFav(!isFav);
    action("toggleFavorite")(!isFav);
  };

  return (
    <PokemonCard
      {...args}
      isFavorite={isFav}
      toggleFavorite={handleToggleFavorite}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  id: 25,
  name: "Pikachu",
  image:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
  type: "Electric",
  isFavorite: false,
};

export const Favori = Template.bind({});
Favori.args = {
  id: 1,
  name: "Bulbasaur",
  image:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  type: "Grass / Poison",
  isFavorite: true,
};
