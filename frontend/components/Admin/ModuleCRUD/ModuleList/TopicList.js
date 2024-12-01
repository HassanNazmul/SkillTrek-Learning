import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { FetchModuleData } from "@/components/Admin/ModuleCRUD/ModuleList/lib/FetchModuleData";


const TopicList = ({ moduleId }) => {
    const router = useRouter();
    const [module, setModule] = useState(null);

    useEffect(() => {
        const loadModule = async () => {
            try {
                const modules = await FetchModuleData();
                const selectedModule = modules.find((mod) => mod.id === parseInt(moduleId));
                setModule(selectedModule || null);
            } catch (error) {
                console.error("Error fetching module data:", error);
                setModule(null);
            }
        };
        if (moduleId) loadModule();
    }, [moduleId]);

    if (!module) return null;

    const pageTransition = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    };

    // Redirect to the practice page for a topic
    const navigateToPractice = (topicId) => {
        router.push(`/dashboard/module/${moduleId}/${topicId}`);
    };

    return (
        <AnimatePresence>
            <motion.div
                className="max-w-6xl mx-auto p-4 sm:p-6 bg-white rounded-lg"
                variants={pageTransition}
                initial="initial"
                animate="animate"
                exit="exit"
            >
                <button
                    onClick={() => router.back()}
                    className="flex items-center text-indigo-500 hover:text-indigo-600 transition-colors duration-300 mb-4"
                >
                    <FiArrowLeft className="mr-2" />
                    Back to Modules
                </button>
                <h2 className="text-2xl font-bold mb-6">{module.name}</h2>

                {/* Desktop View for Topics */}
                <div className="hidden md:grid grid-cols-2 gap-4">
                    {module.topics?.map((topic, index) => (
                        <motion.div
                            key={topic.id || index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300 cursor-pointer"
                            onClick={() => navigateToPractice(topic.id)}
                            // Navigate on click
                        >
                            <span className="font-medium text-gray-800">{topic.title}</span>
                            <FiArrowRight className="text-indigo-500" />
                        </motion.div>
                    ))}
                </div>

                {/* Mobile View for Topics */}
                <div className="block md:hidden space-y-3">
                    {module.topics?.map((topic, index) => (
                        <motion.div
                            key={topic.id || index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                            onClick={() => navigateToPractice(topic.id)}
                            // Navigate on click
                        >
                            <span className="font-medium text-gray-800 text-sm">{topic.title}</span>
                            <FiArrowRight className="text-indigo-500" />
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default TopicList;
