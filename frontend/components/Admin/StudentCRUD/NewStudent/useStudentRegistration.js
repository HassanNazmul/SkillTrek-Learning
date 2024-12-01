// useStudentRegistration.js      # Custom hook for handling form logic and state

import {useState} from "react";
import {useRouter} from 'next/navigation';

import {registerUser} from "@/components/Admin/StudentCRUD/NewStudent/lib/CreateUserAPI";

const useStudentRegistration = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        fullName: "", email: "", mobile: ""
    });
    const [courses, setCourses] = useState([]);
    const [isValid, setIsValid] = useState({
        fullName: true, email: true, mobile: true,
    });
    const [shake, setShake] = useState({
        fullName: false, email: false, mobile: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [buttonState, setButtonState] = useState("idle");

    const validateField = (name, value) => {
        if (name === "email") return /\S+@\S+\.\S+/.test(value);
        // if (name === "mobile") return /^[0-9]{10}$/.test(value);
        if (name === "mobile") return /^07[0-9]{9}$/.test(value);
        if (name === "confirmPassword") return value === formData.password; // Ensure password match
        return value.length > 0;
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
        setIsValid((prev) => ({...prev, [name]: validateField(name, value)}));
    };

    const addCourse = (course) => {
        setCourses([...courses, {id: course.id, name: course.name, duration: 0}]);
    };

    const handleDurationDaysChange = (index, days) => {
        const expirationDate = new Date();
        expirationDate.setDate(new Date().getDate() + parseInt(days, 10));
        setCourses((prevCourses) => prevCourses.map((c, i) => i === index ? {
            ...c, duration: days, expiration: expirationDate
        } : c));
    };

    const handleExpirationDateChange = (index, expirationDate) => {
        const duration = Math.ceil((expirationDate - new Date()) / (1000 * 60 * 60 * 24));
        setCourses((prevCourses) => prevCourses.map((c, i) => i === index ? {
            ...c, duration, expiration: expirationDate
        } : c));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let isFormValid = true;
        const validations = {};

        // Validate each field in formData
        Object.keys(formData).forEach((field) => {
            const isValidField = validateField(field, formData[field]);
            validations[field] = isValidField;
            if (!isValidField) {
                isFormValid = false;
                setShake((prev) => ({ ...prev, [field]: true }));
                setTimeout(() => setShake((prev) => ({ ...prev, [field]: false })), 400);
            }
        });
        setIsValid(validations);

        if (!isFormValid) {
            setButtonState("idle"); // Reset button to idle if form is invalid
            return;
        }

        setButtonState("loading"); // Set button to loading state
        try {
            const result = await registerUser(formData, courses);
            const username = result.username;

            // On success
            setButtonState("success"); // Set button to success state
            setTimeout(() => {
                router.push(`/dashboard/students/${username}`); // Navigate to student dashboard
                setButtonState("idle"); // Reset button state to idle
            }, 1500); // Optional delay to show success state
        } catch (error) {
            // Handle errors and set validation states
            const updatedValidations = { ...validations };
            if (error.email) {
                updatedValidations.email = false;
                setShake((prev) => ({ ...prev, email: true }));
                setTimeout(() => setShake((prev) => ({ ...prev, email: false })), 400);
            }

            if (error.mobile) {
                updatedValidations.mobile = false;
                setShake((prev) => ({ ...prev, mobile: true }));
                setTimeout(() => setShake((prev) => ({ ...prev, mobile: false })), 400);
            }

            setIsValid(updatedValidations);
            setButtonState("idle"); // Reset button state to idle on error
        }
    };

    const pageTransition = {
        initial: {opacity: 0, y: 20}, animate: {opacity: 1, y: 0}, exit: {opacity: 0, y: -20},
    };

    return {
        formData,
        isValid,
        shake,
        isLoading,
        errorMessage,
        courses,
        handleInputChange,
        addCourse,
        handleDurationDaysChange,
        handleExpirationDateChange,
        handleSubmit,
        pageTransition,
        buttonState,
    };
};

export default useStudentRegistration;
