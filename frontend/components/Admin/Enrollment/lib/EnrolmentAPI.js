export const EnrolmentAPI = async (newEnrolment) => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
        console.error("You are not Authorized");
        return [];
    }

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/enrollments/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${authToken}`,
                },
                body: JSON.stringify(newEnrolment),
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to create enrolment: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        if (error.name === "TypeError") {
            console.error("Network error:", error);
        } else {
            console.error("API error:", error);
        }
        return [];
    }
};
