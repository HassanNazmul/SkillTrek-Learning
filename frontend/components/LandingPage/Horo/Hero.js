import React from 'react';
import {FaUser, FaEnvelope, FaPhone} from 'react-icons/fa';

const HeroSection = () => {
    return (<div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
            className="relative min-h-[75vh] flex flex-col md:flex-row items-center justify-left bg-white overflow-hidden">
            <div className="w-full md:w-8/12 p-8 md:p-12 lg:p-16 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-indigo-900 mb-4 leading-tight">
                    Ace Your Life in the UK Exam
                </h1>
                <p className="text-lg md:text-xl text-indigo-800 mb-8">
                    Join our expert-led preparation program and confidently navigate your path to British
                    citizenship.
                    Our comprehensive courses are designed to ensure your success.
                </p>
                <div className="animate-bounce">
                    <a
                        href="#learn-more"
                        className="inline-block bg-indigo-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        Learn More
                    </a>
                </div>
            </div>
        </div>
    </div>);
};


export default HeroSection;