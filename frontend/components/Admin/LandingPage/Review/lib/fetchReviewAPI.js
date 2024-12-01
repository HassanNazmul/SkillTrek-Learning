const fetchReviewAPI = async (reviewData = null) => {
    const authToken = localStorage.getItem("authToken");

    try {
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}api/landing_page/reviews/`;
        const headers = {
            "Content-Type": "application/json",
        };

        // Add Authorization header only if reviewData is provided (for POST requests)
        if (reviewData && authToken) {
            headers["Authorization"] = `Token ${authToken}`;
        }

        const response = await fetch(url, {
            method: reviewData ? "POST" : "GET",
            headers,
            ...(reviewData && { body: JSON.stringify(reviewData) }),
        });

        if (!response.ok) {
            return reviewData ? { success: false } : [];
        }

        const data = await response.json();

        if (reviewData) {
            // Success for posting
            return { success: true, data };
        } else {
            // Format the reviews for frontend
            return data.map((review) => ({
                id: review.id,
                rating: parseFloat(review.rating),
                name: review.reviewer_name,
                comment: review.review_text,
                date: new Date(review.review_date).toISOString().split("T")[0],
                created_at: new Date(review.created_at),
                updated_at: new Date(review.updated_at),
            }));
        }
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return reviewData ? { success: false } : [];
    }
};

export default fetchReviewAPI;
