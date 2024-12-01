import React from "react";
import {FaEdit} from "react-icons/fa";
import {useRouter} from "next/navigation";


const UserTable = ({users, onEdit, currentPage, usersPerPage, totalUsers, onPreviousPage, onNextPage}) => {
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const router = useRouter();

    const handleRowClick = (user) => {
        const username = user.username;
        router.push(`/dashboard/students/${username}`);
    };

    const renderStatusBadge = (isActive, enrollmentStatus) => {
        if (!isActive) {
            return (
                <span
                    className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                Not Active
            </span>
            );
        }

        switch (enrollmentStatus) {
            case "enrolled":
                return (
                    <span
                        className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Enrolled
                </span>
                );
            case "expired":
                return (
                    <span
                        className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    Expired
                </span>
                );
            case "not_enrolled":
            default:
                return (
                    <span
                        className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Not Enrolled
                </span>
                );
        }
    };

    return (<div className="bg-white border border-indigo-100 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-indigo-100 table-fixed">
                <thead className="bg-gradient-to-br from-blue-50 to-indigo-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-3/12">
                        Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-5/12">
                        Email
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-3/12">
                        Status
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
                        Actions
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-indigo-100">
                {users.map((user) => (<tr key={user.id}
                                          className="hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                                          onClick={() => handleRowClick(user)}>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{user.full_name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                        {renderStatusBadge(user.is_active, user.enrollment_status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit(user);
                            }}
                            className="text-blue-600 hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            aria-label={`Edit ${user.full_name}'s information`}
                        >
                            <FaEdit className="w-5 h-5"/>
                        </button>
                    </td>
                </tr>))}
                </tbody>
            </table>
        </div>

        {/* Pagination Navigation */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{indexOfFirstUser + 1}</span> to{" "}
                <span className="font-medium">{Math.min(indexOfLastUser, totalUsers)}</span>{" "}
                of <span className="font-medium">{totalUsers}</span> results
            </div>
            <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                        onClick={onPreviousPage}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <button
                        onClick={onNextPage}
                        disabled={indexOfLastUser >= totalUsers}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                        Next
                    </button>
                </nav>
            </div>
        </div>
    </div>);
};

export default UserTable;
