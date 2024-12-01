"use client"

import React, {useState} from 'react';
import {FaBars, FaTimes} from 'react-icons/fa';
import menuItems from "@/components/Navbar/DefaultNavbar/MenuItem";
import Link from "next/link";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-white text-black bg-opacity-25 backdrop-filter backdrop-blur-lg fixed w-full z-10 border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="text-2xl font-bold text-indigo-600">SKILL TREK</Link>

                    {/* This is the desktop menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {menuItems.map((item) => (<Link
                                key={item.name}
                                href={item.href}
                                className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 hover:text-indigo-700 transition duration-300"
                                aria-label={item.name}
                            >
                                {item.icon}
                                <span className="ml-2">{item.name}</span>
                            </Link>))}
                        </div>
                    </div>

                    {/* This is the mobile menu button */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={toggleMenu}
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-orange-500 focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <FaTimes/> : <FaBars/>}
                        </button>
                    </div>
                </div>
            </div>

            {/* This is the mobile menu */}
            {isOpen && (<div className="md:hidden" id="mobile-menu">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {menuItems.map((item) => (<Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 transition duration-300"
                        aria-label={item.name}
                    >
                        {item.icon}
                        <span className="ml-2">{item.name}</span>
                    </Link>))}
                </div>
            </div>)}
        </nav>);
};

export default Navbar;