import { useState } from "react";

interface SearchInterface {
    setSearchTerm: any;
    setSearchType: any;
    setConstructedURL: any;
    searchType: any;
    searchTerm: any;
    constructedURL: any
}

const SearchBar = ({ setSearchTerm, setSearchType, setConstructedURL, searchTerm, searchType, constructedURL }: SearchInterface) => {
    const [debounceTimeout, setDebounceTimeout] = useState<any>(null);

    const onCategoryChange = (e: any) => {
        setSearchType(e.target.value);
        if (searchTerm && e.target.value == 'region') {
            setConstructedURL(`/region/${searchTerm}`);
        } else {
            if (constructedURL) {
                setConstructedURL('');
            }
        }
    }

    const onInputChange = (e: any) => {
        setSearchTerm(e.target.value);

        if (e.target.value && searchType == 'region') {
            
            // Clear previous debounce timeout
            if (debounceTimeout) {
                clearTimeout(debounceTimeout);
            }

            // Set new debounce timeout
            const newTimeout = setTimeout(() => {
                setConstructedURL(`/region/${e.target.value}`);
            }, 300);

            setDebounceTimeout(newTimeout);
        } else {
            if (constructedURL) {
                setConstructedURL('');
            }
        }
    }

    return (
        <div>
            <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                Country
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">

                <input
                    id="country"
                    name="country"
                    type="text"
                    placeholder="Search here..."
                    onChange={onInputChange}
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                    <label htmlFor="type" className="sr-only">
                        type
                    </label>
                    <select
                        id="type"
                        name="type"
                        onChange={onCategoryChange}
                        className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    >
                        <option value={"all"}>All</option>
                        <option value={"region"}>Region</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default SearchBar;