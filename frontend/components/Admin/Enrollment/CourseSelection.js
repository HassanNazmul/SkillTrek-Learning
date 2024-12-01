import React from "react";
import { IoMdClose } from "react-icons/io";

const CourseSelection = ({ courses, handleDurationDaysChange, removeCourse }) => (
    <div className="mt-4 w-full max-w-3xl p-2 bg-white border border-indigo-100 rounded-lg">
        {courses.map((course, index) => (
            <div
                key={index}
                className="m-1 p-4 rounded-lg bg-gray-50 flex items-center justify-between group transition-colors duration-200"
            >
                {/* Course Name */}
                <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 capitalize">
                    {course.name}
                </span>

                {/* Controls */}
                <div className="flex items-center space-x-4">
                    {/* Duration Input */}
                    <div className="flex items-center space-x-2">
                        <label className="text-sm font-medium text-gray-700">Duration</label>
                        <input
                            type="number"
                            placeholder="Days"
                            value={course.duration || ""}
                            onChange={(e) => handleDurationDaysChange(index, e.target.value)}
                            className={`w-20 px-2 py-1 border rounded-md focus:outline-none ${
                                !course.duration || course.duration < 1 ? "bg-red-100 border border-red-200" : "bg-indigo-50 border border-indigo-100"
                            }`}
                            min="1"
                            max="180"
                        />
                    </div>

                    {/* Remove Button */}
                    <button
                        onClick={() => removeCourse(index)}
                        className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                        aria-label="Remove course"
                    >
                        <IoMdClose size={20} />
                    </button>
                </div>
            </div>
        ))}
    </div>
);

export default CourseSelection;
