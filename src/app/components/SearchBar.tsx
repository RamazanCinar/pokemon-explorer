interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search a Pokémon",
}) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="block w-3/4 md:max-w-md mx-auto mt-10 mb-10 rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:gray-200"
    />
  );
};

export default SearchBar;
