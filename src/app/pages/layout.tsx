"use client"


import React, { Suspense } from "react";
import Loading from "./loading";
import NavBar from "@/components/layout/navbar/NavBar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Userlayout({ children }: any) {
    
    return (
        <div className="px-5  ">
            <Suspense fallback={<Loading />}>
                <NavBar />
                {children}
            </Suspense>
        </div>
    );
}