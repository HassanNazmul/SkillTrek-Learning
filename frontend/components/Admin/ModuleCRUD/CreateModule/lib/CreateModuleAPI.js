export const CreateModule = async (newModule) => {
    const authToken = localStorage.getItem("authToken");

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/module/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${authToken}`,
                },
                body: JSON.stringify(newModule),
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to create module: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error creating module:", error);
        throw error;
    }
};