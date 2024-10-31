'use client'

import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useParams } from 'next/navigation'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Shield, User, X, Plus, ClipboardCopy, AlertTriangle, Badge } from 'lucide-react'
import { cn } from '@/lib/utils'
interface User {
    id: string
    firstName: string
    lastName: string
    email: string
}

interface Project {
    id: string
    name: string
    description: string
    createdAt: string
    updatedAt: string
}

interface ProjectRoom {
    id: string
    project: Project
    users: User[]
    admins: User[]
    inviteUrl: string
    createdAt: string
    updatedAt: string
    isAdmin: boolean
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

interface ProjectRoomProps {
    handleIsOpen: () => void;
    isOpen: boolean;
}

export default function ProjectRoom({ handleIsOpen, isOpen }: ProjectRoomProps) {
    const params = useParams()
    const projectRoomId = params.projectId as string
    const queryClient = useQueryClient()
    const [userToRemove, setUserToRemove] = useState<User | null>(null)

    const { data: projectRoom, isLoading, isError, error } = useQuery({
        queryKey: ['projectRoom', projectRoomId],
        queryFn: () => fetchProjectRoom(projectRoomId),
    })

    const removeUserMutation = useMutation({
        mutationFn: async (userId: string) => {
            const token = localStorage.getItem('token')
            if (!token) throw new Error('No token found')

            return axios.post(
                `/api/remove-user-from-projectroom/${projectRoomId}`,
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

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Card className="w-[600px]">
                    <CardHeader>
                        <CardTitle><Skeleton className="h-8 w-[200px]" /></CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                            <div className="space-y-2">
                                <Skeleton className="h-12 w-12 rounded-full" />
                                <Skeleton className="h-4 w-[150px]" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Card className="w-[600px]">
                    <CardHeader>
                        <CardTitle className="text-red-500">Error</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{error instanceof Error ? error.message : 'An error occurred'}</p>
                        <Button className="mt-4" onClick={() => window.location.reload()}>
                            Try Again
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-b w-full from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <Card className=" shadow-lg">
                <CardHeader className="border-b border-gray-100 bg-white/50 backdrop-blur supports-[backdrop-filter]:bg-white/50">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-2xl font-bold tracking-tight">
                                {projectRoom?.project.name}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">
                                Project Room
                            </p>
                        </div>
                        {projectRoom?.isAdmin && (
                            <Button
                                variant="outline"
                                size="sm"
                                className="ml-4"
                                onClick={() => navigator.clipboard.writeText(projectRoom.inviteUrl)}
                            >
                                Copy Invite Link
                            </Button>
                        )}
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="space-y-6">
                        <div className="prose prose-gray max-w-none">
                            <p className="text-gray-600 leading-relaxed">
                                {projectRoom?.project.description}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold tracking-tight">Members</h3>
                                {projectRoom?.isAdmin && (
                                    <Button variant="outline" size="sm" onClick={handleIsOpen}>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Member
                                    </Button>
                                )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {projectRoom?.users.map((user) => (
                                    <div
                                        key={user.id}
                                        className={cn(
                                            "flex items-center justify-between p-4 rounded-lg",
                                            "bg-white border border-gray-100",
                                            "transition-shadow hover:shadow-md",
                                            projectRoom.admins.some(admin => admin.id === user.id) && "bg-primary/5"
                                        )}
                                    >
                                        <div className="flex items-center space-x-4">
                                            <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                                                <AvatarImage
                                                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.firstName} ${user.lastName}`}
                                                    alt={`${user.firstName} ${user.lastName}`}
                                                />
                                                <AvatarFallback>
                                                    {user.firstName[0]}{user.lastName[0]}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {user.firstName} {user.lastName}
                                                </p>
                                                <div className="flex items-center mt-1">
                                                    {projectRoom.admins.some(admin => admin.id === user.id) ? (
                                                        <Badge  className="text-xs">
                                                            <Shield className="h-3 w-3 mr-1" />
                                                            Admin
                                                        </Badge>
                                                    ) : (
                                                        <Badge  className="text-xs">
                                                            <User className="h-3 w-3 mr-1" />
                                                            Member
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        {projectRoom.isAdmin && user.id !== projectRoom.admins[0]?.id && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setUserToRemove(user)}
                                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {projectRoom?.isAdmin && (
                            <div className="rounded-lg border border-gray-100 bg-white/50 p-4 mt-6">
                                <h3 className="font-semibold mb-3 flex items-center text-gray-900">
                                    <Shield className="h-4 w-4 mr-2" />
                                    Admin Controls
                                </h3>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">Invite URL</p>
                                        <div className="mt-1 flex items-center space-x-2">
                                            <code className="flex-1 block bg-gray-50 p-2 rounded text-sm font-mono">
                                                {projectRoom.inviteUrl}
                                            </code>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
                            <p>Created {projectRoom && new Date(projectRoom?.createdAt).toLocaleDateString()}</p>
                            <p>Updated {projectRoom && new Date(projectRoom?.updatedAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <AlertDialog open={!!userToRemove} onOpenChange={() => setUserToRemove(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-xl">Remove User</AlertDialogTitle>
                        <AlertDialogDescription className="space-y-2">
                            <p>
                                Are you sure you want to remove <span className="font-medium">{userToRemove?.firstName} {userToRemove?.lastName}</span> from this project room?
                            </p>
                            {projectRoom?.admins.some(admin => admin.id === userToRemove?.id) && (
                                <div className="flex items-center space-x-2 text-red-500 bg-red-50 p-2 rounded">
                                    <AlertTriangle className="h-4 w-4" />
                                    <p>This user is an admin. Removing them will also remove their admin status.</p>
                                </div>
                            )}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => userToRemove && removeUserMutation.mutate(userToRemove.id)}
                            className="bg-red-500 hover:bg-red-600 text-white"
                        >
                            Remove User
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}