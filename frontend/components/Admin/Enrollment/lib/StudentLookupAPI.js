export const StudentLookupAPI = async () => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
        console.error("You are not Authorized");
        return [];
    }

    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user_management/users/`;

    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${authToken}`,
            },
        });

        if (!response.ok) {
            console.error(`Failed to fetch users. Status: ${response.status}, Message: ${response.statusText}`);
            return [];
        }

        const data = await response.json();

        // Use map to return an array of objects containing only the desired fields
        return data.map(user => ({
            id: user.id,
            username: user.username,
            full_name: user.full_name,
            email: user.email,
            mobile: user.mobile,
            user_type: user.user_type,
            modules: user.enrollments?.map(enrollment => ({
                module_id: enrollment.module.id,
                module_name: enrollment.module.name,
                description: enrollment.module.description,
                expires_at: enrollment.expires_at,
            })) || [],
        }));

    } catch (error) {
        if (error instanceof TypeError) {
            console.error("Network error: Please check your internet connection.");
        } else {
            console.error("An unexpected error occurred:", error.message);
        }
        return [];
    }
};
