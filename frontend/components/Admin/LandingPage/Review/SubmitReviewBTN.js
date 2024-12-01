import React from "react";
import { FaPlay, FaCheck } from "react-icons/fa";

const SubmitReviewBTN = ({ onClick, isLoading, isSubmitted }) => {
    return (
        <button
            onClick={onClick}
            disabled={isLoading || isSubmitted}
            className={`flex-1 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 transition duration-300 ease-in-out flex items-center justify-center ${
                isSubmitted ? "bg-green-500" : "bg-indigo-500 hover:bg-indigo-600"
            }`}
            aria-label={isSubmitted ? "Review submitted" : "Submit review"}
        >
            {isLoading ? (
                <>
                    <FaPlay className="mr-2 animate-spin" />
                    <span className="animate-pulse">Submitting...</span>
                </>
            ) : isSubmitted ? (
                <>
                    <FaCheck className="mr-2" /> Submitted
                </>
            ) : (
                <>
                    <FaPlay className="mr-2" /> Submit
                </>
            )}
        </button>
    );
};

export default SubmitReviewBTN;
