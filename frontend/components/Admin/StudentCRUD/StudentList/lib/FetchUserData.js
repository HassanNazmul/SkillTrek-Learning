export const fetchUsers = async () => {
    const authToken = localStorage.getItem("authToken");

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user_management/users/`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${authToken}`,
                },
            }
        );

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();

        // Map data to include only the fields needed and check for enrollments
        const filteredData = data.map((user) => {
            const enrollments = Array.isArray(user.enrollments) ? user.enrollments : [];
            const now = new Date();

            const parseCustomDate = (dateString) => {
                if (!dateString) return null;

                try {
                    const [datePart, timePart] = dateString.split(" ");
                    if (!datePart || !timePart) return null;

                    const [day, month, year] = datePart.split("-").map(Number);
                    const [hours, minutes, seconds] = timePart.split(":").map(Number);

                    return new Date(year, month - 1, day, hours, minutes, seconds);
                } catch {
                    return null;
                }
            };

            const hasActiveEnrollments = enrollments.some((enrollment) => {
                const expirationDate = parseCustomDate(enrollment.expires_at);
                return expirationDate && expirationDate >= now;
            });

            const enrollmentStatus = hasActiveEnrollments
                ? "enrolled"
                : enrollments.length > 0
                    ? "expired"
                    : "not_enrolled";

            return {
                id: user.id,
                username: user.username,
                email: user.email,
                full_name: user.full_name,
                mobile: user.mobile,
                user_type: user.user_type,
                is_active: user.is_active,
                enrollment_status: enrollmentStatus,
            };
        });


        return filteredData;
    } catch (error) {
        return [];
    }
};
