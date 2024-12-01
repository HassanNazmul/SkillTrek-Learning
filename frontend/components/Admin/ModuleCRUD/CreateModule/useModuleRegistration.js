import { useState, useEffect, useRef } from "react";
import { FetchModuleData } from "@/components/Admin/ModuleCRUD/CreateModule/lib/FetchModuleData";
import { CreateModule } from "@/components/Admin/ModuleCRUD/CreateModule/lib/CreateModuleAPI";
import { RegisterModule } from "@/components/Admin/ModuleCRUD/CreateModule/lib/RegisterModuleAPI";

const useModuleRegistration = () => {
    // 1. States for Managing Modules and UI
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [modules, setModules] = useState([]);
    const [filteredModules, setFilteredModules] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showAddNew, setShowAddNew] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [defaultModuleName, setDefaultModuleName] = useState("");
    const searchRef = useRef(null);

    // States for Form Data
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");

    // ModuleForm states
    const [shake, setShake] = useState({ title: false, description: false, url: false });
    const [isValid, setIsValid] = useState({ title: true, description: true, url: true });
    const [buttonState, setButtonState] = useState("idle");

    // State for ModuleSelection
    const [isValidationTriggered, setIsValidationTriggered] = useState(false);
    const [shakeModuleSelection, setShakeModuleSelection] = useState(false);


    // 2. Fetching Modules on Mount
    useEffect(() => {
        const fetchModules = async () => {
            setIsLoading(true);
            try {
                const data = await FetchModuleData();
                setModules(data);
                setFilteredModules(data); // For search functionality
            } catch (error) {
                console.error("Failed to fetch modules:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchModules();
    }, []);

    // 3. Filtering Suggestions Dynamically
    useEffect(() => {
        const filterSuggestions = () => {
            const filtered = modules.filter((module) =>
                module?.name?.toLowerCase().includes(searchTerm?.toLowerCase() || "")
            );
            setSuggestions(filtered);
            setShowAddNew(searchTerm?.length > 0 && filtered.length === 0);

            // Update filteredModules for ModuleSearch
            setFilteredModules(filtered);
        };

        // Debounce to optimize performance
        const debounceTimeout = setTimeout(filterSuggestions, 300);
        return () => clearTimeout(debounceTimeout);
    }, [searchTerm, selectedItem, modules]);


    // 4. Event Handlers for ModuleSearch
    const handleOpenPopup = () => {
        setDefaultModuleName(searchTerm.trim());
        setIsPopupOpen(true);
    };

    const handleCreateModule = async (newModule) => {
        try {
            const createdModule = await CreateModule(newModule);
            setModules((prevModules) => [...prevModules, createdModule]); // Append the new module
        } catch (error) {
            console.error("Failed to create module:", error);
        }
    };

    // 5. Event Handlers for ModuleRegistration
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setIsDropdownOpen(true);
    };

    const handleSelectItem = (item) => {
        setSelectedItem(item);
        setSearchTerm("");
        setIsDropdownOpen(false);
    };

    const handleRemoveItem = () => {
        setSelectedItem(null);
    };

    const handleAddNewTopic = async () => {
        try {
            const newTopic = {
                name: searchTerm,
                description: "",
            };
            const createdTopic = await CreateModule(newTopic);
            setModules((prevModules) => [...prevModules, createdTopic]);
            handleSelectItem(createdTopic);
            setShowAddNew(false);
        } catch (error) {
            console.error("Failed to create new topic:", error);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!selectedItem) return;

        try {
            const newModule = {
                title,
                description,
                url,
                module: selectedItem.id,
            };

            const registeredModule = await RegisterModule(newModule);
            setModules((prevModules) => [...prevModules, registeredModule]);
            resetForm();
        } catch (error) {
            console.error("Failed to register module:", error);
        }
    };

    // 6. Utility Functions
    const resetForm = () => {
        setTitle("");
        setDescription("");
        setUrl("");
        setSelectedItem(null);
    };

    // 7. Animation Configuration
    const pageTransition = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    };

    // 8. Form Validation
    const validateField = (field, value) => {
        return field === "url"
            ? /^(https?:\/\/)/.test(value) // URL validation
            : value.trim() !== "";        // Non-empty check for other fields
    };

    // Handle input change and reset validity
    const handleInputChange = (field, value, setTitle, setDescription, setUrl) => {
        if (field === "title") setTitle(value);
        if (field === "description") setDescription(value);
        if (field === "url") setUrl(value);

        // Reset validity when the user interacts with the field
        setIsValid((prev) => ({ ...prev, [field]: true }));
    };

    // Handle form submission with validation
    // const handleFormSubmitWithValidation = async (
    //     e,
    //     title,
    //     description,
    //     url,
    //     setTitle,
    //     setDescription,
    //     setUrl,
    //     handleFormSubmit
    // ) => {
    //     e.preventDefault();
    //
    //     const fields = { title, description, url };
    //     let hasError = false;
    //
    //     const updatedValidity = { ...isValid };
    //
    //     // Validate fields
    //     Object.entries(fields).forEach(([field, value]) => {
    //         const isFieldValid = validateField(field, value);
    //         updatedValidity[field] = isFieldValid;
    //
    //         if (!isFieldValid) {
    //             hasError = true;
    //             setShake((prev) => ({ ...prev, [field]: true }));
    //             setTimeout(() => setShake((prev) => ({ ...prev, [field]: false })), 400);
    //         }
    //     });
    //
    //     setIsValid(updatedValidity);
    //
    //     if (!hasError) {
    //         setButtonState("loading");
    //         setTimeout(async () => {
    //             await handleFormSubmit(e);
    //             setButtonState("success");
    //             setTimeout(() => setButtonState("idle"), 2000); // Reset button state
    //         }, 2000);
    //     }
    // };

    const handleFormSubmitWithValidation = async (
        e,
        title,
        description,
        url,
        setTitle,
        setDescription,
        setUrl,
        handleFormSubmit
    ) => {
        e.preventDefault();

        setIsValidationTriggered(true); // Trigger validation

        const fields = { title, description, url };
        let hasError = false;

        const updatedValidity = { ...isValid };

        // Validate form fields
        Object.entries(fields).forEach(([field, value]) => {
            const isFieldValid = validateField(field, value);
            updatedValidity[field] = isFieldValid;

            if (!isFieldValid) {
                hasError = true;
                setShake((prev) => ({ ...prev, [field]: true }));
                setTimeout(() => setShake((prev) => ({ ...prev, [field]: false })), 400);
            }
        });

        // Validate module selection
        if (!selectedItem) {
            setShakeModuleSelection(true);
            setTimeout(() => setShakeModuleSelection(false), 500); // Reset shake after animation
            hasError = true;
        }

        setIsValid(updatedValidity);

        if (!hasError) {
            setButtonState("loading");
            setTimeout(async () => {
                await handleFormSubmit(e);
                setButtonState("success");
                setTimeout(() => setButtonState("idle"), 2000);
                setIsValidationTriggered(false); // Reset validation trigger
            }, 2000);
        }
    };


    return {
        // Expose states and handlers
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
    };
};

export default useModuleRegistration;
