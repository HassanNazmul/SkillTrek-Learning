"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import StudentNavBar from "@/components/Navbar/StudentNavBar";

export default function Layout({ children }) {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        const userType = localStorage.getItem('userType');

        // No auth token - redirect to /auth
        if (!authToken) {
            router.push('/auth');
            return;
        }

        // User type is not student - redirect to /404
        if (userType !== 'student') {
            router.push('/Error/404');
            return;
        }

        // Intercept fetch to handle unauthorized errors globally
        const originalFetch = window.fetch;
        window.fetch = async (...args) => {
            const response = await originalFetch(...args);
            if (response.status === 401) {
                router.push('/auth'); // Redirect on unauthorized
            }
            return response;
        };

        // If authToken exists and userType is 'student', allow access
        setLoading(false);
    }, [router]);

    if (loading) {
        return null;
    }

    return (
        <div className="min-h-screen">
            <StudentNavBar />
            <main className="pt-16 px-4 sm:px-6 lg:px-8">
                {children}
            </main>
        </div>
    );
}
