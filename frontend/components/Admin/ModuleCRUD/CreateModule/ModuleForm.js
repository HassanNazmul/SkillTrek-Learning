import React from "react";
import { FaAngleDoubleUp, FaCheck } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";

const ModuleForm = ({
                        title,
                        description,
                        url,
                        setTitle,
                        setDescription,
                        setUrl,
                        handleFormSubmit,
                        shake,
                        isValid,
                        buttonState,
                        handleInputChange,
                        handleFormSubmitWithValidation,
                    }) => {
    return (
        <form
            onSubmit={(e) =>
                handleFormSubmitWithValidation(e, title, description, url, setTitle, setDescription, setUrl, handleFormSubmit)
            }
            className="p-4 bg-white border border-indigo-100 rounded-lg space-y-4"
        >
            {/* Title Field */}
            <div className="relative">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                </label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    // onChange={(e) => handleInputChange("title", e.target.value, setTitle, setDescription, setUrl)}
                    onChange={(e) => handleInputChange("title", e.target.value, setTitle, setDescription, setUrl)}
                    onFocus={() => handleInputChange("title", title, setTitle, setDescription, setUrl)}
                    className={`w-full mt-1 p-2 rounded-md focus:outline-none ${
                        shake.title ? "animate-shake" : ""
                    } ${isValid.title ? "bg-indigo-50 focus:ring-blue-300" : "bg-red-50"}`}
                />
            </div>

            {/* Description Field */}
            <div className="relative">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                </label>
                <textarea
                    id="description"
                    value={description}
                    // onChange={(e) => handleInputChange("description", e.target.value, setTitle, setDescription, setUrl)}
                    onChange={(e) => handleInputChange("description", e.target.value, setTitle, setDescription, setUrl)}
                    onFocus={() => handleInputChange("description", description, setTitle, setDescription, setUrl)}
                    className={`w-full mt-1 p-2 rounded-md focus:outline-none ${
                        shake.description ? "animate-shake" : ""
                    } ${isValid.description ? "bg-indigo-50 focus:ring-blue-300" : "bg-red-50"}`}
                    rows="4"
                ></textarea>
            </div>

            {/* URL Field */}
            <div className="relative">
                <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                    URL
                </label>
                <input
                    id="url"
                    type="url"
                    value={url}
                    // onChange={(e) => handleInputChange("url", e.target.value, setTitle, setDescription, setUrl)}
                    onChange={(e) => handleInputChange("url", e.target.value, setTitle, setDescription, setUrl)}
                    onFocus={() => handleInputChange("url", url, setTitle, setDescription, setUrl)}
                    className={`w-full mt-1 p-2 rounded-md focus:outline-none ${
                        shake.url ? "animate-shake" : ""
                    } ${isValid.url ? "bg-indigo-50 focus:ring-blue-300" : "bg-red-50"}`}
                />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={buttonState === "loading"}
                    className={`w-40 h-12 px-4 py-2 mt-4 font-medium rounded-lg flex items-center justify-center gap-2 text-white 
                    ${
                        buttonState === "idle"
                            ? "bg-indigo-500 hover:bg-indigo-600 transition-colors duration-300"
                            : buttonState === "loading"
                                ? "bg-yellow-500"
                                : "bg-green-500 animate-pulse"
                    }`}
                >
                    {buttonState === "loading" ? (
                        <>
                            <AiOutlineLoading className="w-5 h-5 animate-spin" />
                            <span>Processing</span>
                        </>
                    ) : buttonState === "success" ? (
                        <>
                            <FaCheck className="w-5 h-5" />
                            <span>Success!</span>
                        </>
                    ) : (
                        <>
                            <FaAngleDoubleUp className="w-5 h-5" />
                            <span>Register</span>
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default ModuleForm;
