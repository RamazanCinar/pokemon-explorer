import Image from "next/image";

import { PokemonCardProps } from "../types";

const PokemonCard: React.FC<PokemonCardProps> = ({
  id,
  name,
  image,
  type,
  isFavorite,
  toggleFavorite,
}) => {
  return (
    <div>
      <Image src={image} alt={name} width={100} height={100} />
      <p>#{id}</p>
      <h2>{name}</h2>
      <p>{type}</p>
      <button onClick={toggleFavorite}>
        {isFavorite ? "Remove Favorite" : "Add Favorite"}
      </button>
    </div>
  );
};

export default PokemonCard;
