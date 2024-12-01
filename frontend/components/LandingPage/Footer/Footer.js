import React from "react";
import {FaFacebook, FaTwitter, FaInstagram, FaLinkedin} from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
    return (<footer className="container mx-auto px-4 pt-16 pb-6">
        <div className="w-full mx-auto p-6 bg-white rounded-lg drop-shadow-sm border border-opacity-10">
            <div
                className="flex flex-col md:flex-row justify-between items-start md:items-start space-y-8 md:space-y-0">
                <div className="w-full md:w-1/3 flex flex-col" aria-labelledby="footer-column-1">
                    <h2 id="footer-column-1" className="text-xl font-bold mb-4 text-gray-800">Quick Links</h2>
                    <ul className="space-y-2">
                        <li>
                            <a href="#"
                               className="text-gray-600 hover:text-blue-500 transition-colors duration-200">Home</a>
                        </li>
                        <li>
                            <a href="#"
                               className="text-gray-600 hover:text-blue-500 transition-colors duration-200">Courses</a>
                        </li>
                        <li>
                            <a href="#"
                               className="text-gray-600 hover:text-blue-500 transition-colors duration-200">About
                                Us</a>
                        </li>
                    </ul>
                </div>
                <div className="w-full md:w-1/3 flex flex-col" aria-labelledby="footer-column-2">
                    <h2 id="footer-column-2" className="text-xl font-bold mb-4 text-gray-800">Contact Us</h2>
                    <p className="text-gray-600 mb-2">123 Education Street, London, UK</p>
                    <p className="text-gray-600 mb-2">Phone: +44 20 1234 5678</p>
                    <p className="text-gray-600">Email: info@lifeintheukeducation.com</p>
                </div>
                <div className="w-full md:w-1/3 flex flex-col" aria-labelledby="footer-column-3">
                    <h2 id="footer-column-3" className="text-xl font-bold mb-4 text-gray-800">Follow Us</h2>
                    <div className="flex items-center space-x-4">
                        <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors duration-200">
                            <FaFacebook size={24}/>
                        </a>
                        <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors duration-200">
                            <FaTwitter size={24}/>
                        </a>
                        <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors duration-200">
                            <FaInstagram size={24}/>
                        </a>
                        <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors duration-200">
                            <FaLinkedin size={24}/>
                        </a>
                    </div>
                </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200 text-center">
                <p className="text-gray-500 text-sm">
                    © {new Date().getFullYear()} Life in the UK Education Center. All rights reserved | Developed by <Link className="text-purple-600 hover:text-blue-500 transition-colors duration-200" href={"https://www.linkedin.com/in/nhassan96/"}>Nazmul Hassan</Link>
                </p>
            </div>
        </div>
    </footer>);
};

export default Footer;