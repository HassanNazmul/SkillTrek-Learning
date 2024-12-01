import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaUserPlus, FaUserEdit, FaBookOpen, FaBook, FaUserGraduate } from "react-icons/fa";
import React, { useState } from "react";
import {MdRateReview} from "react-icons/md";
import {AiOutlineBook} from "react-icons/ai";

const AdminView = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const adminActions = [
        { id: 1, label: "New Student", icon: FaUserPlus , path: "/dashboard/add-student" },
        { id: 2, label: "Students", icon: FaUserEdit , path: "/dashboard/students" },
        { id: 3, label: "Add Module", icon: FaBookOpen , path: "/dashboard/module/add-module" },
        { id: 4, label: "Module", icon: FaBook , path: "/dashboard/module" },
        { id: 5, label: "Enrollment", icon: FaUserGraduate  , path: "/dashboard/enrollment" },
        { id: 6, label: "Review", icon: MdRateReview  , path: "/dashboard/review" },
        { id: 7, label: "Services", icon: AiOutlineBook  , path: "/dashboard/services" },
    ];

    const pageTransition = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    };

    const handleActionClick = (action) => {
        setLoading(true);
        router.push(action.path);
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
                <h1 className="text-4xl font-bold text-center py-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600">ADMIN DASHBOARD</h1>
                <div className="max-w-4xl mx-auto bg-white rounded-lg overflow-hidden">
                    <main className="p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {adminActions.map((action) => (
                                <button
                                    key={action.id}
                                    onClick={() => handleActionClick(action)}
                                    className={`flex flex-col items-center justify-center p-4 bg-white rounded-xl ring-1 ring-indigo-100 shadow-sm hover:shadow-md transform hover:scale-105 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 ${
                                        loading ? "cursor-not-allowed opacity-50" : ""
                                    }`}
                                    aria-label={action.label}
                                    disabled={loading}
                                >
                                    <action.icon className="text-4xl text-blue-600 mb-2" />
                                    <span className="text-sm font-medium text-gray-800">{action.label}</span>
                                </button>
                            ))}
                        </div>
                    </main>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default AdminView;
