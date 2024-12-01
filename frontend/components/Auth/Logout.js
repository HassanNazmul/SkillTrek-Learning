'use client';

import React from 'react';
import {useRouter} from 'next/navigation';
import {logoutUser} from '@/components/Auth/lib/LogoutAPI';

const Logout = () => {
    const router = useRouter();

    const handleLogout = async () => {
        const success = await logoutUser();
        if (success) {
            router.push('/auth'); // Redirect to the login page after logout
        } else {
            alert("Failed to log out. Please try again.");
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="text-indigo-600 hover:underline"
        >
            Logout
        </button>
    );
};

export default Logout;
