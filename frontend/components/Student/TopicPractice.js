"use client";

import {useEffect, useState} from 'react';
import {useParams} from 'next/navigation';
import {fetchData} from '@/components/Student/lib/FetchData';
import {FiArrowLeft} from "react-icons/fi";
import {motion, AnimatePresence} from "framer-motion";
import {useRouter} from 'next/navigation';

const TopicPractice = () => {
    const router = useRouter();
    const params = useParams();
    const moduleId = Number(params.moduleId);
    const topicId = Number(params.topicId);

    const [topicData, setTopicData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTopicData = async () => {
            if (!moduleId || !topicId) return;

            try {
                const modules = await fetchData();
                const selectedModule = modules.find(mod => mod.id === moduleId);
                if (selectedModule) {
                    const selectedTopic = selectedModule.modules.find(topic => topic.id === topicId);
                    if (selectedTopic) setTopicData(selectedTopic);
                    else console.error(`Topic with ID ${topicId} not found.`);
                } else {
                    console.error(`Module with ID ${moduleId} not found.`);
                }
            } catch (error) {
                console.error("Error fetching topic data:", error);
            } finally {
                setLoading(false);
            }
        };

        loadTopicData();
    }, [moduleId, topicId]);

    return (
        <AnimatePresence>
            <motion.div
                className="max-w-6xl mx-auto p-4 sm:p-6 bg-white rounded-lg"
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -20}}
                transition={{duration: 0.3}}
            >
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center text-indigo-500 hover:text-indigo-600 transition-colors duration-300 mb-4"
                >
                    <FiArrowLeft className="mr-2"/>
                    Back to Topics
                </button>

                {loading ? (
                    <p className="text-center text-gray-500">Loading...</p>
                ) : (
                    <>
                        {/* Topic Title */}
                        <h2 className="text-2xl font-semibold text-blue-600 mb-4">{topicData?.name || "Topic not found"}</h2>

                        {/* Desktop View for Topic Content */}
                        <div className="hidden md:block">
                            <p className="text-gray-700 leading-relaxed mb-6">{topicData?.description || "No description available."}</p>
                            {topicData?.url && (
                                <div className="border rounded-lg overflow-hidden shadow-md">
                                    <iframe
                                        src={topicData.url}
                                        title="Topic Content"
                                        className="w-full h-[600px]"
                                        sandbox="allow-same-origin allow-scripts"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Mobile View for Topic Content */}
                        <div className="block md:hidden">
                            {/* Topic Description */}
                            <p className="text-gray-700 text-sm leading-relaxed mb-4">
                                {topicData?.description || "No description available."}
                            </p>

                            {/* Responsive Iframe for Mobile View */}
                            {topicData?.url && (

                                <div className="border rounded-lg overflow-hidden shadow-md mb-4" style={{ height: '445px', overflow: 'hidden', marginLeft: '-10px', marginRight: '-10px', marginTop:'20px' }}>
                            <iframe
                                src={topicData.url}
                                title="Topic Content"
                                className="w-full h-[500px] sm:h-[500px]"
                                sandbox="allow-same-origin allow-scripts"
                                scrolling="no"
                                style={{ marginTop: '-55px' }} // Adjust this value to hide the title
                            />
                        </div>

                        )}

                            {/* Expandable Content Toggle for More Description (optional) */}
                            {topicData?.additionalContent && (
                                <details className="mt-4 cursor-pointer text-indigo-500">
                                    <summary className="text-sm font-medium">Read More</summary>
                                    <p className="text-gray-700 mt-2 text-sm">
                                        {topicData.additionalContent}
                                    </p>
                                </details>
                            )}
                        </div>
                    </>
                )}
            </motion.div>
        </AnimatePresence>
    );
};

export default TopicPractice;
