const fetchServicesAPI = async (ServicesData = null) => {
    const authToken = localStorage.getItem("authToken");

    try {
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}api/landing_page/services/`;
        const headers = {};

        // Add Authorization header only if ServicesData is provided (for POST requests)
        if (ServicesData && authToken) {
            headers["Authorization"] = `Token ${authToken}`;
        }

        const response = await fetch(url, {
            method: ServicesData ? "POST" : "GET",
            headers,
            body: ServicesData, // Pass FormData directly for POST
        });

        if (!response.ok) {
            return ServicesData ? { success: false } : [];
        }

        const data = await response.json();
        return ServicesData
            ? { success: true, data }
            : data.map((service) => ({
                id: service.id,
                name: service.title,
                description: service.description,
                link: service.link,
                image: service.image ? service.image.url : "default_image_url",
                created_at: service.created_at,
                updated_at: service.updated_at,
            }));
    } catch (error) {
        return ServicesData ? { success: false } : [];
    }
};

export default fetchServicesAPI;