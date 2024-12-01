import React, { useState } from "react";
import {FaTimes, FaUser, FaEnvelope, FaMobile, FaPhone} from "react-icons/fa";
import { updateUser } from "@/components/Admin/StudentCRUD/StudentList/lib/UpdateStudentData";

const UpdatePopup = ({ editingUser, setEditingUser, onCancel, onSave, loading, setLoading }) => {
    const [isEditable, setIsEditable] = useState({
        first_name: false,
        last_name: false,
        email: false,
    });

    const handleSave = async () => {
        setLoading(true); // Show loading indicator
        try {
            await updateUser(editingUser); // Send updated data to the backend
            onSave(); // Perform any additional actions, like refreshing the list
        } catch (error) {
            console.error("Failed to save user data:", error);
        } finally {
            setLoading(false); // Stop loading indicator
        }
    };

    const handleInputClick = (field) => {
        setIsEditable((prev) => ({
            ...prev,
            [field]: true,
        }));
    };

    // Reusable function to render input fields
    const renderInputField = ({ label, field, value, Icon }) => (
        <div className="relative">
            <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="mt-1 relative flex items-center">
                <Icon className="absolute left-3 top-2.5 text-gray-400" />
                <input
                    type={field === "email" ? "email" : "text"}
                    id={field}
                    value={value || ""}
                    readOnly={!isEditable[field]}
                    onClick={() => handleInputClick(field)}
                    onChange={(e) => {
                        setEditingUser((prev) => ({
                            ...prev,
                            [field]: e.target.value,
                        }));
                    }}
                    // className={`w-full pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                    //     !isEditable[field] ? "bg-gray-100 cursor-pointer" : ""
                    className={`w-full pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                        isEditable[field] ? "bg-indigo-50" : "bg-gray-100 cursor-pointer"
                    }`}
                />
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600">
                        Edit User
                    </h2>
                    <button
                        onClick={onCancel}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                        aria-label="Close modal"
                    >
                        <FaTimes />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="space-y-4">
                    {renderInputField({
                        label: "Full Name",
                        field: "full_name",
                        value: editingUser?.full_name,
                        Icon: FaUser,
                    })}
                    {renderInputField({
                        label: "Email",
                        field: "email",
                        value: editingUser?.email,
                        Icon: FaEnvelope,
                    })}                    {renderInputField({
                        label: "Mobile",
                        field: "mobile",
                        value: editingUser?.mobile,
                        Icon: FaPhone,
                    })}
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end space-x-3 mt-6">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdatePopup;
