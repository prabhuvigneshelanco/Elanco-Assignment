type SearchBarProps = {
  searchType: string;
  setSearchType: (type: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

export default function SearchBar({
  searchType,
  setSearchType,
  searchQuery,
  setSearchQuery,
}: SearchBarProps) {
  return (
    <div className="flex gap-2 items-center">
      {/* Search Type Dropdown */}
      <select
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
      >
        <option value="name">Name</option>
        <option value="capital">Capital</option>
        <option value="timezone">Timezone</option>
      </select>

      {/* Search Input */}
      <input
        type="text"
        placeholder={`Search by ${searchType}`}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
      />
    </div>
  );
}
