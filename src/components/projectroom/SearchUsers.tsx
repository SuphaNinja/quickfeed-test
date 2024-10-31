'use client'

import React, { useState, useMemo } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

interface User {
    id: string
    firstName: string
    lastName: string
    email: string
    createdAt: string
}

interface ProjectRoom {
    id: string
    users: User[]
    isAdmin: boolean
}

const fetchAllUsers = async (): Promise<User[]> => {
    try {
        const response = await axios.get('/api/get-all-users')
        return response.data.users
    } catch (error) {
        console.error('Error fetching users:', error)
        throw new Error('Failed to fetch users')
    }
}

const fetchProjectRoom = async (id: string): Promise<ProjectRoom> => {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('No token found')

    const response = await axios.get(`/api/get-projectroom-by-id/${id}`, {
        headers: {
            'x-access-token': token,
        },
    })
    return response.data
}

interface SearchUsersProps {
    isOpen: boolean;
}

export default function SearchUsers({ isOpen }: SearchUsersProps) {
    const [query, setQuery] = useState('')
    const [sortBy, setSortBy] = useState<keyof User>('createdAt')
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
    const params = useParams()
    const projectRoomId = params.projectId as string
    const queryClient = useQueryClient()

    const { data: projectRoom } = useQuery({
        queryKey: ['projectRoom', projectRoomId],
        queryFn: () => fetchProjectRoom(projectRoomId),
    })

    const { data: allUsers, isLoading, error, refetch } = useQuery({
        queryKey: ['allUsers'],
        queryFn: fetchAllUsers,
        refetchOnWindowFocus: false,
        retry: 3,
    })

    const addUserMutation = useMutation({
        mutationFn: async (userId: string) => {
            const token = localStorage.getItem('token')
            if (!token) throw new Error('No token found')

            return axios.post(`/api/add-user-to-projectroom/${projectRoomId}`,
                { userId },
                {
                    headers: {
                        'x-access-token': token,
                    },
                }
            )
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['projectRoom', projectRoomId] })
    })

    const filteredAndSortedUsers = useMemo(() => {
        if (!allUsers) return []

        return allUsers
            .filter(user =>
                !projectRoom?.users.some(projectUser => projectUser.id === user.id) && // Exclude users already in the project
                (user.firstName.toLowerCase().includes(query.toLowerCase()) ||
                    user.lastName.toLowerCase().includes(query.toLowerCase()) ||
                    user.email.toLowerCase().includes(query.toLowerCase()))
            )
            .sort((a, b) => {
                if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1
                if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1
                return 0
            })
    }, [allUsers, query, sortBy, sortOrder, projectRoom?.users])

    const handleSort = (field: keyof User) => {
        if (field === sortBy) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
        } else {
            setSortBy(field)
            setSortOrder('asc')
        }
    }

    if (!projectRoom?.isAdmin) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4 text-red-500">Access Denied</h1>
                <p>You must be an admin to add users to this project room.</p>
            </div>
        )
    }

    if (isLoading) return <div className="text-center py-4">Loading...</div>
    if (error) return (
        <div className="text-center py-4">
            <p className="text-red-500 mb-4">Error: {error instanceof Error ? error.message : 'An unknown error occurred'}</p>
            <Button onClick={() => refetch()}>Try Again</Button>
        </div>
    )

    return (
        <div className={`${isOpen ? "block":"hidden"} max-w-2xl p-4`}>
            <h1 className="text-2xl font-bold mb-4">Add Users to Project Room</h1>
            <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search users..."
                className="w-full mb-4"
            />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="cursor-pointer" onClick={() => handleSort('firstName')}>
                            First Name {sortBy === 'firstName' && (sortOrder === 'asc' ? '▲' : '▼')}
                        </TableHead>
                        <TableHead className="cursor-pointer" onClick={() => handleSort('lastName')}>
                            Last Name {sortBy === 'lastName' && (sortOrder === 'asc' ? '▲' : '▼')}
                        </TableHead>
                        <TableHead className="cursor-pointer" onClick={() => handleSort('email')}>
                            Email {sortBy === 'email' && (sortOrder === 'asc' ? '▲' : '▼')}
                        </TableHead>
                        <TableHead className="cursor-pointer" onClick={() => handleSort('createdAt')}>
                            Created At {sortBy === 'createdAt' && (sortOrder === 'asc' ? '▲' : '▼')}
                        </TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredAndSortedUsers.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.firstName}</TableCell>
                            <TableCell>{user.lastName}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell>
                                <Button
                                    onClick={() => addUserMutation.mutate(user.id)}
                                    disabled={addUserMutation.isPending}
                                    size="sm"
                                >
                                    Add to Project
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="mt-4 text-sm text-gray-600">
                Available users: {filteredAndSortedUsers.length}
            </div>
        </div>
    )
}