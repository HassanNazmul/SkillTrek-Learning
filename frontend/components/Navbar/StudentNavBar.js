"use client";

import { useState, useEffect, useRef } from "react";
import { FiMenu, FiX, FiLogOut, FiUser } from "react-icons/fi";
import {FaBookOpen} from "react-icons/fa";
import { fetchUserData } from "@/components/Navbar/lib/fetchUserData";
import { logoutUser } from "@/components/Auth/lib/LogoutAPI";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const StudentNavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [user, setUser] = useState(null);
    const profileRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const loadUserData = async () => {
            const userData = await fetchUserData();
            setUser(userData);
        };

        loadUserData();
    }, []);

    const handleLogout = async () => {
        const success = await logoutUser();
        if (success) {
            router.push("/auth");
        } else {
            alert("Logout failed. Please try again.");
        }
    };

    return (
        <nav className="bg-white shadow-lg z-50 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/*<h1 className="text-2xl font-bold text-indigo-600">SKILL TREK</h1>*/}
                    <Link href="/my-course" className="text-2xl font-bold text-indigo-600">SKILL TREK</Link>
                    {/* Desktop Profile */}
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center">
                            <div className="relative" ref={profileRef}>
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center max-w-xs bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    aria-expanded={isProfileOpen}
                                    aria-haspopup="true"
                                >
                                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                        <FiUser className="h-6 w-6 text-indigo-600" />
                                    </div>
                                </button>

                                {isProfileOpen && (
                                    <div
                                        className="absolute right-0 mt-2 w-56 rounded-md shadow-lg py-2 bg-white ring-1 ring-black ring-opacity-5 z-50"
                                        role="menu"
                                        aria-orientation="vertical"
                                        aria-labelledby="user-menu"
                                    >
                                        <div className="px-4 py-3 border-b">
                                            <p className="text-sm font-medium text-gray-900">
                                                {user?.name || "Loading..."}
                                            </p>
                                            <p className="text-sm text-gray-500">{user?.email || ""}</p>
                                        </div>
                                        <Link
                                            href="/my-course/profile"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            role="menuitem"
                                        >
                                            <FiUser className="mr-2 h-4 w-4 inline-block" />
                                            Profile
                                        </Link>
                                        <Link
                                            href="/my-course"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            role="menuitem"
                                        >
                                            <FaBookOpen className="mr-2 h-4 w-4 inline-block" />
                                            Courses
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            role="menuitem"
                                        >
                                            <FiLogOut className="mr-2 h-4 w-4 inline-block" />
                                            Sign out
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            aria-expanded={isOpen}
                        >
                            <span className="sr-only">{isOpen ? "Close main menu" : "Open main menu"}</span>
                            {isOpen ? <FiX className="block h-6 w-6" /> : <FiMenu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-white shadow-lg p-6"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-2xl font-bold text-indigo-600">SKILL TREK</h1>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                            >
                                <FiX className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Mobile Profile and Logout */}
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                    <FiUser className="h-6 w-6 text-indigo-600" />
                                </div>
                                <div className="ml-3">
                                    <p className="text-base font-medium text-gray-800">{user?.name || "Loading..."}</p>
                                    <p className="text-sm font-medium text-gray-500">{user?.email || ""}</p>
                                </div>
                            </div>
                            <Link
                                href="/my-course/profile"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center text-base font-medium text-gray-700 hover:text-gray-900"
                            >
                                <FiUser className="mr-2 h-5 w-5" />
                                Profile
                            </Link>
                            <Link
                                href="/my-course"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center text-base font-medium text-gray-700 hover:text-gray-900"
                            >
                                <FaBookOpen className="mr-2 h-5 w-5" />
                                Courses
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="flex items-center w-full text-left text-base font-medium text-gray-700 hover:text-gray-900"
                            >
                                <FiLogOut className="mr-3 h-5 w-5" />
                                Sign out
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default StudentNavBar;
