export const updateUser = async (user) => {
    const authToken = localStorage.getItem("authToken");

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user_management/users/${user.username}/`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${authToken}`,
                },
                body: JSON.stringify({
                    full_name: user.full_name,
                    email: user.email,
                    mobile: user.mobile,
                }),
            }
        );

        if (!response.ok) {
            throw new Error(`Error updating user: ${response.statusText}`);
        }

        return await response.json(); // Return the updated user data
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};