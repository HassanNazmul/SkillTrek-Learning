// FetchUserData.js
export const fetchUserData = async (username) => {
    const authToken = localStorage.getItem('authToken');

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user_management/users/${username}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${authToken}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
};
