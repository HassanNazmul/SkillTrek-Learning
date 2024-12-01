import { useState, useEffect } from "react";

const useNewModulePopup = (defaultName, onSubmit, onClose) => {
    const [name, setName] = useState(defaultName);
    const [description, setDescription] = useState("");
    const [shake, setShake] = useState({ name: false, description: false });
    const [isValid, setIsValid] = useState({ name: true, description: true });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setName(defaultName); // Update the name when the defaultName changes
    }, [defaultName]);

    const validateField = (value) => value.trim() !== "";

    const handleInputChange = (field, value) => {
        if (field === "name") setName(value);
        if (field === "description") setDescription(value);

        setIsValid((prev) => ({ ...prev, [field]: true }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fields = { name, description };
        let hasError = false;
        const updatedValidity = { ...isValid };

        Object.entries(fields).forEach(([field, value]) => {
            const isFieldValid = validateField(value);

            updatedValidity[field] = isFieldValid;
            if (!isFieldValid) {
                hasError = true;
                setShake((prev) => ({ ...prev, [field]: true }));
                setTimeout(() => setShake((prev) => ({ ...prev, [field]: false })), 400);
            }
        });

        setIsValid(updatedValidity);

        if (hasError) return;

        setIsSubmitting(true);
        try {
            await onSubmit({ name, description });
            setName("");
            setDescription("");
            onClose();
        } catch (error) {
            console.error("Failed to create a new module:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        name,
        description,
        shake,
        isValid,
        isSubmitting,
        handleInputChange,
        handleSubmit,
    };
};

export default useNewModulePopup;
