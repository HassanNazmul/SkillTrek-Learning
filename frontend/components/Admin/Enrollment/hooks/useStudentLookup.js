import { useState, useEffect } from "react";
import { StudentLookupAPI } from "@/components/Admin/Enrollment/lib/StudentLookupAPI";

const useStudentLookup = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const fetchStudents = async () => {
            setIsLoading(true);
            try {
                const data = await StudentLookupAPI();

                // Filter for user_type: "student" and ensure proper structure
                const studentsOnly = data.filter(user => user?.user_type === "student");
                setStudents(studentsOnly);
                setFilteredStudents(studentsOnly);
            } catch (error) {
                console.error("Failed to fetch students:", error);
                setStudents([]);
                setFilteredStudents([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStudents();
    }, []);

    useEffect(() => {
        const debounceFilter = setTimeout(() => {
            const lowercasedTerm = searchTerm.toLowerCase();

            const filtered = students.filter((student) => {
                const isMobileSearch = /^\d+$/.test(lowercasedTerm); // Check if numeric search
                const fullName = `${student?.first_name || ""} ${student?.last_name || ""}`.toLowerCase();

                if (isMobileSearch) {
                    return student?.mobile?.toLowerCase().includes(lowercasedTerm);
                }

                // Search by name, username, or email
                return (
                    student?.first_name?.toLowerCase().includes(lowercasedTerm) ||
                    student?.last_name?.toLowerCase().includes(lowercasedTerm) ||
                    fullName.includes(lowercasedTerm) ||
                    student?.email?.toLowerCase().includes(lowercasedTerm)
                );
            });

            setFilteredStudents(
                filtered.map((student) => ({
                    ...student,
                    displayText: `${student.first_name} ${student.last_name} | ${student.email || student.mobile}`,
                }))
            );
        }, 300);

        return () => clearTimeout(debounceFilter);
    }, [searchTerm, students]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setIsDropdownOpen(true);
    };

    return {
        searchTerm,
        filteredStudents,
        isLoading,
        isDropdownOpen,
        setIsDropdownOpen,
        handleSearchChange,
    };
};

export default useStudentLookup;
