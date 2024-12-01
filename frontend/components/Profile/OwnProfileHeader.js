import React from "react";
import {FiUser} from "react-icons/fi";

const OwnProfileHeader = ({user}) => (
    <div className="bg-gray-50 p-8 rounded-lg">
        <div className="flex items-center space-x-6">
            {user.avatar ? (
                <img
                    src={user.avatar}
                    alt="Profile"
                    // className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                />
            ) : (
                <div
                    className="relative w-24 h-24 rounded-full p-1 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                        <FiUser className="text-indigo-500 text-6xl"/>
                    </div>
                </div>
            )}
            <div>
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600">
                    {user.full_name}
                </h1>
                <p className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600">#{user.username}</p>
            </div>
        </div>
    </div>
);

export default OwnProfileHeader;