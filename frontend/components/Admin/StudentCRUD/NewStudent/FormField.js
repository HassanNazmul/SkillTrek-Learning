// FormField.js                   # Component for individual form fields

import React from "react";
import {FaUser, FaEnvelope, FaPhone, FaFingerprint} from "react-icons/fa";

const icons = {
    fullName: FaUser,
    email: FaEnvelope,
    mobile: FaPhone,
};

const FormField = ({id, label, type, formData, isValid, shake, handleInputChange}) => {
    const Icon = icons[id];
    return (<div className="relative">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
        <div className="mt-1 relative">
            <Icon className="absolute left-3 top-2.5 text-gray-400"/>
            <input
                id={id}
                name={id}
                type={type}
                value={formData[id]}
                onChange={handleInputChange}
                className={`text-gray-700 w-full pl-10 px-3 py-2 border rounded-md ${!isValid[id] ? "border-red-500" : "border-gray-300"} ${shake[id] ? "animate-shake" : ""}`}
            />
        </div>
    </div>);
};

export default FormField;
