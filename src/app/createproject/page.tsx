'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface CreateProjectData {
    name: string
    description: string
}

export default function CreateProjectPage() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const router = useRouter()

    const createProjectMutation = useMutation({
        mutationFn: async (data: CreateProjectData) => {
            const token = localStorage.getItem('token') 
            if (!token) {
                throw new Error('No authentication token found')
            }
            return axios.post('/api/create-project', data, {
                headers: {
                    'x-access-token': token
                }
            })
        },
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        createProjectMutation.mutate({ name, description })
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Create New Project</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Project Name
                    </label>
                    <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="mt-1"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Project Description
                    </label>
                    <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="mt-1"
                    />
                </div>
                <Button
                    type="submit"
                    disabled={createProjectMutation.isPending}
                    className="w-full"
                >
                    {createProjectMutation.isPending ? 'Creating...' : 'Create Project'}
                </Button>
            </form>
        </div>
    )
}