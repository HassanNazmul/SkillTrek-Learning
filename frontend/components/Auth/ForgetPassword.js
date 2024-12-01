'use client';

import {useState, useEffect} from "react";
import {FaSpinner} from "react-icons/fa";
import {useRouter} from "next/navigation";
import {requestPasswordReset} from "@/components/Auth/lib/PasswordResetAPI";

const ForgetPassword = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [shakeEmail, setShakeEmail] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setIsValidEmail(validateEmail(value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isEmailValid = validateEmail(email);
        setIsValidEmail(isEmailValid);

        if (!isEmailValid) {
            setShakeEmail(true);
            setTimeout(() => setShakeEmail(false), 400);
            return;
        }

        setIsLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            await requestPasswordReset(email);

            // Always show this confirmation message for successful or failed attempts
            setShowConfirmation(true);
            setTimeout(() => {
                router.push("/auth");
            }, 5000);
        } catch (error) {
            if (error.response?.status === 429) {
                // Handle rate-limiting error gracefully
                setErrorMessage("Too many requests. Please wait a moment and try again.");
                console.error("Too many requests. Please wait a moment and try again.");
            } else {
                // Log the error silently or monitor it
                setErrorMessage("Failed to send password reset request. Please try again.");
            }

            // Always show the confirmation message to prevent email enumeration
            setShowConfirmation(true);
            setTimeout(() => {
                router.push("/auth");
            }, 5000);
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
                            Check Your Email
                        </h3>
                        <p className="text-gray-600">
                            A password reset link has been sent to <strong>{email}</strong>. You will be redirected to
                            the login page shortly.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="text-center">
                            <h2 className="mt-4 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600">
                                Reset Your Password
                            </h2>
                        </div>

                        <form onSubmit={handleSubmit} className="mt-8 space-y-6" noValidate>
                            <div className="space-y-4">
                                <div className="relative">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email Address
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={handleInputChange}
                                        className={`text-gray-700 mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none transition duration-150 ease-in-out ${
                                            !isValidEmail
                                                ? "border-red-500 ring-0 ring-red-500"
                                                : "border-gray-300 focus:ring-0 focus:ring-indigo-500"
                                        } ${shakeEmail ? "animate-shake" : ""}`}
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out disabled:opacity-50"
                                >
                                    {isLoading ? (
                                        <FaSpinner className="animate-spin h-5 w-5"/>
                                    ) : (
                                        "Request Password Reset"
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

export default ForgetPassword;
