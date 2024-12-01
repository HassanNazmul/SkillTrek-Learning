"use client";

import React, { useState, useEffect } from "react";
import SearchBar from "@/components/Admin/StudentCRUD/StudentList/SearchBar";
import UserTable from "@/components/Admin/StudentCRUD/StudentList/UserTable";
import UpdatePopup from "@/components/Admin/StudentCRUD/StudentList/UpdatePopup";
import {fetchUsers} from "@/components/Admin/StudentCRUD/StudentList/lib/FetchUserData";
import { motion, AnimatePresence } from "framer-motion";

const ViewStudents = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [editingUser, setEditingUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 15;

    // Fetch users from the backend
    useEffect(() => {
        const loadUsers = async () => {
            setLoading(true);
            try {
                const fetchedUsers = await fetchUsers();
                setUsers(fetchedUsers);
            } catch (err) {
                setError("Failed to fetch users");
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, []);


// Filter users based on search query and user type "student"
    const filteredUsers = users.filter((user) => {
        return (
            user.user_type === "student" && // Only include students
            (
                user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase()))
            )
        );
    });


    // Paginate users
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    // Handlers
    const handleSearch = (query) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    const handleEdit = (user) => {
        setEditingUser({ ...user });
        setIsModalOpen(true);
    };

    const handleUpdate = () => {
        setLoading(true);
        try {
            // Recalculate full name based on updated first name and last name
            const updatedUsers = users.map((user) =>
                user.id === editingUser.id
                    ? {
                        ...user,
                        ...editingUser,
                        full_name: `${editingUser.first_name} ${editingUser.last_name}`.trim(),
                    }
                    : user
            );

            // Update the state with the new users array
            setUsers(updatedUsers);
            setIsModalOpen(false);
            setEditingUser(null);

            console.log("Updated Users Array: ", updatedUsers);
        } catch (err) {
            setError("Failed to update user information");
        } finally {
            setLoading(false);
        }
    };


    const handlePreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) =>
            indexOfLastUser < filteredUsers.length ? prev + 1 : prev
        );
    };

    const pageTransition = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    };

    return (
        <AnimatePresence>
            <motion.div
                className="h-auto bg-white"
                variants={pageTransition}
                initial="initial"
                animate="animate"
                exit="exit"
            >
                <div className="max-w-6xl mx-auto px-6">
                    <SearchBar query={searchQuery} onSearch={handleSearch} />
                    {error && (
                        <div
                            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                            role="alert"
                        >
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}
                    {loading ? (
                        <p>Loading users...</p>
                    ) : (
                        <UserTable
                            users={currentUsers}
                            onEdit={handleEdit}
                            currentPage={currentPage}
                            usersPerPage={usersPerPage}
                            totalUsers={filteredUsers.length}
                            onPreviousPage={handlePreviousPage}
                            onNextPage={handleNextPage}
                        />
                    )}
                    {isModalOpen && (
                        <UpdatePopup
                            editingUser={editingUser}
                            setEditingUser={setEditingUser}
                            onCancel={() => setIsModalOpen(false)}
                            onSave={handleUpdate}
                            loading={loading}
                            setLoading={setLoading}
                        />
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ViewStudents;
