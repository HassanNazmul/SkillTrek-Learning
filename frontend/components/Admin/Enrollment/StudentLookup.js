import React from "react";
import { FaSearch } from "react-icons/fa";

const StudentLookup = ({
                           searchTerm,
                           handleSearchChange,
                           setIsDropdownOpen,
                           isDropdownOpen,
                           handleSelectItem,
                           filteredStudents,
                           isLoading,
                           handleFocus,
                           dropdownRef,
                       }) => {
    // Determine if the search term is a numeric value (mobile number search)
    const isMobileSearch = /^\d+$/.test(searchTerm.trim());

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Search Input */}
            <div className="relative flex items-center">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-100" />
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onFocus={handleFocus}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-indigo-100 focus:outline-none focus:ring-1 focus:ring-blue-300"
                    placeholder="Search Student"
                />
            </div>

            {/* Dropdown */}
            {isDropdownOpen && (
                <div
                    className="absolute w-full mt-2 bg-white rounded-lg border border-indigo-100 max-h-80 overflow-y-auto z-50"
                >
                    {isLoading ? (
                        <div className="p-4 text-center text-gray-500">Loading Students</div>
                    ) : filteredStudents.length > 0 ? (
                        <ul className="py-2">
                            {filteredStudents.map((student) => (
                                <li
                                    key={student.id}
                                    onClick={() => handleSelectItem(student)}
                                    className="mx-2 mb-1.5 px-4 py-3 cursor-pointer rounded-lg bg-gray-50 flex items-center justify-between transition-shadow duration-200 hover:bg-indigo-50"
                                >
                                    <span className="font-medium text-md text-gray-900">
                                        {student.full_name}
                                    </span>
                                    {/* Dynamically show mobile or email based on search type */}
                                    <span className="text-sm text-gray-400 ml-4">
                                        {isMobileSearch ? student.mobile : student.email}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="p-4 text-center text-gray-500">No students found</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default StudentLookup;
