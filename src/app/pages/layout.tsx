"use client"


import React, { ReactNode, Suspense } from "react";
import Loading from "./loading";
import NavBar from "@/components/layout/navbar/NavBar";

interface ContainerProps {
    children: ReactNode
}

export default function Userlayout({ children }: ContainerProps) {
    
    return (
        <div className="px-5  ">
            <Suspense fallback={<Loading />}>
                <NavBar />
                {children}
            </Suspense>
        </div>
    );
}
