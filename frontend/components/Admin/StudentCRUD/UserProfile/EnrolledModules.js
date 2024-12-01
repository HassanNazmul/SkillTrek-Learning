import React from "react";
import { FiBook } from "react-icons/fi";

const EnrolledModules = ({ user }) => {
    // Improved utility function to parse date safely
    const parseCustomDate = (dateString) => {
        if (!dateString) return null;

        try {
            const [datePart, timePart] = dateString.split(" ");
            if (!datePart || !timePart) return null;

            const [day, month, year] = datePart.split("-").map(Number);
            const [hours, minutes, seconds] = timePart.split(":").map(Number);

            const date = new Date(year, month - 1, day, hours, minutes, seconds);
            return isNaN(date.getTime()) ? null : date; // Ensure valid date
        } catch {
            return null; // Catch any unexpected parsing errors
        }
    };

    // Get readable expiration status and color class
    const getExpirationStatus = (expirationDate) => {
        if (!expirationDate) return { text: "No expiration date provided", color: "text-gray-500" };

        const now = new Date();
        const timeDifference = expirationDate - now;

        if (timeDifference < 0) {
            return { text: `Expired on ${expirationDate.toLocaleDateString()}`, color: "text-red-500" };
        }
        const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        if (daysRemaining > 5) {
            return { text: `Expires in ${daysRemaining} day(s)`, color: "text-green-500" };
        }
        return { text: `Expires in ${daysRemaining} day(s)`, color: "text-yellow-500" };
    };

    return (
        <div className="bg-gray-50 p-6 rounded-lg">
            {/*<h2 className="text-2xl font-semibold text-gray-800 mb-4">Enrolled Modules</h2>*/}
            <div className="space-y-4">
                {user.enrollments && user.enrollments.length > 0 ? (
                    user.enrollments.map((module) => {
                        const expirationDate = parseCustomDate(module.expires_at);
                        const { text: expirationText, color: expirationColor } = getExpirationStatus(expirationDate);

                        return (
                            <div key={module.id} className="p-4 bg-white rounded-md">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <FiBook className="text-blue-500 text-xl" />
                                        <div>
                                            <h3 className="font-medium text-gray-800">{module.module.name}</h3>
                                            <p className={`text-sm ${expirationColor}`}>{expirationText}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        No modules enrolled yet
                    </div>
                )}
            </div>
        </div>
    );
};

export default EnrolledModules;
