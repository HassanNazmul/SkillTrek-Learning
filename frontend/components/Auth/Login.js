'use client';

import {useState} from "react";
import {FaEye, FaEyeSlash, FaSpinner} from "react-icons/fa";
import {loginUser} from "@/components/Auth/lib/LoginAPI";
import {useRouter} from 'next/navigation';


const LoginComponent = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({username: "", password: ""});
    const [isValidUsername, setIsValidUsername] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [shakeUsername, setShakeUsername] = useState(false);
    const [shakePassword, setShakePassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const validateUsername = (username) => username && username.length > 0;
    const validatePassword = (password) => password && password.length > 0;

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));

        // Update visual validation feedback without triggering shake effect
        if (name === "username") setIsValidUsername(validateUsername(value));
        if (name === "password") setIsValidPassword(validatePassword(value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isUsernameValid = validateUsername(formData.username);
        const isPasswordValid = validatePassword(formData.password);

        setIsValidUsername(isUsernameValid);
        setIsValidPassword(isPasswordValid);

        // Trigger shake animation if validation fails on submit
        if (!isUsernameValid) {
            setShakeUsername(true);
            setTimeout(() => setShakeUsername(false), 400);
        }
        if (!isPasswordValid) {
            setShakePassword(true);
            setTimeout(() => setShakePassword(false), 400);
        }
        if (!isUsernameValid || !isPasswordValid) return;

        setIsLoading(true);
        try {
            const response = await loginUser(formData.username, formData.password);
            console.log("Login successful", response);

            localStorage.setItem('authToken', response.key);
            localStorage.setItem('userType', response.user_type)

            if (response.user_type === 'admin' || response.user_type === 'staff') {
                router.push('/dashboard');
            } else if (response.user_type === 'student') {
                router.push('/my-course');
            }

        } catch (error) {
            setErrorMessage("Login failed");

            // Set both fields to invalid to trigger red border styling
            setIsValidUsername(false);
            setIsValidPassword(false);

            // Trigger shake animation
            setShakeUsername(true);
            setShakePassword(true);
            setTimeout(() => {
                setShakeUsername(false);
                setShakePassword(false);
            }, 400);
        } finally {
            setIsLoading(false);
        }
    };

    const forgetPasswordButton = () => {
        router.push('auth/forget-password');
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
                <div className="text-center">
                    <h2 className="mt-4 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600">Welcome Back</h2>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6" noValidate>
                    <div className="space-y-4">
                        <div className="relative">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                value={formData.username}
                                onChange={handleInputChange}
                                className={`text-gray-700 mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none transition duration-150 ease-in-out ${!isValidUsername ? "border-red-500 ring-0 ring-red-500" : "border-gray-300 focus:ring-0 focus:ring-indigo-500"} ${shakeUsername ? "animate-shake" : ""}`}
                            />
                        </div>

                        <div className="relative">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="relative mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    required
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className={`text-gray-700 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none transition duration-150 ease-in-out ${!isValidPassword ? "border-red-500 ring-0 ring-red-500" : "border-gray-300 focus:ring-0 focus:ring-indigo-500"} ${shakePassword ? "animate-shake" : ""}`}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <FaEyeSlash className="h-5 w-5 text-gray-400"/>
                                    ) : (
                                        <FaEye className="h-5 w-5 text-gray-400"/>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="text-left">
                        <div className="text-sm text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out cursor-pointer"
                        onClick={forgetPasswordButton}>
                            Forgot your password
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
                                "Sign in"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginComponent;
