import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { fetchData } from "@/components/Student/lib/FetchData";

const StudentView = () => {
    const router = useRouter();
    const [modules, setModules] = useState([]);

    // Fetch and organize modules
    useEffect(() => {
        const loadModules = async () => {
            const data = await fetchData();
            // New sorting logic: Active modules first, then expired modules
            const sortedModules = data.sort((a, b) => {
                if (a.is_active !== b.is_active) return a.is_active ? -1 : 1;
                return 0; // Preserve existing order within each group
            });
            setModules(sortedModules);
        };
        loadModules();
    }, []);

    const handleModuleClick = (moduleId) => {
        // Navigate to the dynamic route for the module's topics
        router.push(`/my-course/${moduleId}`);
    };

    const pageTransition = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
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
                <div className="max-w-5xl mx-auto p-4 sm:p-6">

                    {/* Desktop View */}
                    <div className="hidden md:block">
                        <div className="space-y-4">
                            {modules.map((module) => {
                                const isExpired = !module.is_active;

                                return (
                                    <motion.div
                                        key={module.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        whileHover={!isExpired ? { scale: 1.02 } : {}}
                                        whileTap={!isExpired ? { scale: 0.98 } : {}}
                                        className="relative"
                                    >
                                        <button
                                            onClick={() => !isExpired && handleModuleClick(module.id)}
                                            disabled={isExpired}
                                            className="w-full focus:outline-none"
                                            aria-label={`Select ${module.name} module`}
                                        >
                                            <div
                                                className={`relative overflow-hidden rounded-xl p-4 ${
                                                    isExpired ? "bg-red-50 ring-1 ring-red-50 cursor-not-allowed" : "bg-white ring-1 ring-indigo-100"
                                                } shadow-sm hover:shadow-md transition-all duration-300`}
                                            >
                                                <div className="flex items-center space-x-4">
                                                    <span className="text-2xl">{module.icon || "📘"}</span>
                                                    <div className="flex-1">
                                                        <h2
                                                            className={`text-lg font-semibold ${
                                                                isExpired
                                                                    ? "text-gray-500"
                                                                    : "text-gray-900"
                                                            } mb-1`}
                                                        >
                                                            {module.name}
                                                        </h2>
                                                        <p className="text-sm text-gray-600">
                                                            {module.description}
                                                        </p>
                                                    </div>
                                                    <FiArrowRight className="text-indigo-500 transform group-hover:translate-x-1 transition-transform duration-300" />
                                                </div>
                                                {isExpired && (
                                                    <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-bl-lg">
                                                        Expired
                                                    </div>
                                                )}
                                            </div>
                                        </button>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Mobile View */}
                    <div className="block md:hidden">
                        <div className="space-y-3">
                            {modules.map((module) => {
                                const isExpired = !module.is_active;

                                return (
                                    <motion.div
                                        key={module.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        whileHover={!isExpired ? { scale: 1.02 } : {}}
                                        whileTap={!isExpired ? { scale: 0.98 } : {}}
                                        className="relative"
                                    >
                                        <button
                                            onClick={() => !isExpired && handleModuleClick(module.id)}
                                            disabled={isExpired}
                                            className="w-full focus:outline-none"
                                            aria-label={`Select ${module.name} module`}
                                        >
                                            <div
                                                className={`relative overflow-hidden rounded-lg p-3 ${
                                                    isExpired ? "bg-red-50 ring-1 ring-red-50 cursor-not-allowed" : "bg-white ring-1 ring-indigo-100"
                                                } shadow-sm hover:shadow-md transition-all duration-300`}
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <span className="text-xl">{module.icon || "📘"}</span>
                                                    <div className="flex-1">
                                                        <h2
                                                            className={`text-base font-semibold ${
                                                                isExpired
                                                                    ? "text-gray-500"
                                                                    : "text-gray-900"
                                                            } mb-0.5`}
                                                        >
                                                            {module.name}
                                                        </h2>
                                                        <p className="text-xs text-gray-600">
                                                            {module.description}
                                                        </p>
                                                    </div>
                                                    <FiArrowRight className="text-indigo-500 transform group-hover:translate-x-1 transition-transform duration-300" />
                                                </div>
                                                {isExpired && (
                                                    <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-bl-lg">
                                                        Expired
                                                    </div>
                                                )}
                                            </div>
                                        </button>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default StudentView;
