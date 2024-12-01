"use client";

import React, {useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import ReviewForm from "@/components/Admin/LandingPage/Review/ReviewForm/ReviewForm";
import ReviewPlaceholder from "@/components/Admin/LandingPage/Review/ReviewPlaceholder";
import fetchReviewAPI from "@/components/Admin/LandingPage/Review/lib/fetchReviewAPI";


const PostReview = () => {
    const [previewData, setPreviewData] = useState({
        fullName: "",
        reviewText: "",
        rating: 0,
        reviewDate: "",
    });

    const updatePreview = (fullName, reviewText, rating, reviewDate) => {
        setPreviewData({fullName, reviewText, rating, reviewDate});
    };

    const handleSubmit = async (fullName, reviewText, rating, reviewDate) => {
        await fetchReviewAPI({reviewer_name: fullName, review_text: reviewText, rating, review_date: reviewDate});
    };

    const pageTransition = {
        initial: {opacity: 0, y: 20}, animate: {opacity: 1, y: 0}, exit: {opacity: 0, y: -20},
    };

    return (
        <AnimatePresence>
            <motion.div
                className="h-auto bg-white"
                variants={pageTransition}
                initial="initial"
                animate="animate"
                exit="exit"
            >
                <div className="flex items-center justify-center py-10">
                    <div className="container max-w-5xl mx-auto px-4 py-10">
                        <div className="flex flex-col md:flex-row justify-between space-y-6 md:space-y-0 md:space-x-6">
                            <div className="w-full md:w-3/5 flex-grow">
                                <ReviewForm onSubmit={handleSubmit} updatePreview={updatePreview}/>
                            </div>
                            <div className="w-full md:w-2/5 flex-shrink-0 flex-grow">
                                <ReviewPlaceholder
                                    fullName={previewData.fullName}
                                    reviewText={previewData.reviewText}
                                    rating={previewData.rating}
                                    reviewDate={previewData.reviewDate}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>);
};

export default PostReview;
