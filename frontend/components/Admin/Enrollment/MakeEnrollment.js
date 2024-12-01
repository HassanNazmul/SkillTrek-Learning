import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import CourseLookup from "@/components/Admin/Enrollment/CourseLookup";
import CourseSelection from "@/components/Admin/Enrollment/CourseSelection";
import StudentLookup from "@/components/Admin/Enrollment/StudentLookup";
import StudentSelection from "@/components/Admin/Enrollment/StudentSelection";
import useMakeEnrollment from "@/components/Admin/Enrollment/hooks/useMakeEnrollment";
import EnrollButton from "@/components/Admin/Enrollment/EnrollButton";

const MakeEnrollment = () => {
    const {
        courseLookup,
        courseSelection,
        studentLookup,
        studentSelection,
        pageTransition,
        handleCourseSelect,
        handleStudentSelect,
        handleEnrollment,
    } = useMakeEnrollment();

    const [warning, setWarning] = React.useState(false);

    return (
        <AnimatePresence>
            <motion.div
                className="p-6 bg-white max-w-3xl mx-auto rounded-lg"
                variants={pageTransition}
                initial="initial"
                animate="animate"
                exit="exit"
            >
                {/* Course Lookup */}
                <div className="mb-6">
                    <CourseLookup
                        searchTerm={courseLookup.searchTerm}
                        handleSearchChange={courseLookup.handleSearchChange}
                        setIsDropdownOpen={courseLookup.setIsDropdownOpen}
                        isDropdownOpen={courseLookup.isDropdownOpen}
                        handleSelectItem={handleCourseSelect}
                        filteredCourses={courseLookup.filteredCourses}
                        isLoading={courseLookup.isLoading}
                        handleFocus={courseLookup.handleFocus}
                        dropdownRef={courseLookup.dropdownRef}
                    />
                </div>

                {/* Course Selection */}
                {courseSelection.selectedCourses.length > 0 && (
                    <div className="mb-6">
                        <CourseSelection
                            courses={courseSelection.selectedCourses}
                            handleDurationDaysChange={courseSelection.handleDurationDaysChange}
                            removeCourse={courseSelection.removeCourse}
                        />
                    </div>
                )}

                {/* Student Lookup */}
                <div className="mt-6">
                    <StudentLookup
                        searchTerm={studentLookup.searchTerm}
                        handleSearchChange={studentLookup.handleSearchChange}
                        setIsDropdownOpen={studentLookup.setIsDropdownOpen}
                        isDropdownOpen={studentLookup.isDropdownOpen}
                        handleSelectItem={handleStudentSelect}
                        filteredStudents={studentLookup.filteredStudents}
                        isLoading={studentLookup.isLoading}
                        handleFocus={studentLookup.handleFocus}
                        dropdownRef={studentLookup.dropdownRef}
                    />
                </div>

                {/* Student Selection */}
                {studentSelection.selectedStudent && (
                    <div className="mt-6">
                        <StudentSelection
                            student={studentSelection.selectedStudent}
                            removeStudent={studentSelection.removeStudent}
                        />
                    </div>
                )}

                {/* Enroll Button */}
                {studentSelection.selectedStudent &&
                    courseSelection.selectedCourses.length > 0 && (
                        <div className="mt-6">
                            <EnrollButton
                                onSubmit={async () => {
                                    if (courseSelection.hasInvalidCourses()) {
                                        setWarning(true); // Show warning if validation fails
                                        setTimeout(() => setWarning(false), 3000); // Reset warning after 3 seconds
                                        return Promise.reject("Validation failed"); // Prevent submission
                                    }

                                    await handleEnrollment(); // Proceed if validation passes
                                }}
                            />
                            {warning && (
                                <p className="mt-2 text-red-500 text-sm">
                                    Please ensure all selected courses have valid durations.
                                </p>
                            )}

                        </div>
                    )}
            </motion.div>
        </AnimatePresence>
    );
};

export default MakeEnrollment;
