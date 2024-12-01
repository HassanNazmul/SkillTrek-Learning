export const fetchUserData = async () => {
    try {
        console.log("Fetching from:", `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user_management/profile/`);

        const authToken = localStorage.getItem('authToken');
        if (!authToken) throw new Error("No authentication token found");

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user_management/profile/`, {
            headers: {
                Authorization: `Token ${authToken}`,
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const userData = await response.json();

        // Extracting necessary user profile information
        return {
            username: userData.username,
            name: userData.full_name,
            email: userData.email,
            user_type: userData.user_type,
        };
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
};
