// // CreateUserAPI.js
// export const registerUser = async (formData) => {
//
//     const authToken = localStorage.getItem('authToken');
//
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user_management/users/`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Token ${authToken}`,
//         },
//         body: JSON.stringify({
//             first_name: formData.firstName,
//             last_name: formData.lastName,
//             email: formData.email,
//             mobile: formData.mobile,
//             password: formData.password,
//             user_type: 'student'
//         }),
//     });
//
//     if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || `Registration failed: ${response.statusText}`);
//     }
//
//     return response.json();
// };


export const registerUser = async (formData, courses) => {
    const authToken = localStorage.getItem('authToken');

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user_management/users/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${authToken}`,
        },
        body: JSON.stringify({
            username: formData.username,
            full_name: formData.fullName,
            email: formData.email,
            mobile: formData.mobile,
            user_type: 'student',
            module_enrollments: courses.map(course => ({
                module_id: course.id,
                duration: course.duration,
            })),
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();

        const errors = {};

        // Handle mobile-specific error message
        if (errorData.mobile && Array.isArray(errorData.mobile) && errorData.mobile[0]) {
            errors.mobile = errorData.mobile[0]; // "A user with this mobile number already exists."
        }

        // Handle email-specific error message
        if (errorData.email && Array.isArray(errorData.email) && errorData.email[0]) {
            errors.email = errorData.email[0]; // "A user with this email already exists."
        }

        // Throw all errors together if any exist
        if (Object.keys(errors).length > 0) {
            throw errors; // Throw an object containing both email and mobile errors
        }

        throw new Error(errorData.message || `Registration failed: ${response.statusText}`);
    }

    return response.json();
};

