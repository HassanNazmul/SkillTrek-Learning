import React from "react";
import {FaSearch, FaPlus} from "react-icons/fa";
import NewModulePopup from "@/components/Admin/ModuleCRUD/CreateModule/NewModulePopup";

const ModuleSearch = ({
                          searchTerm,
                          handleSearchChange,
                          setIsDropdownOpen,
                          showAddNew,
                          isDropdownOpen,
                          handleSelectItem,
                          filteredModules,
                          isLoading,
                          isPopupOpen,
                          defaultModuleName,
                          handleOpenPopup,
                          handleCreateModule,
                          setIsPopupOpen,
                      }) => {

    return (
        <div className="relative">
            <div className="relative flex items-center">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-100"/>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onFocus={() => setIsDropdownOpen(true)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-indigo-100 focus:outline-none focus:ring-1 focus:ring-blue-300"
                    placeholder="Search Module"
                    aria-label="Search courses"
                />
                {filteredModules.length === 0 && (
                    <button
                        onClick={handleOpenPopup}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-600 transition-colors duration-200"
                        aria-label="Add new course"
                    >
                        <FaPlus size={20}/>
                    </button>
                )}
            </div>
            {isDropdownOpen && (
                <div
                    className="absolute w-full mt-2 bg-white rounded-lg border border-indigo-100 max-h-80 overflow-y-auto z-50">
                    {isLoading ? (
                        <div className="p-4 text-center text-gray-50">Loading Modules...</div>
                    ) : filteredModules.length > 0 ? (
                        <ul className="py-2">
                            {filteredModules.map((module) => (
                                <li
                                    key={module.id}
                                    onClick={() => handleSelectItem(module)}
                                    className="mx-2 mb-1.5 px-4 py-3 cursor-pointer rounded-lg bg-gray-50 transition-shadow duration-200 hover:bg-indigo-50"
                                >
                                    <span className="block text-gray-800 font-medium">
                                        {module.name}
                                    </span>
                                    <span className="block text-gray-500 text-sm">
                                        {module.description}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="p-4 m-2 rounded-lg bg-gray-50"></div>
                    )}
                </div>
            )}
            <NewModulePopup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                onSubmit={handleCreateModule}
                defaultName={defaultModuleName}
            />
        </div>
    );
};

export default ModuleSearch;
