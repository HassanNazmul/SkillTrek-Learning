'use client';

import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import { confirmPasswordReset } from "@/components/Auth/lib/PasswordResetAPI";

const SetPassword = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const uid = searchParams.get("uid");
    const token = searchParams.get("token");

    const [formData, setFormData] = useState({ newPassword: "", confirmPassword: "" });
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [shakePassword, setShakePassword] = useState(false);
    const [shakeConfirmPassword, setShakeConfirmPassword] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const validatePassword = (password) => password && password.length >= 8;
    const validateConfirmPassword = (password, confirmPassword) => password === confirmPassword;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (name === "newPassword") setIsValidPassword(validatePassword(value));
        if (name === "confirmPassword") setIsValidConfirmPassword(validateConfirmPassword(formData.newPassword, value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isPasswordValid = validatePassword(formData.newPassword);
        const isConfirmPasswordValid = validateConfirmPassword(formData.newPassword, formData.confirmPassword);

        setIsValidPassword(isPasswordValid);
        setIsValidConfirmPassword(isConfirmPasswordValid);

        if (!isPasswordValid) {
            setShakePassword(true);
            setTimeout(() => setShakePassword(false), 400);
        }
        if (!isConfirmPasswordValid) {
            setShakeConfirmPassword(true);
            setTimeout(() => setShakeConfirmPassword(false), 400);
        }

        if (!isPasswordValid || !isConfirmPasswordValid) return;

        setIsLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
            await confirmPasswordReset(uid, token, formData.newPassword);
            setShowConfirmation(true); // Show success message
            setTimeout(() => {
                router.push("/auth"); // Redirect after 5 seconds
            }, 5000);
        } catch (error) {
            setErrorMessage("Password reset failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
                {showConfirmation ? (
                    <div className="text-center">
                        <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 mb-4">
                            Password Reset Successful
                        </h3>
                        <p className="text-gray-600">
                            You will be redirected to the login page shortly.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="text-center">
                            <h2 className="mt-4 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600">
                                New Password
                            </h2>
                        </div>

                        <form onSubmit={handleSubmit} className="mt-8 space-y-6" noValidate>
                            <div className="space-y-4">
                                {/* New Password Field */}
                                <div className="relative">
                                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                                        New Password
                                    </label>
                                    <div className="relative mt-1">
                                        <input
                                            id="newPassword"
                                            name="newPassword"
                                            type={showPassword ? "text" : "password"}
                                            required
                                            value={formData.newPassword}
                                            onChange={handleInputChange}
                                            className={`text-gray-700 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none transition duration-150 ease-in-out ${
                                                !isValidPassword ? "border-red-500 ring-0 ring-red-500" : "border-gray-300 focus:ring-0 focus:ring-indigo-500"
                                            } ${shakePassword ? "animate-shake" : ""}`}
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            onClick={() => setShowPassword(!showPassword)}
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                        >
                                            {showPassword ? (
                                                <FaEyeSlash className="h-5 w-5 text-gray-400" />
                                            ) : (
                                                <FaEye className="h-5 w-5 text-gray-400" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Confirm Password Field */}
                                <div className="relative">
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                        Confirm Password
                                    </label>
                                    <div className="relative mt-1">
                                        <input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type={showPassword ? "text" : "password"}
                                            required
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            className={`text-gray-700 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none transition duration-150 ease-in-out ${
                                                !isValidConfirmPassword ? "border-red-500 ring-0 ring-red-500" : "border-gray-300 focus:ring-0 focus:ring-indigo-500"
                                            } ${shakeConfirmPassword ? "animate-shake" : ""}`}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out disabled:opacity-50"
                                >
                                    {isLoading ? (
                                        <FaSpinner className="animate-spin h-5 w-5" />
                                    ) : (
                                        "Reset Password"
                                    )}
                                </button>
                            </div>

                            {errorMessage && (
                                <p className="text-red-500 text-center mt-4 text-sm">{errorMessage}</p>
                            )}
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default SetPassword;
