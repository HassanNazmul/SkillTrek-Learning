// CourseDetails.js               # Component for displaying course details

import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CourseDetails = ({courses, handleDurationDaysChange, handleExpirationDateChange}) => (
    <div className="mt-10 w-full max-w-3xl p-2 bg-white border border-indigo-100 rounded-lg">
        {/*<h2 className="text-2xl font-bold text-blue-600 mb-4">Selected Course Details</h2>*/}
        {courses.map((course, index) => (<div key={index} className="m-2 p-4 rounded-lg bg-gray-50">
            <div className="flex items-center justify-between">
                {/* Course Name */}
                <span className="text-lg font-semibold text-gray-800 capitalize">{course.name}</span>

                {/* Duration Input */}
                <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-gray-700">Duration</label>
                    <input
                        type="number"
                        placeholder="Days"
                        value={course.duration || ""}
                        onChange={(e) => handleDurationDaysChange(index, e.target.value)}
                        className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Expiration Date Picker */}
                {/*<div className="flex items-center space-x-2">*/}
                {/*    <label className="text-sm font-medium text-gray-700">Expiration Date</label>*/}
                {/*    <DatePicker*/}
                {/*        selected={course.expiration}*/}
                {/*        onChange={(date) => handleExpirationDateChange(index, date)}*/}
                {/*        className="w-28 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"*/}
                {/*        placeholderText="Select date"*/}
                {/*    />*/}
                {/*</div>*/}
            </div>

            {/* Expiration Date Display */}
            {course.duration > 0 && course.expiration && (<p className="text-sm text-gray-600 mt-2">
                Expiration Date: {course.expiration.toLocaleDateString()} ({course.duration} days)
            </p>)}
        </div>))}
    </div>);

export default CourseDetails;
