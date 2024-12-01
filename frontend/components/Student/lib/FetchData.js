export const fetchData = async () => {
    try {
        console.log("Fetching from:", `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user_management/profile/`);

        const authToken = localStorage.getItem('authToken');  // Retrieve the saved token
        console.log("Using token:", authToken);

        if (!authToken) {
            throw new Error("No authentication token found");
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user_management/profile/`, {
            headers: {
                Authorization: `Token ${authToken}`,
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const userData = await response.json();
        console.log("Fetched user data:", userData);

        // Process data as before
        return userData.enrollments.map((enrollment) => ({
            id: enrollment.module.id,
            name: enrollment.module.name,
            description: enrollment.module.description,
            is_active: enrollment.is_active, // Make sure this is fetched correctly
            expires_at: enrollment.expires_at, // Ensure the expiry date is also fetched
            modules: enrollment.module.topics.map((topic) => ({
                id: topic.id,
                name: topic.title,
                description: topic.description,
                url: topic.url,
            })),
        }));
    } catch (error) {
        console.error("Error fetching data:", error);
        return []; // Return an empty array in case of an error
    }
};
