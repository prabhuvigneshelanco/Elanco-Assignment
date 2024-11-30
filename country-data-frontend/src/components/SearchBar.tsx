type SearchType = {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchType> = ({ value, onChange }) => (
   <div className="mb-10 mx-4">
      <input
         id="search"
         type="text"
         placeholder="Search country by name"
         className="w-full p-2 border border-gray-300 rounded-md"
         value={value}
         onChange={(e) => onChange(e.target.value)}
      />
   </div>
);
