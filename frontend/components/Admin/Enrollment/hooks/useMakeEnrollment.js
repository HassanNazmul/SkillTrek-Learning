import { useRef, useEffect } from "react";
import useStudentLookup from "@/components/Admin/Enrollment/hooks/useStudentLookup";
import useCourseLookup from "@/components/Admin/Enrollment/hooks/useCourseLookup";
import useCourseSelection from "@/components/Admin/Enrollment/hooks/useCourseSelection";
import useStudentSelection from "@/components/Admin/Enrollment/hooks/useStudentSelection";
import {EnrolmentAPI} from "@/components/Admin/Enrollment/lib/EnrolmentAPI";

const useMakeEnrollment = () => {
    const courseLookup = useCourseLookup();
    const courseSelection = useCourseSelection();
    const studentLookup = useStudentLookup();
    const studentSelection = useStudentSelection();

    const courseDropdownRef = useRef(null);
    const studentDropdownRef = useRef(null);

    // Function to handle dropdown focus logic
    const handleDropdownFocus = (data, setIsDropdownOpen, isLoading) => {
        if (data?.length > 0 || isLoading) {
            setIsDropdownOpen(true);
        }
    };

    // Hook for handling outside click and closing dropdown
    const useOutsideClick = (setIsDropdownOpen, ref) => {
        useEffect(() => {
            const handleClickOutside = (event) => {
                if (ref.current && !ref.current.contains(event.target)) {
                    setIsDropdownOpen(false);
                }
            };
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [setIsDropdownOpen, ref]);
    };

    // Attach outside click handling for both dropdowns
    useOutsideClick(courseLookup.setIsDropdownOpen, courseDropdownRef);
    useOutsideClick(studentLookup.setIsDropdownOpen, studentDropdownRef);

    const pageTransition = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    };

    const handleCourseSelect = (course) => {
        courseSelection.addCourse(course);
        courseLookup.setIsDropdownOpen(false);
    };

    const handleStudentSelect = (student) => {
        studentSelection.addStudent(student);
        studentLookup.setIsDropdownOpen(false);
    };

    const handleEnrollment = async () => {
        const enrollments = courseSelection.selectedCourses.map((course) => ({
            student: studentSelection.selectedStudent.id,
            module: course.id,
            duration: course.duration,
        }));

        try {
            const results = await Promise.all(
                enrollments.map(async (enrollment) => {
                    console.log("Submitting enrollment:", enrollment);
                    return await EnrolmentAPI(enrollment);
                })
            );
            console.log("Enrollment successful!");
            return results;
        } catch (error) {
            console.error("Enrollment failed:", error);
            throw new Error("Failed to enroll student(s). Please try again.");
        }
    };


    return {
        courseLookup: {
            ...courseLookup,
            handleFocus: () => handleDropdownFocus(courseLookup.filteredCourses, courseLookup.setIsDropdownOpen, courseLookup.isLoading),
            dropdownRef: courseDropdownRef,
        },
        studentLookup: {
            ...studentLookup,
            handleFocus: () => handleDropdownFocus(studentLookup.filteredStudents, studentLookup.setIsDropdownOpen, studentLookup.isLoading),
            dropdownRef: studentDropdownRef,
        },
        courseSelection,
        studentSelection,
        pageTransition,
        handleCourseSelect,
        handleStudentSelect,
        handleEnrollment,
    };
};

export default useMakeEnrollment;
