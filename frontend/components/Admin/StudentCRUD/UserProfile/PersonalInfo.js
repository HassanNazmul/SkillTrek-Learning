import React, {useState} from "react";
import {FiUser, FiMail, FiPhone, FiCopy} from "react-icons/fi";
import {BiCheckCircle} from "react-icons/bi";

const PersonalInfo = ({user}) => {
    const [copiedField, setCopiedField] = useState("");

    const handleCopy = (text, field) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(""), 2000);
    };

    const fields = [
        {label: "Username", value: user.username, icon: <FiUser/>, fieldKey: "username"},
        {label: "Email", value: user.email, icon: <FiMail/>, fieldKey: "email"},
        {label: "Phone", value: user.mobile, icon: <FiPhone/>, fieldKey: "phone"},
    ];

    return (
        // <div className="p-6 rounded-lg bg-gradient-to-r from-white to-indigo-50 shadow-md">
        <div className="bg-gray-50 p-6 rounded-lg">
            {/*<h2 className="text-2xl font-semibold text-gray-800 mb-4">Personal Information</h2>*/}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fields.map(({label, value, icon, fieldKey}) => (
                    <div key={fieldKey}
                         // className="flex items-center space-x-4 p-4 bg-white rounded-md group relative border border-gray-200">
                         className="flex items-center space-x-4 p-4 bg-white rounded-md group relative">
                        <div className="text-blue-500 text-xl">{icon}</div>
                        <div className="flex-grow">
                            <p className="text-sm text-gray-500">{label}</p>
                            <p className="text-gray-700">{value}</p>
                        </div>
                        <button
                            onClick={() => handleCopy(value, fieldKey)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            {copiedField === fieldKey ? (
                                <BiCheckCircle className="text-green-500 text-xl"/>
                            ) : (
                                <FiCopy className="text-gray-400 hover:text-blue-500 text-xl"/>
                            )}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PersonalInfo;
