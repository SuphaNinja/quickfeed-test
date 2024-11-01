'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

interface AuthContextType {
    token: string | null
    currentUser: any
    isLoading: boolean
    login: (email: string, password: string) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)
const queryClient = new QueryClient()

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(null)
    const [isInitializing, setIsInitializing] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const storedToken = localStorage.getItem('token')
        if (storedToken) {
            setToken(storedToken)
        }
        setIsInitializing(false)
    }, [])

    const { data: currentUser, isLoading } = useQuery({
        queryKey: ['currentUser'],
        queryFn: () =>
            axios.get('/api/user-routes/get-current-user', {
                headers: { 'x-access-token': token },
            }),
        enabled: !!token,
        retry: 2,
        retryDelay: 1000,
        staleTime: 5 * 60 * 1000,
    })

    const loginMutation = useMutation({
        mutationFn: (data: { email: string; password: string }) =>
            axios.post('/api/auth-routes/login', data),
        onSuccess: (response) => {
            const { token } = response.data
            localStorage.setItem('token', token)
            setToken(token)
            queryClient.invalidateQueries({ queryKey: ['currentUser'] })
            router.push('/')
        },
    })

    const login = (email: string, password: string) => {
        loginMutation.mutateAsync({ email, password })
    }

    const logout = () => {
        localStorage.removeItem('token')
        setToken(null)
        queryClient.removeQueries({ queryKey: ['currentUser'] })
    }

    const value = {
        token,
        currentUser: currentUser?.data,
        isLoading: isLoading && !!token,
        login,
        logout,
    }

    if (isInitializing || (token && isLoading)) {
        return (
            <div className="fixed inset-0 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export default function QueryProvider({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>{children}</AuthProvider>
        </QueryClientProvider>
    )
}