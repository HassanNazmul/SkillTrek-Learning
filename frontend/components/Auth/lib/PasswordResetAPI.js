export const requestPasswordReset = async (email) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/password/reset/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Failed to request password reset");
        }

        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
};

export const confirmPasswordReset = async (uid, token, newPassword) => {
    try {
        const payload = {
            uid: uid,
            token: token,
            new_password1: newPassword,
            new_password2: newPassword,
        };

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/password/reset/confirm/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload), // Ensure proper JSON formatting
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Failed to confirm password reset");
        }

        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
};

export const activeAccount = async (uid, token, newPassword) => {
    try {
        const payload = {
            uid: uid,
            token: token,
            new_password1: newPassword,
            new_password2: newPassword,
        };

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user_management/active-account/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload), // Ensure proper JSON formatting
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Failed to confirm password reset");
        }

        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
};
