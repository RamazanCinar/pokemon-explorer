import Image from "next/image";
import { PokemonCardProps } from "../types";
import React from "react";

const getHoverColorClass = (type: string): string => {
  const typeKey = type.split(" ")[0].toLowerCase();
  switch (typeKey) {
    case "grass":
      return "hover:bg-green-500";
    case "fire":
      return "hover:bg-red-500";
    case "water":
      return "hover:bg-blue-500";
    case "bug":
      return "hover:bg-green-400";
    case "poison":
      return "hover:bg-purple-500";
    case "flying":
      return "hover:bg-blue-300";
    default:
      return "hover:bg-gray-400";
  }
};

const PokemonCard: React.FC<PokemonCardProps> = ({
  id,
  name,
  image,
  type,
  isFavorite,
  toggleFavorite,
}) => {
  const hoverColorClass = getHoverColorClass(type);

  return (
    <div
      className={`pokemon-card bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 w-64 md:w-72 mb-6 mx-auto ${hoverColorClass}`}
    >
      <div className="relative w-full h-40 md:h-48 bg-white flex items-center justify-center">
        <Image
          src={image}
          alt={name}
          layout="fill"
          objectFit="contain"
          className="p-4"
        />
      </div>
      <div className={`p-4 bg-gray-200 ${hoverColorClass}`}>
        <p className="text-sm text-gray-500">#{id}</p>
        <h2 className="text-xl font-bold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-600">{type}</p>
        <button
          onClick={toggleFavorite}
          className={`mt-4 w-full py-1 px-2 rounded-lg text-sm font-medium transition-colors ${
            isFavorite
              ? "bg-red-900 text-white hover:bg-red-800"
              : "bg-gray-400 text-white hover:bg-gray-700"
          }`}
        >
          {isFavorite ? "Remove Favorite" : "Add Favorite"}
        </button>
      </div>
    </div>
  );
};

export default PokemonCard;
