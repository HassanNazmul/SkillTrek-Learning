// lib/LogoutAPI.js
export const logoutUser = async () => {
    try {
        const authToken = localStorage.getItem('authToken'); // Retrieve the stored token

        // Make the logout API call
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/logout/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${authToken}`,
            },
        });

        if (!response.ok) {
            throw new Error("Logout failed");
        }

        // Clear auth token from local storage
        localStorage.removeItem('authToken');
        sessionStorage.clear(); // Clear session storage as well

        // Clear cookies related to authentication (if any exist)
        document.cookie.split(";").forEach((cookie) => {
            const name = cookie.split("=")[0].trim();
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        });

        return true; // Indicate successful logout
    } catch (error) {
        console.error("Error logging out:", error);
        return false; // Indicate failed logout
    }
};
