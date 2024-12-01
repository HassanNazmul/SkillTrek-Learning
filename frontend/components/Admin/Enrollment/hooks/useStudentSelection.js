import { useState } from "react";

const useStudentSelection = () => {
    const [selectedStudent, setSelectedStudent] = useState(null);

    // Add a student to the selection
    const addStudent = (student) => {
        setSelectedStudent(student);
    };

    // Remove the selected student
    const removeStudent = () => {
        setSelectedStudent(null);
    };

    return {
        selectedStudent,
        addStudent,
        removeStudent,
    };
};

export default useStudentSelection;
