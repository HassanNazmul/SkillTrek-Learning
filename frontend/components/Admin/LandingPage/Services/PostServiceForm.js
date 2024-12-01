"use client";

import React from "react";
import {FaAngleDoubleUp, FaCheck} from "react-icons/fa";
import {AiOutlineLoading} from "react-icons/ai";
import {motion} from "framer-motion";
import usePostServiceForm from "@/components/Admin/LandingPage/Services/usePostServiceForm";
import ServiceList from "@/components/Admin/LandingPage/Services/ServiceList";

const PostServiceForm = () => {
    const {
        formData,
        errors,
        shake,
        isValid,
        buttonState,
        handleChange,
        handleFormSubmitWithValidation,
        countValidCharacters,
    } = usePostServiceForm();

    return (
        <motion.div
            className="h-auto p-6 flex flex-col items-center"
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -20}}
        >
            <div className="w-full max-w-3xl space-y-6">
                <form
                    onSubmit={(e) =>
                        handleFormSubmitWithValidation(
                            e,
                            formData.title,
                            formData.description,
                            formData.link,
                            formData.image
                        )
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
                            name="title"
                            type="text"
                            value={formData.title}
                            onChange={handleChange}
                            className={`w-full mt-1 p-2 rounded-md focus:outline-none ${
                                shake.title ? "animate-shake" : ""
                            } ${
                                isValid.title
                                    ? "bg-indigo-50 focus:ring-blue-300"
                                    : "bg-red-50 focus:ring-red-300"
                            }`}
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1 animate-fadeIn">
                            </p>
                        )}
                    </div>

                    {/*/!* Description Field *!/*/}
                    {/*<div className="relative">*/}
                    {/*    <label*/}
                    {/*        htmlFor="description"*/}
                    {/*        className="block text-sm font-medium text-gray-700"*/}
                    {/*    >*/}
                    {/*        Description*/}
                    {/*    </label>*/}
                    {/*    <textarea*/}
                    {/*        id="description"*/}
                    {/*        name="description"*/}
                    {/*        value={formData.description}*/}
                    {/*        onChange={handleChange}*/}
                    {/*        rows="4"*/}
                    {/*        className={`w-full mt-1 p-2 rounded-md focus:outline-none ${*/}
                    {/*            shake.description ? "animate-shake" : ""*/}
                    {/*        } ${*/}
                    {/*            isValid.description*/}
                    {/*                ? "bg-indigo-50 focus:ring-blue-300"*/}
                    {/*                : "bg-red-50 focus:ring-red-300"*/}
                    {/*        }`}*/}
                    {/*    ></textarea>*/}
                    {/*    {errors.description && (*/}
                    {/*        <p className="text-red-500 text-sm mt-1 animate-fadeIn">*/}
                    {/*        </p>*/}
                    {/*    )}*/}
                    {/*</div>*/}

                    {/* Description Field */}
                    <div className="relative">
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            className={`w-full mt-1 p-2 rounded-md focus:outline-none ${
                                shake.description ? "animate-shake" : ""
                            } ${
                                isValid.description
                                    ? "bg-indigo-50 focus:ring-blue-300"
                                    : "bg-red-50 focus:ring-red-300"
                            }`}
                        ></textarea>
                        <div className="flex justify-between items-center mt-1">
                            <p
                                className={`text-xs ${
                                    countValidCharacters(formData.description) > 128
                                        ? "text-red-500"
                                        : "text-gray-500"
                                }`}
                            >
                                {`Characters: ${countValidCharacters(
                                    formData.description
                                )}/128`}
                            </p>
                        </div>

                    </div>

                    {/* Link Field */}
                    <div className="relative">
                        <label htmlFor="link" className="block text-sm font-medium text-gray-700">
                            Link
                        </label>
                        <input
                            id="link"
                            name="link"
                            type="url"
                            value={formData.link}
                            onChange={handleChange}
                            className={`w-full mt-1 p-2 rounded-md focus:outline-none ${
                                shake.link ? "animate-shake" : ""
                            } ${
                                isValid.link
                                    ? "bg-indigo-50 focus:ring-blue-300"
                                    : "bg-red-50 focus:ring-red-300"
                            }`}
                        />
                        {errors.link && (
                            <p className="text-red-500 text-sm mt-1 animate-fadeIn">
                            </p>
                        )}
                    </div>

                    {/* Image Upload Field */}
                    <div className="relative">
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">

                        </label>
                        <div
                            className={`mt-1 p-4 border-2 border-dashed rounded-md flex flex-col items-center justify-center space-y-2 ${
                                errors.image ? "border-red-300" : "border-indigo-300"
                            }`}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                                e.preventDefault();
                                const file = e.dataTransfer.files[0];
                                handleChange({target: {name: "image", files: [file]}});
                            }}
                        >
                            {/* Preview Section */}
                            {formData.image ? (
                                <div className="relative w-full">
                                    <img
                                        src={URL.createObjectURL(formData.image)}
                                        alt="Preview"
                                        className="w-full h-48 object-cover rounded-md"
                                    />
                                    <button
                                        onClick={() => handleChange({target: {name: "image", files: null}})}
                                        className="absolute top-2 right-2 px-2 py-1 text-xs bg-red-500 text-white rounded-full"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <p className="text-indigo-500">Drag and drop an image here, or click to upload</p>
                                    <p className="text-xs text-gray-500">Accepted formats: JPG, PNG, WebP (recommended)
                                        Max size: 2MB.</p>
                                    <input
                                        id="image"
                                        name="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleChange}
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor="image"
                                        className="px-4 py-2 bg-indigo-500 text-white text-sm font-medium rounded-md cursor-pointer hover:bg-indigo-600"
                                    >
                                        Choose File
                                    </label>
                                </>
                            )}
                        </div>
                        {/*{errors.image && (*/}
                        {/*    <p className="text-red-500 text-sm mt-1 animate-fadeIn">{errors.image}</p>*/}
                        {/*)}*/}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={buttonState === "loading"}
                            className={`w-40 h-12 px-4 py-2 font-medium rounded-lg flex items-center justify-center gap-2 text-white ${
                                buttonState === "idle"
                                    ? "bg-indigo-500 hover:bg-indigo-600 transition-colors duration-300"
                                    : buttonState === "loading"
                                        ? "bg-yellow-500"
                                        : "bg-green-500 animate-pulse"
                            }`}
                        >
                            {buttonState === "loading" ? (
                                <>
                                    <AiOutlineLoading className="w-5 h-5 animate-spin"/>
                                    <span>Processing</span>
                                </>
                            ) : buttonState === "success" ? (
                                <>
                                    <FaCheck className="w-5 h-5"/>
                                    <span>Success!</span>
                                </>
                            ) : (
                                <>
                                    <FaAngleDoubleUp className="w-5 h-5"/>
                                    <span>Submit</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
                <div className="pt-16">
                    <div className="bg-white border border-indigo-100 rounded-lg space-y-4">
                        <ServiceList/>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default PostServiceForm;
