"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from "@/components/Navbar/DefaultNavbar/Navbar";
import Footer from "@/components/LandingPage/Footer/Footer";


export default function LandingLayout({ children }) {
    const pathname = usePathname();
const isLandingPage = pathname !== "/";

    return (
        <>
            {!isLandingPage && <Navbar />}
            <main className={isLandingPage ? "" : "pt-20"}>
                {children}
            </main>
            {!isLandingPage && <Footer />}
        </>
    );
}