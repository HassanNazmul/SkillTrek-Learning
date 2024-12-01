import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const ReviewPlaceholder = ({ fullName, rating, reviewText, reviewDate }) => {

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (rating >= i) {
                stars.push(<FaStar key={i} className="text-yellow-400" size={22} />);
            } else if (rating >= i - 0.5 && rating < i) {
                stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" size={22} />);
            } else {
                stars.push(<FaStar key={i} className="text-gray-300" size={22} />);
            }
        }
        return stars;
    };

    const formatDate = (dateString) => {
        const [day, month, year] = dateString.split("-");
        return `${day}-${month}-${year}`;
    };

    return (
        <div className="w-full bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-lg min-h-[500px] flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg drop-shadow-sm w-96 h-[26rem] flex flex-col justify-between">
                <p className="font-semibold text-xl mb-2 text-gray-900">{fullName || "No Name Provided"}</p>
                <div className="flex mb-2">
                    {renderStars(rating)}
                </div>
                <p className="text-gray-600 text-md flex-grow">{reviewText || "No Review Provided"}</p>
                <p className="text-sm text-gray-400 mt-4">
                    {reviewDate ? formatDate(reviewDate) : "No Date Provided"}
                </p>
            </div>
        </div>
    );
};

export default ReviewPlaceholder;