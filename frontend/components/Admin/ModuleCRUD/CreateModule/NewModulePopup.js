import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import useNewModulePopup from "./useNewModulePopup";

const NewModulePopup = ({ isOpen, onClose, onSubmit, defaultName = "" }) => {
    const {
        name,
        description,
        shake,
        isValid,
        isSubmitting,
        handleInputChange,
        handleSubmit,
    } = useNewModulePopup(defaultName, onSubmit, onClose);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="p-6 bg-white border border-indigo-100 rounded-lg max-w-lg w-full shadow-lg"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.9 }}
                >
                    <h2 className="text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 mb-4">
                        Create New Module
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name Field */}
                        <div className="relative">
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                                className={`w-full mt-1 p-2 rounded-md focus:outline-none ${
                                    shake.name ? "animate-shake" : ""
                                } ${isValid.name ? "bg-indigo-50 focus:ring-blue-300" : "bg-red-50"}`}
                                placeholder="Enter module name"
                            />
                        </div>

                        {/* Description Field */}
                        <div className="relative">
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) =>
                                    handleInputChange("description", e.target.value)
                                }
                                rows="4"
                                className={`w-full mt-1 p-2 rounded-md focus:outline-none ${
                                    shake.description ? "animate-shake" : ""
                                } ${
                                    isValid.description
                                        ? "bg-indigo-50 focus:ring-blue-300"
                                        : "bg-red-50"
                                }`}
                                placeholder="Enter module description"
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-3 bg-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-400 transition-colors duration-300"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-6 py-3 bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-600 transition-colors duration-300"
                            >
                                {isSubmitting ? "Submitting..." : "Create"}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default NewModulePopup;
