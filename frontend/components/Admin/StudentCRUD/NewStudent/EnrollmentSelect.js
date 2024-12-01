// EnrollmentSelect.js
import React, {useEffect, useState} from "react";
import {fetchModuleData} from "@/components/Admin/StudentCRUD/NewStudent/lib/FetchModuleData";

const EnrollmentSelect = ({addCourse}) => {
    const [modules, setModules] = useState([]);

    useEffect(() => {
        const loadModules = async () => {
            try {
                const data = await fetchModuleData();
                setModules(data);
            } catch (error) {
                console.error("Failed to load modules:", error);
            }
        };

        loadModules();
    }, []);

    const handleCourseChange = (e) => {
        const courseId = e.target.value;
        const course = modules.find((module) => module.id === parseInt(courseId));
        if (course) {
            addCourse(course);
        }
    };

    return (<div className="col-span-1 sm:col-span-2 relative">
        <label htmlFor="enrollment" className="block text-sm font-medium text-gray-700">Course</label>
        <select
            id="enrollment"
            name="enrollment"
            onChange={handleCourseChange}
            className="text-gray-700 w-full px-3 py-2 border rounded-md shadow-sm"
        >
            <option value="">Select Course</option>
            {modules.map((module) => (<option key={module.id} value={module.id}>{module.name}</option>))}
        </select>
    </div>);
};

export default EnrollmentSelect;
