const deleteServicesAPI = async (serviceId) => {
    const authToken = localStorage.getItem("authToken");

    try {
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}api/landing_page/services/${serviceId}/`;
        const headers = {
            "Content-Type": "application/json",
        };

        // Add Authorization header for authenticated requests
        if (authToken) {
            headers["Authorization"] = `Token ${authToken}`;
        }

        const response = await fetch(url, {
            method: "DELETE",
            headers,
        });

        if (!response.ok) {
            return { success: false, status: response.status };
        }

        return { success: true };
    } catch (error) {
        console.error("API call failed:", error);
        return { success: false, error };
    }
};

export default deleteServicesAPI;
