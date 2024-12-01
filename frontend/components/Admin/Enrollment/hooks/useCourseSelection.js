import { useState } from "react";

const useCourseSelection = () => {
    const [selectedCourses, setSelectedCourses] = useState([]);

    // Add a course to the selection
    const addCourse = (course) => {
        setSelectedCourses((prevCourses) => [
            ...prevCourses,
            { ...course, duration: 0, expiration: null },
        ]);
    };

    // Remove a course by index
    const removeCourse = (index) => {
        setSelectedCourses((prevCourses) =>
            prevCourses.filter((_, i) => i !== index)
        );
    };

    // Update course duration days and calculate expiration
    const handleDurationDaysChange = (index, days) => {
        const parsedDays = parseInt(days, 10);
        if (parsedDays < 1 || parsedDays > 180) return; // Ensure valid range (1-180 days)

        setSelectedCourses((prevCourses) =>
            prevCourses.map((course, i) =>
                i === index
                    ? {
                        ...course,
                        duration: parsedDays,
                        expiration: new Date(
                            Date.now() + parsedDays * 24 * 60 * 60 * 1000
                        ),
                    }
                    : course
            )
        );
    };

    // Clear all selected courses
    const clearCourses = () => {
        setSelectedCourses([]); // Clear all courses
    };

    const hasInvalidCourses = () => {
        return selectedCourses.some((course) => !course.duration || course.duration < 1);
    };

    return {
        selectedCourses,
        addCourse,
        removeCourse,
        handleDurationDaysChange,
        clearCourses,
        hasInvalidCourses,
    };
};

export default useCourseSelection;
