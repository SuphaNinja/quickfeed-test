'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { CreditCard, MessageSquare, LogOut } from 'lucide-react'
import Link from 'next/link'
import { ToggleTheme } from '@/components/ui/ToggleTheme'
import { useAuth } from '@/providers/QueryProvider'

function getInitials(firstName: string, lastName: string) {
    return `${firstName[0]}${lastName[0]}`.toUpperCase()
}

export default function NavBar() {
    const { token, currentUser, logout } = useAuth();

    return (
        <header className="w-full transition-all z-[999]">
            <div className="flex items-center justify-between py-5">
                <Link href="/" className="cursor-pointer">
                    <h2 className="font-bold text-blue-500 flex items-center gap-2">
                        <MessageSquare className="h-10 w-10" />
                    </h2>
                </Link>

                <div className="flex items-center gap-3">
                    <ToggleTheme />
                    {token && currentUser ? (
                        <>
                            <Link href="/pages/projects">
                                <Button variant="link">Dashboard</Button>
                            </Link>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        {currentUser.image ? (
                                            <AvatarImage src={currentUser.image} alt={`${currentUser.firstName} ${currentUser.lastName}`} />
                                        ) : (
                                            <AvatarFallback>{getInitials(currentUser.firstName, currentUser.lastName)}</AvatarFallback>
                                        )}
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={logout}>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Sign out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <Link href="/auth/login">
                            <Button
                                className="border-gray-300 dark:border-[#303030] hover:opacity-75 border-[1px] bg-transparent rounded-full p-5 text-base"
                                variant="outline"
                            >
                                Sign in
                            </Button>
                        </Link>
                    )}

                    <Link href="/payments" className="cursor-pointer">
                        <button className="p-1 bg-[#303030] rounded-full border-[1px] border-[#606060]">
                            <CreditCard className="size-5 text-white" />
                        </button>
                    </Link>
                </div>
            </div>
        </header>
    )
}