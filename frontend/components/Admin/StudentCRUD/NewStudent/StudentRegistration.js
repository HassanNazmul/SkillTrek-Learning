// StudentRegistration.js         # Main component for form layout

'use client';

import React from "react";
import {motion, AnimatePresence} from "framer-motion";
import { AiOutlineLoading } from "react-icons/ai";
import { FaCheck, FaAngleDoubleUp } from "react-icons/fa";
import useStudentRegistration from '@/components/Admin/StudentCRUD/NewStudent/useStudentRegistration';
import FormField from '@/components/Admin/StudentCRUD/NewStudent/FormField';
import EnrollmentSelect from '@/components/Admin/StudentCRUD/NewStudent/EnrollmentSelect';
import CourseDetails from '@/components/Admin/StudentCRUD/NewStudent/CourseDetails';

const StudentRegistration = () => {
    const {
        formData,
        isValid,
        shake,
        isLoading,
        errorMessage,
        courses,
        handleInputChange,
        addCourse,
        handleDurationDaysChange,
        handleExpirationDateChange,
        handleSubmit,
        pageTransition,
        buttonState,
    } = useStudentRegistration();

    return (<AnimatePresence>
        <motion.div
            className="h-auto bg-white"
            variants={pageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
        >

            <div className="h-auto flex flex-col items-center justify-center bg-white mt-10">
                <div
                    className="max-w-3xl w-full space-y-8 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl">
                    {/*<h1 className="text-4xl font-bold text-center py-6">Student Registration</h1>*/}
                    <h1 className="text-4xl font-bold text-center py-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600">Student
                        Registration</h1>

                    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="col-span-1 sm:col-span-2">
                                <FormField id="fullName" label="Full Name" type="text" {...{
                                    formData, isValid, shake, handleInputChange
                                }} />
                            </div>
                            <FormField id="email" label="Email Address" type="email" {...{
                                formData, isValid, shake, handleInputChange
                            }} />
                            <FormField id="mobile" label="Phone Number" type="text" {...{
                                formData, isValid, shake, handleInputChange
                            }} />
                            <EnrollmentSelect addCourse={addCourse} enrollment={formData.enrollment}
                                              onChange={handleInputChange}/>
                        </div>
                        {errorMessage && <p className="text-red-500 text-sm text-center mt-4">{errorMessage}</p>}
                        {/* Submit Button */}
                        <div className="flex">
                            <button
                                type="submit"
                                disabled={buttonState === "loading"}
                                className={`w-full h-12 px-4 py-2 mt-4 font-medium rounded-lg flex items-center justify-center gap-2 text-white 
        ${
                                    buttonState === "idle"
                                        ? "bg-indigo-500 hover:bg-indigo-600 transition-colors duration-300"
                                        : buttonState === "loading"
                                            ? "bg-yellow-500"
                                            : "bg-green-500 animate-pulse"
                                }`}
                            >
                                {buttonState === "loading" ? (
                                    <>
                                        <AiOutlineLoading className="w-5 h-5 animate-spin"/>
                                        <span>Processing</span>
                                    </>
                                ) : buttonState === "success" ? (
                                    <>
                                        <FaCheck className="w-5 h-5"/>
                                        <span>Success!</span>
                                    </>
                                ) : (
                                    <>
                                        <FaAngleDoubleUp className="w-5 h-5"/>
                                        <span>Register</span>
                                    </>
                                )}
                            </button>
                        </div>


                    </form>
                </div>
                <CourseDetails courses={courses} handleDurationDaysChange={handleDurationDaysChange}
                               handleExpirationDateChange={handleExpirationDateChange}/>
            </div>
        </motion.div>
    </AnimatePresence>);
};

export default StudentRegistration;
