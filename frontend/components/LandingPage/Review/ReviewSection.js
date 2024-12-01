"use client"

import React, {useState, useEffect} from 'react';
import {FaStar, FaStarHalfStroke} from "react-icons/fa6";
import {motion} from 'framer-motion';
import fetchReviewAPI from "@/components/Admin/LandingPage/Review/lib/fetchReviewAPI";


const ReviewSection = () => {
    const [reviews, setReviews] = useState([]);
    const [shuffledReviews, setShuffledReviews] = useState([]);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        // Fetch reviews and set state
        const loadReviews = async () => {
            try {
                const fetchedReviews = await fetchReviewAPI();
                if (fetchedReviews.length > 0) {
                    setReviews(fetchedReviews);
                    setShuffledReviews(shuffleArray([...fetchedReviews]));

                    // Calculate duration: reviews.length * 1000
                    const calculatedDuration = fetchedReviews.length * 750;
                    setDuration(calculatedDuration);
                }
            } catch (error) {
                console.error("Failed to fetch reviews:", error);
            }
        };

        // Shuffle logic to randomize reviews
        const shuffleArray = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };

        loadReviews();
    }, []);

    return (
        <div className="container mx-auto px-4">
            <div className="w-full mx-auto p-6 bg-white rounded-lg drop-shadow-sm border border-opacity-10">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 uppercase">Course Reviews</h2>
                <div className="relative h-80 overflow-hidden">
                    <motion.div
                        className="flex absolute"
                        animate={{ x: `-${100 * shuffledReviews.length}%` }}
                        transition={{
                            ease: "linear",
                            duration: duration,
                            repeat: Infinity,
                        }}
                        style={{width: `${shuffledReviews.length * 16}rem`,}}
                    >
                        {shuffledReviews.map((review, index) => (
                            <motion.div
                                key={index}
                                className="w-64 h-64 bg-gray-50 p-4 rounded-lg drop-shadow-sm m-4 flex flex-col justify-between"
                                initial={{opacity: 0, scale: 0.8}}
                                animate={{opacity: 1, scale: 1}}
                                transition={{duration: 0.5, delay: index * 0.1}}
                            >
                                <div>
                                    <p className="font-semibold text-lg mb-2">{review.name}</p>
                                    <div className="flex mb-2">
                                        {[1, 2, 3, 4, 5].map((star) => {
                                            if (star <= Math.floor(review.rating)) {
                                                return <FaStar key={star} className="text-lg text-yellow-400"/>;
                                            } else if (star === Math.ceil(review.rating) && review.rating % 1 >= 0.5) {
                                                return <FaStarHalfStroke  key={star} className="text-lg text-yellow-400"/>;
                                            } else {
                                                return <FaStar key={star} className="text-lg text-gray-300"/>;
                                            }
                                        })}
                                    </div>
                                    <p className="text-gray-600 text-sm">{review.comment}</p>
                                </div>
                                <p className="text-xs text-gray-400 mt-2">
                                    {new Date(review.date).toLocaleDateString('en-GB')}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ReviewSection;