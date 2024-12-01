// FetchModuleData.js

export const fetchModuleData = async () => {
    const authToken = localStorage.getItem("authToken"); // Retrieve the token

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/module/`, {
            method: "GET", headers: {
                "Content-Type": "application/json", Authorization: `Token ${authToken}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch modules: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching module data:", error);
        throw error;
    }
};
