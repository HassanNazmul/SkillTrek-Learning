import React from 'react';
import { FaBookmark } from 'react-icons/fa';
import Link from 'next/link';

const ServiceCard = ({ image, name, description, link, icon: Icon = FaBookmark }) => (
    <div className="group relative overflow-hidden rounded-lg bg-white p-6 drop-shadow-md transition-all duration-300 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 opacity-0 blur transition-opacity duration-300 group-hover:opacity-10"></div>
        <div className="relative z-10">
            <div className="mb-4 overflow-hidden rounded-lg">
                <img
                    src={image}
                    alt={`Image of ${name}`}
                    className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-800">{name}</h3>
            <p className="mb-4 text-gray-600">{description}</p>
            <div className="flex items-center text-purple-600">
                <Icon className="mr-2 h-5 w-5"/>
                <Link href={link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    Learn More
                </Link>
            </div>

        </div>
    </div>
);

export default ServiceCard;
