import React from "react";
import { FaSearch } from "react-icons/fa";

const CourseLookup = ({
                          searchTerm,
                          handleSearchChange,
                          setIsDropdownOpen,
                          isDropdownOpen,
                          handleSelectItem,
                          filteredCourses,
                          isLoading,
                          handleFocus,
                          dropdownRef,
                      }) => {
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
                    placeholder="Search Course"
                />
            </div>

            {/* Dropdown */}
            {isDropdownOpen && (
                <div
                    className="absolute w-full mt-2 bg-white rounded-lg border border-indigo-100 max-h-80 overflow-y-auto z-50"
                >
                    {isLoading ? (
                        <div className="p-4 text-center text-gray-500">Loading Courses...</div>
                    ) : filteredCourses.length > 0 ? (
                        <ul className="py-2">
                            {filteredCourses.map((course) => (
                                <li
                                    key={course.id}
                                    onClick={() => handleSelectItem(course)}
                                    className="mx-2 mb-1.5 px-4 py-3 cursor-pointer rounded-lg bg-gray-50 transition-shadow duration-200 hover:bg-indigo-50"
                                >
                                    <span className="block text-gray-800 font-medium">
                                        {course.name}
                                    </span>
                                    <span className="block text-gray-500 text-sm">
                                        {course.description}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="p-4 text-center text-gray-500">No courses found</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CourseLookup;
