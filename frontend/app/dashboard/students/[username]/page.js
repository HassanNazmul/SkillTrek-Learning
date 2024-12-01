"use client"

import React from 'react';
import { useParams } from 'next/navigation';
import UserProfile from '@/components/Admin/StudentCRUD/UserProfile/UserProfile';

const AddStudentPage = () => {
    const params = useParams();
    const username = params.username;

    return (
        <div className="container mx-auto mt-10">
            <UserProfile username={username} />
        </div>
    );
};

export default AddStudentPage;
