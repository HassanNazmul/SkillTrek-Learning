"use client";

import React from "react";
import ModuleSearch from "@/components/Admin/ModuleCRUD/CreateModule/ModuleSearch";
import ModuleSelection from "@/components/Admin/ModuleCRUD/CreateModule/ModuleSelection";
import ModuleForm from "@/components/Admin/ModuleCRUD/CreateModule/ModuleForm";
import { motion, AnimatePresence } from "framer-motion";
import useModuleRegistration from "./useModuleRegistration";

const ModuleRegistration = () => {
    const {
        searchTerm,
        suggestions,
        modules,
        filteredModules,
        selectedItem,
        isDropdownOpen,
        isLoading,
        showAddNew,
        isPopupOpen,
        defaultModuleName,
        searchRef,
        title,
        description,
        url,
        setSearchTerm,
        handleSearchChange,
        handleSelectItem,
        handleRemoveItem,
        handleAddNewTopic,
        handleFormSubmit,
        handleOpenPopup,
        handleCreateModule,
        setTitle,
        setDescription,
        setUrl,
        setIsDropdownOpen,
        setIsPopupOpen,
        pageTransition,
        shake,
        isValid,
        buttonState,
        handleInputChange,
        handleFormSubmitWithValidation,
        isValidationTriggered,
        shakeModuleSelection,
    } = useModuleRegistration();

    return (
        <AnimatePresence>
            <motion.div
                className="h-auto bg-white"
                variants={pageTransition}
                initial="initial"
                animate="animate"
                exit="exit"
            >
                <div className="h-auto p-6 flex flex-col items-center">
                    <div className="w-full max-w-3xl space-y-6">
                        <div className="relative mb-6" ref={searchRef}>
                            <ModuleSearch
                                searchTerm={searchTerm}
                                filteredModules={filteredModules}
                                handleSearchChange={handleSearchChange}
                                setIsDropdownOpen={setIsDropdownOpen}
                                isDropdownOpen={isDropdownOpen}
                                isLoading={isLoading}
                                handleSelectItem={handleSelectItem}
                                handleOpenPopup={handleOpenPopup}
                                isPopupOpen={isPopupOpen}
                                setIsPopupOpen={setIsPopupOpen}
                                handleCreateModule={handleCreateModule}
                                defaultModuleName={defaultModuleName}
                            />

                        </div>
                        <ModuleSelection
                            selectedItem={selectedItem}
                            handleRemoveItem={handleRemoveItem}
                            isValidationTriggered={isValidationTriggered}
                            shakeModuleSelection={shakeModuleSelection}
                        />
                        <ModuleForm
                            title={title}
                            description={description}
                            url={url}
                            setTitle={setTitle}
                            setDescription={setDescription}
                            setUrl={setUrl}
                            handleFormSubmit={handleFormSubmit}
                            shake={shake}
                            isValid={isValid}
                            buttonState={buttonState}
                            handleInputChange={handleInputChange}
                            handleFormSubmitWithValidation={handleFormSubmitWithValidation}
                        />

                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ModuleRegistration;
