import {useState} from "react";
import fetchServicesAPI from "@/components/Admin/LandingPage/Services/lib/fetchServicesAPI";

const usePostServiceForm = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        link: "",
        image: null, // File type for image
    });

    const [errors, setErrors] = useState({
        title: null,
        description: null,
        link: null,
    });

    const [shake, setShake] = useState({
        title: false,
        description: false,
        link: false,
    });

    const [isValid, setIsValid] = useState({
        title: true,
        description: true,
        link: true,
    });

    const [buttonState, setButtonState] = useState("idle"); // idle, loading, success

    const countValidCharacters = (str) => {
        return str.replace(/[\s\p{P}]/gu, "").length; // Removes spaces and punctuation
    };

    const validateField = (field, value) => {
        if (field === "title") {
            return value.trim() !== "" ? true : "Title is required.";
        }
        // if (field === "description") {
        //     return value.trim() !== "" ? true : "Description is required.";
        // }
        if (field === "description") {
            const validCharCount = countValidCharacters(value);
            if (value.trim() === "") return "Description is required.";
            if (validCharCount > 128) return `Description exceeds 128 valid characters (excluding spaces and punctuation).`;
            return true;
        }

        if (field === "link") {
            return /^(https?:\/\/)/.test(value) ? true : "A valid URL is required (must start with http:// or https://).";
        }
        if (field === "image") {
            return value ? true : "An image is required.";
        }
        return true;
    };

    const handleChange = (e) => {
        const {name, value, files} = e.target;
        const updatedValue = name === "image" ? (files ? files[0] : null) : value; // Set to null if no file

        setFormData((prev) => ({
            ...prev,
            [name]: updatedValue,
        }));

        // Reset validity and errors for the field being edited
        setIsValid((prev) => ({...prev, [name]: true}));
        setErrors((prev) => ({...prev, [name]: null}));
    };

    const handleFormSubmitWithValidation = async (e) => {
        e.preventDefault();

        let hasError = false;
        const updatedShake = {...shake};
        const updatedValidity = {...isValid};
        const updatedErrors = {...errors};

        Object.entries(formData).forEach(([field, value]) => {
            const validation = validateField(field, value);
            if (validation !== true) {
                hasError = true;
                updatedValidity[field] = false;
                updatedErrors[field] = validation;
                updatedShake[field] = true;

                setTimeout(() => {
                    setShake((prev) => ({...prev, [field]: false}));
                }, 400);
            } else {
                updatedValidity[field] = true;
                updatedErrors[field] = null;
            }
        });

        setIsValid(updatedValidity);
        setErrors(updatedErrors);
        setShake(updatedShake);

        if (!hasError) {
            setButtonState("loading");

            try {
                const multipartData = new FormData();
                Object.entries(formData).forEach(([key, value]) => {
                    if (value) multipartData.append(key, value);
                });

                const response = await fetchServicesAPI(multipartData);
                if (response.success) {
                    setButtonState("success");
                    setFormData({title: "", description: "", link: "", image: null});
                    setTimeout(() => setButtonState("idle"), 2000);
                } else {
                    throw new Error("Submission failed.");
                }
            } catch (error) {
                console.error("Error submitting form:", error);
                setButtonState("idle");
                setErrors((prev) => ({
                    ...prev,
                    general: "An error occurred while submitting. Please try again.",
                }));
            }
        }
    };

    return {
        formData,
        errors,
        shake,
        isValid,
        buttonState,
        handleChange,
        handleFormSubmitWithValidation,
        countValidCharacters,
    };
};

export default usePostServiceForm;
