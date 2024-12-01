import React from "react";
import { FiUser, FiMail, FiPhone, FiBook } from "react-icons/fi";

const StudentSelection = ({ student, removeStudent }) => {
    const parseCustomDate = (dateString) => {
        if (!dateString) return "No Expiry";

        // Split the date and time
        const [datePart, timePart] = dateString.split(" ");
        const [day, month, year] = datePart.split("-");

        // Create a new Date object
        const parsedDate = new Date(`${year}-${month}-${day}T${timePart}`);

        // Check if the date is valid
        return isNaN(parsedDate)
            ? "Invalid Date"
            : parsedDate.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            });
    };

    return (
        <div className="bg-gray-50 p-8 rounded-lg">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-6">
                    <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                            <FiUser className="text-indigo-500 text-4xl" />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600">
                            {student.full_name}
                        </h2>
                        <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600">
                            #{student.username}
                        </p>
                    </div>
                </div>
                <button
                    onClick={removeStudent}
                    className="text-indigo-500 hover:text-red-500 transition-colors duration-200 font-medium"
                >
                    Remove
                </button>
            </div>

            {/* Personal Information Section */}
            <div className="bg-white p-6 rounded-lg mb-6">
                {/*<h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>*/}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <FiUser className="text-indigo-500 text-xl" />
                        <div>
                            <p className="text-sm text-gray-500">Username</p>
                            <p className="text-gray-800">{student.username}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <FiMail className="text-indigo-500 text-xl" />
                        <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="text-gray-800">{student.email}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <FiPhone className="text-indigo-500 text-xl" />
                        <div>
                            <p className="text-sm text-gray-500">Phone</p>
                            <p className="text-gray-800">{student.mobile}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enrolled Modules Section */}
            <div className="bg-white px-6 py-3.5 rounded-lg">
                {/*<h3 className="text-lg font-semibold text-gray-800 mb-4">Enrolled Modules</h3>*/}
                {student.modules && student.modules.length > 0 ? (
                    <div className="space-y-4">
                        {student.modules.map((module) => (
                            <div
                                key={module.module_id}
                                className="p-4 bg-gray-50 rounded-lg flex items-center justify-between"
                            >
                                <div className="flex items-center space-x-4">
                                    <FiBook className="text-indigo-500 text-xl" />
                                    <div>
                                        <h4 className="font-medium text-gray-800">
                                            {module.module_name}
                                        </h4>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-500">
                                    Expires: {parseCustomDate(module.expires_at)}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-gray-500">No enrolled modules</p>
                )}
            </div>
        </div>
    );
};

export default StudentSelection;
