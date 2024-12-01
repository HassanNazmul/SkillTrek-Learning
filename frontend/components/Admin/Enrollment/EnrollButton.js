// import React, { useState } from "react";
// import { EnrolmentAPI } from "@/components/Admin/Enrollment/lib/EnrolmentAPI";
//
// const EnrollButton = ({ selectedStudent, selectedCourses, onSuccess }) => {
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [isError, setIsError] = useState(false);
//
//     const handleSubmit = async () => {
//         const invalidCourses = selectedCourses.filter((course) => !course.duration);
//
//         if (invalidCourses.length > 0) {
//             setIsError(true);
//             setTimeout(() => setIsError(false), 1000);
//             return;
//         }
//
//         setIsSubmitting(true);
//
//         const enrollments = selectedCourses.map((course) => ({
//             student: selectedStudent.id, // Send as integer
//             module: course.id,           // Send as integer
//             duration: course.duration,
//         }));
//
//         try {
//             const results = await Promise.all(
//                 enrollments.map((enrolment) => EnrolmentAPI(enrolment))
//             );
//             console.log("Enrollment successful:", results);
//             onSuccess(results); // Handle success
//         } catch (error) {
//             console.error("Failed to enroll:", error);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };
//
//     return (
//         <div>
//             <button
//                 onClick={handleSubmit}
//                 disabled={!selectedStudent || selectedCourses.length === 0 || isSubmitting}
//                 className={`w-full px-6 py-2 font-medium text-white bg-indigo-500 rounded-lg transition-opacity ${
//                     isSubmitting || !selectedStudent || selectedCourses.length === 0
//                         ? "opacity-50 cursor-not-allowed"
//                         : "hover:bg-indigo-600"
//                 }`}
//             >
//                 {isSubmitting ? "Submitting..." : "Enroll Student"}
//             </button>
//             {isError && (
//                 <div className="mt-2 text-sm text-red-500">
//                     Please enter valid durations for all selected courses.
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default EnrollButton;

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineLoading } from "react-icons/ai";
import { FaCheck, FaAngleDoubleUp } from "react-icons/fa";

const EnrollButton = ({ onSubmit }) => {
    const [buttonState, setButtonState] = useState("idle"); // idle, loading, success, error
    const router = useRouter();

    const handleClick = async () => {
        if (buttonState === "loading") return; // Prevent double-click during loading

        setButtonState("loading");

        try {
            // Add a delay to make the spinning animation visible
            await new Promise((resolve) => setTimeout(resolve, 2000)); // 2-second delay
            await onSubmit(); // Trigger submission logic

            setButtonState("success");

            // Wait for 3 seconds before redirecting
            setTimeout(() => {
                router.push("/dashboard");
            }, 3000);
        } catch (error) {
            setButtonState("error"); // Reflect validation or submission error
        }
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={buttonState === "loading"}
            className={`w-full h-12 px-4 py-2 mt-4 font-medium rounded-lg flex items-center justify-center gap-2 text-white 
        ${
                buttonState === "idle"
                    ? "bg-indigo-500 hover:bg-indigo-600 transition-colors duration-300"
                    : buttonState === "loading"
                        ? "bg-yellow-500"
                        : buttonState === "success"
                            ? "bg-green-500 animate-pulse"
                            : "bg-red-500"
            }`}
        >
            {buttonState === "loading" ? (
                <>
                    <AiOutlineLoading className="w-5 h-5 animate-spin" />
                    <span>Processing</span>
                </>
            ) : buttonState === "success" ? (
                <>
                    <FaCheck className="w-5 h-5" />
                    <span>Done!</span>
                </>
            ) : buttonState === "error" ? (
                <>
                    <FaAngleDoubleUp className="w-5 h-5" />
                    <span>Try Again</span>
                </>
            ) : (
                <>
                    <FaAngleDoubleUp className="w-5 h-5" />
                    <span>Submit</span>
                </>
            )}
        </button>
    );
};

export default EnrollButton;