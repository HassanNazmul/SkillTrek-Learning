"use client"

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { FetchModuleData } from "@/components/Admin/ModuleCRUD/ModuleList/lib/FetchModuleData";

const ModuleList = () => {
    const router = useRouter();
    const [modules, setModules] = useState([]);
    const [selectedModule, setSelectedModule] = useState(null);
    const [showTopics, setShowTopics] = useState(false);

    // Fetch modules data when component mounts
    useEffect(() => {
        const loadModules = async () => {
            const data = await FetchModuleData();
            setModules(data);
        };
        loadModules();
    }, []);

    const handleModuleClick = (moduleId) => {
        // Navigate to the dynamic route for the module's topics
        router.push(`/dashboard/module/${moduleId}`);
    };

    const pageTransition = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    };

    const handleBack = () => {
        setShowTopics(false);
        setSelectedModule(null);
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

                <button
                    onClick={() => router.back()}
                    className="flex items-center text-indigo-500 hover:text-indigo-600 transition-colors duration-300 mb-4"
                >
                    <FiArrowLeft className="mr-2"/>
                    Back to Dashboard
                </button>

                {/* Desktop View */}
                <div className="hidden md:block">
                    {!showTopics && (
                        <div className="space-y-4">
                        {modules.map((module) => (
                            <motion.div
                            key={module.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="relative"
                        >
                            <button
                                onClick={() => handleModuleClick(module.id)}
                                className="w-full focus:outline-none"
                                aria-label={`Select ${module.name} module`}
                            >
                                <div
                                    className="relative overflow-hidden rounded-xl ring-1 ring-indigo-100 p-4 bg-white shadow-sm hover:shadow-md transition-all duration-300">
                                    <div className="flex items-center space-x-4">
                                        <span className="text-2xl">{module.icon || "📘"}</span>
                                        <div className="flex-1">
                                            <h2 className="text-lg font-semibold text-gray-900 mb-1">
                                                {module.name}
                                            </h2>
                                            <p className="text-sm text-gray-600">{module.description}</p>
                                        </div>
                                        <FiArrowRight
                                            className="text-indigo-500 transform group-hover:translate-x-1 transition-transform duration-300"/>
                                    </div>
                                </div>
                            </button>
                        </motion.div>))}
                    </div>)}
                </div>

                {/* Mobile View */}
                <div className="block md:hidden">
                    {!showTopics && (
                        <div className="space-y-3">
                        {modules.map((module) => (
                            <motion.div
                            key={module.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="relative"
                        >
                            <button
                                onClick={() => handleModuleClick(module.id)}
                                className="w-full focus:outline-none"
                                aria-label={`Select ${module.name} module`}
                            >
                                <div className="relative overflow-hidden rounded-lg ring-1 ring-indigo-100 p-3 bg-white shadow-sm hover:shadow-md transition-all duration-300">
                                    <div className="flex items-center space-x-3">
                                        <span className="text-xl">{module.icon || "📘"}</span>
                                        <div className="flex-1">
                                            <h2 className="text-base font-semibold text-gray-900 mb-0.5">
                                                {module.name}
                                            </h2>
                                            <p className="text-xs text-gray-600">{module.description}</p>
                                        </div>
                                        <FiArrowRight className="text-indigo-500 transform group-hover:translate-x-1 transition-transform duration-300"/>
                                    </div>
                                </div>
                            </button>
                        </motion.div>
                        ))}
                    </div>
                    )}
                </div>
            </div>
        </motion.div>
    </AnimatePresence>
    );
};

export default ModuleList;
