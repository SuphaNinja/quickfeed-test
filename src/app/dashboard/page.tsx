'use client'

import React from 'react'
import Dashboard from '@/components/projectroom/ProjectRoom'
import SearchUsers from '@/components/projectroom/SearchUsers'



function DashboardPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Dashboard />
            <SearchUsers />
        </div>
    )
}

export default DashboardPage