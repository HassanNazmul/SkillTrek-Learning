import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ query, onSearch }) => {
    return (
        <div className="mb-6">
            <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-100" />
                <input
                    type="text"
                    placeholder="Search Users"
                    value={query}
                    onChange={(e) => onSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-indigo-100 focus:outline-none focus:ring-1 focus:ring-blue-300"
                    aria-label="Search users"
                />
            </div>
        </div>
    );
};

export default SearchBar;
