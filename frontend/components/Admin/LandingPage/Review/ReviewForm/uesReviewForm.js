import {useState} from "react";
import fetchReviewAPI from "@/components/Admin/LandingPage/Review/lib/fetchReviewAPI";

// Define a minimum delay for animation (e.g., 2 seconds)
const MIN_LOADING_TIME = 2000;

export const useReviewForm = () => {
    const [fullName, setFullName] = useState("");
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(0); // Allow starting at 0
    const [reviewDate, setReviewDate] = useState("");
    const [error, setError] = useState("");
    const [shake, setShake] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const triggerShake = () => {
        setShake(true);
        setTimeout(() => setShake(false), 400);
    };

    const handleSubmit = async (onSubmit) => {
        if (!fullName.trim() || !reviewText.trim() || !rating || !reviewDate) {
            setError("submit");
            triggerShake();
            return;
        }

        const today = new Date();
        const selectedDate = new Date(reviewDate.split("-").reverse().join("-"));

        if (selectedDate > today) {
            setError("futureDate");
            triggerShake();
            return;
        }

        // Clear the error state as the input is valid
        setError("");

        const reviewData = {
            reviewer_name: fullName.trim(),
            review_text: reviewText.trim(),
            rating: Number(rating),
            review_date: reviewDate,
        };

        try {
            setIsLoading(true);

            // Add a minimum delay to ensure animation is visible
            await new Promise((resolve) => setTimeout(resolve, 1000));

            const result = await fetchReviewAPI(reviewData);

            if (result.success) {
                onSubmit(fullName, reviewText, rating, reviewDate);
                setSubmitted(true);
                // Keep the submitted message for 2 seconds before clearing the form
                setTimeout(() => {
                    setFullName("");
                    setReviewText("");
                    setRating(0);
                    setReviewDate("");
                    setSubmitted(false); // Reset the submitted state
                }, 2000);
            } else {
                setError("submitFailed");
            }
        } catch (error) {
            setError("submitFailed");
        } finally {
            setIsLoading(false);
        }
    };


    return {
        fullName,
        setFullName,
        reviewText,
        setReviewText,
        rating,
        setRating,
        reviewDate,
        setReviewDate,
        error,
        shake,
        isLoading,
        submitted,
        handleSubmit,
    };
};
