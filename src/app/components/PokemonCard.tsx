import Image from "next/image";

export interface PokemonCardProps {
  id: number;
  name: string;
  image: string;
  type: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ id, name, image, type }) => {
  return (
    <div>
      <Image src={image} alt={name} width={100} height={100} />
      <p>#{id}</p>
      <h2>{name}</h2>
      <p>{type}</p>
    </div>
  );
};

export default PokemonCard;
