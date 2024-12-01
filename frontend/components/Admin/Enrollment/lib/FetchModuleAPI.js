export const FetchModuleAPI = async () => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
        console.error("You are not Authorized");
        return [];
    }

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
            throw new Error(`Failed to fetch modules (Status: ${response.status}): ${response.statusText}`);
        }

        const data = await response.json();
        return data.map(module => ({
            id: module.id,
            name: module.name,
            description: module.description,
        }));
    } catch (error) {
        if (error.name === "TypeError") {
            console.error("Network error:", error);
        } else {
            console.error("API error:", error);
        }
        return [];
    }
};
