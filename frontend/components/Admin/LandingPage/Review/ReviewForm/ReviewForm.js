import {useState} from "react";
import {format} from "date-fns";
import {useReviewForm} from "@/components/Admin/LandingPage/Review/ReviewForm/uesReviewForm";
import Calendar from "@/components/Admin/LandingPage/Review/Calendar";
import SubmitReviewBTN from "@/components/Admin/LandingPage/Review/SubmitReviewBTN";

const ReviewForm = ({onSubmit, updatePreview}) => {
    const {
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
    } = useReviewForm();

    const [showCalendar, setShowCalendar] = useState(false);

    const handleInputChange = (setter, key) => (e) => {
        setter(e.target.value);
        updatePreview(
            key === "fullName" ? e.target.value : fullName,
            key === "reviewText" ? e.target.value : reviewText,
            key === "rating" ? parseFloat(e.target.value) : rating,
            key === "reviewDate" ? e.target.value : reviewDate
        );
    };

    const handleDateSelect = (date) => {
        const formattedDate = format(date, "dd-MM-yyyy");
        setReviewDate(formattedDate);
        updatePreview(fullName, reviewText, rating, formattedDate);
        setShowCalendar(false);
    };

    return (
        <div
            className="relative w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-lg flex flex-col justify-center items-center">
            <div className="w-full max-w-lg flex-grow flex flex-col justify-center">

                {/* Full Name Input */}
                <div className="mb-4">
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        value={fullName}
                        onChange={handleInputChange(setFullName, "fullName")}
                        className={`w-full px-4 py-2 border ${
                            error === "submit" && !fullName
                                ? "border-red-300"
                                : "border-indigo-100"
                        } rounded-md focus:outline-none focus:ring-1 ${
                            error === "submit" && !fullName
                                ? "focus:ring-red-400"
                                : "focus:ring-purple-300"
                        } ${
                            shake && error === "submit" && !fullName
                                ? "animate-shake"
                                : ""
                        }`}
                        // placeholder="Enter your full name"
                        aria-label="Full Name"
                    />
                </div>

                {/* Review Text Input */}
                <div className="mb-4">
                    <label htmlFor="reviewText" className="block text-sm font-medium text-gray-700 mb-1">
                        Review
                    </label>
                    <textarea
                        id="reviewText"
                        value={reviewText}
                        onChange={handleInputChange(setReviewText, "reviewText")}
                        className={`w-full px-4 py-2 border ${
                            error === "submit" && !reviewText
                                ? "border-red-300"
                                : "border-indigo-100"
                        } rounded-md focus:outline-none focus:ring-1 ${
                            error === "submit" && !reviewText
                                ? "focus:ring-red-400"
                                : "focus:ring-purple-300"
                        } ${
                            shake && error === "submit" && !reviewText
                                ? "animate-shake"
                                : ""
                        }`}
                        // placeholder="Write your review"
                        aria-label="Review Text"
                        rows="4"
                    />
                </div>

                {/* Rating and Date Inputs */}
                <div className="mb-4 flex space-x-4">
                    <div className="flex-1">
                        <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                            Rating
                        </label>
                        <input
                            type="number"
                            min="1"
                            max="5"
                            step="0.5"
                            id="rating"
                            value={rating}
                            onChange={handleInputChange(setRating, "rating")}
                            className={`w-full px-4 py-2 border ${
                                error === "submit" && !rating
                                    ? "border-red-300"
                                    : "border-indigo-100"
                            } rounded-md focus:outline-none focus:ring-1 ${
                                error === "submit" && !rating
                                    ? "focus:ring-red-400"
                                    : "focus:ring-purple-300"
                            } ${
                                shake && error === "submit" && !rating
                                    ? "animate-shake"
                                    : ""
                            }`}
                            // placeholder="Rating"
                            aria-label="Rating"
                        />
                    </div>

                    {/* Date Input with Calendar */}
                    <div className="flex-1">
                        <label htmlFor="reviewDate" className="block text-sm font-medium text-gray-700 mb-1">
                            Date
                        </label>
                        <input
                            type="text"
                            id="reviewDate"
                            value={reviewDate}
                            onFocus={() => setShowCalendar(true)} // Show calendar on focus
                            onChange={handleInputChange(setReviewDate, "reviewDate")}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    setShowCalendar(false); // Close calendar on Enter key press
                                }
                            }}
                            className={`w-full px-4 py-2 border ${
                                error === "submit" && !reviewDate
                                    ? "border-red-300"
                                    : error === "futureDate"
                                        ? "border-red-300"
                                        : "border-indigo-100"
                            } rounded-md focus:outline-none focus:ring-1 ${
                                error === "submit" && !reviewDate
                                    ? "focus:ring-red-400"
                                    : error === "futureDate"
                                        ? "focus:ring-red-400"
                                        : "focus:ring-purple-300"
                            } ${
                                shake && (error === "submit" || error === "futureDate")
                                    ? "animate-shake"
                                    : ""
                            }`}
                            // placeholder="Select a date"
                            aria-label="Review Date"
                        />
                        {showCalendar && <Calendar onSelectDate={handleDateSelect}/>} {/* Calendar component */}
                    </div>

                </div>

                {/* Submit Button */}
                <div className="w-full max-w-lg flex space-x-4 pt-12">
                    <SubmitReviewBTN onClick={() => handleSubmit(onSubmit)} isLoading={isLoading}
                                     isSubmitted={submitted}/>
                </div>
            </div>

            {error === "submitFailed" && (
                <p className={`absolute bottom-10 text-red-500 mt-2 text-center ${shake ? "animate-shake" : ""}`}>
                    Error submitting the review. Please try again.
                </p>
            )}
        </div>
    );
};

export default ReviewForm;
