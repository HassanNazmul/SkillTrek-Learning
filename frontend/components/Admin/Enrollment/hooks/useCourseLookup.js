import { useState, useEffect } from "react";
import { FetchModuleAPI } from "@/components/Admin/Enrollment/lib/FetchModuleAPI";

const useCourseLookup = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const fetchCourses = async () => {
            setIsLoading(true);
            try {
                const data = await FetchModuleAPI();
                setCourses(data);
                setFilteredCourses(data);
            } catch (error) {
                console.error("Failed to fetch courses:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCourses();
    }, []);

    useEffect(() => {
        const debounceFilter = setTimeout(() => {
            const lowercasedTerm = searchTerm.toLowerCase();
            setFilteredCourses(
                courses.filter((course) => course?.name?.toLowerCase().includes(lowercasedTerm))
            );
        }, 300);

        return () => clearTimeout(debounceFilter);
    }, [searchTerm, courses]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setIsDropdownOpen(true);
    };

    return {
        searchTerm,
        filteredCourses,
        isLoading,
        isDropdownOpen,
        setIsDropdownOpen,
        handleSearchChange,
    };
};

export default useCourseLookup;
