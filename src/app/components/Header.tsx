import Link from "next/link";

export default function PokemonHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 px-6 bg-[#D32F2F] shadow-md">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-4xl font-bold text-white">Pokémon Explorer</h1>
        <div className="flex gap-6">
          <Link
            href="/pokemon"
            className=" text-black hover:text-white font-bold transition-colors text-2xl px-8 py-6"
          >
            Home
          </Link>
          <Link
            href="/favorites"
            className=" text-black hover:text-white font-bold transition-colors text-2xl px-8 py-6"
          >
            Favorites
          </Link>
        </div>
      </div>
    </header>
  );
}
