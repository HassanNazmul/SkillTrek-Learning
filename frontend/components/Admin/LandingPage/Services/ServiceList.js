"use client";

import React, {useEffect, useState} from "react";
import {FcFullTrash} from "react-icons/fc";
import fetchServicesAPI from "@/components/Admin/LandingPage/Services/lib/fetchServicesAPI";
import deleteServicesAPI from "@/components/Admin/LandingPage/Services/lib/deleteServicesAPI";

const ServiceList = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedServiceId, setSelectedServiceId] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                setLoading(true);
                const data = await fetchServicesAPI();
                setServices(data);
            } catch (err) {
                console.error("Failed to fetch services:", err);
                setError("Failed to load services. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await deleteServicesAPI(id);
            if (response.success) {
                setServices((prevServices) => prevServices.filter((service) => service.id !== id));
                setShowPopup(false);
            } else {
                setError("Failed to delete service.");
            }
        } catch (error) {
            setError("Error occurred during deletion.");
        }
    };

    const openPopup = (id) => {
        setSelectedServiceId(id);
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setSelectedServiceId(null);
    };

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col gap-6">
                {services.map((service) => (
                    <div
                        key={service.id}
                        className="bg-gray-50 drop-shadow-sm rounded-lg overflow-hidden flex flex-col md:flex-row"
                    >
                        {/* Content */}
                        <div className="p-4 flex flex-col flex-grow">
                            <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600">
                                {service.name}
                            </h3>
                        </div>
                        {/* Delete Button */}
                        <div className="flex justify-end p-4">
                            <button
                                onClick={() => openPopup(service.id)}
                                className="text-purple-500 hover:text-red-500"
                                title="Delete"
                            >
                                <FcFullTrash className="w-6 h-6"/>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Popup */}
            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
                        <div className="flex flex-col items-center">
                            <FcFullTrash className="w-12 h-12 mb-4"/>
                            <h2 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600">
                                Confirm Deletion
                            </h2>
                            <p className="text-sm text-gray-600 text-center mt-2">
                                Are you sure you want to delete this service?
                            </p>
                            <div className="flex gap-4 mt-6">
                                <button
                                    onClick={() => handleDelete(selectedServiceId)}
                                    className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={closePopup}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServiceList;
