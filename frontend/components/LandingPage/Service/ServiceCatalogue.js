"use client";

import React, { useEffect, useState } from 'react';
import fetchServicesAPI from "@/components/Admin/LandingPage/Services/lib/fetchServicesAPI";
import ServiceCard from "@/components/LandingPage/Service/ServiceCard";

const ServiceCatalogue = () => {
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadServices = async () => {
            try {
                const fetchServices = await fetchServicesAPI();
                setServices(fetchServices);
            } catch (err) {
                console.error("Error fetching services:", err);
                setError(err.message || 'An error occurred while fetching services.');
            } finally {
                setIsLoading(false);
            }
        };

        loadServices();
    }, []);

    if (isLoading) {
        return <div className="text-center">Loading services...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="bg-white py-12">
            <div className="container mx-auto px-4 py-10">
                <h2 className="mb-12 text-center text-3xl font-bold text-gray-800 uppercase">Life in the UK Practice
                    Programme</h2>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 md:grid-cols-2">
                    {services.length > 0 ? (
                        services.map((service) => (
                            <ServiceCard
                                key={service.id}
                                image={service.image}
                                name={service.name}
                                description={service.description}
                                icon={service.icon}
                                link={service.link}
                            />
                        ))
                    ) : (
                        <ServiceCard
                            image="/images/no-data.png"
                            name="No Services Available"
                            description="We are currently working on adding new services. Please check back later!"
                            icon={() => <></>}
                            link="#"
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ServiceCatalogue;
