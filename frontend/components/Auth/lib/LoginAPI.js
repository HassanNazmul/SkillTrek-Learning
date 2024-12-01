// lib/LoginAPI.js
export const loginUser = async (username, password) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({username, password}), // Use username and password
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed: " + response.statusText);
    }

    return response.json();
};
