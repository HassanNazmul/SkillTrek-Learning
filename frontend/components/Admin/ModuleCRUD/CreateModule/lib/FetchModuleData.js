export const FetchModuleData = async () => {
    const authToken = localStorage.getItem("authToken");

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/module/`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${authToken}`,
                },
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch modules: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching modules:", error);
        return [];
    }
};