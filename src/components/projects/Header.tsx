"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useAuth } from "@/providers/QueryProvider";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const projectSchema = z.object({
    title: z.string().min(1, "Title is required").max(100, "Title must be 100 characters or less"),
    description: z.string().min(1, "Description is required").max(500, "Description must be 500 characters or less"),
    url: z.string().url("Must be a valid URL").or(z.literal("")).optional(),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

const CreateNewProject = ({ onClose }: { onClose: () => void }) => {
    const form = useForm<ProjectFormValues>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            title: "",
            description: "",
            url: "",
        },
    });

    const {token} = useAuth();

    const createProject = useMutation({
        mutationFn: (data: ProjectFormValues) => axios.post("/api/project-routes/create-project", data, {
            headers: {"x-access-token": token}
        })
    })

    const onSubmit = (data: ProjectFormValues) => {
        createProject.mutate(data)
        // After successful submission, close the dialog
        onClose();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter project title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Enter project description" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>URL </FormLabel>
                            <FormControl>
                                <Input placeholder="Enter project URL" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">Create Project</Button>
            </form>
        </Form>
    );
};

export default function Header() {
    const { currentUser } = useAuth();
    const [ isDialogOpen, setIsDialogOpen] = useState(false);
    console.log(currentUser)
    return (
        <div className="">
            <header className="flex items-center justify-between mt-5">
                <h1 className="md:text-3xl text-2xl text-white">
                    Welcome, <span className="text-blue-500">{currentUser?.firstName}</span>{" "}
                    <span className="wave">👋</span>
                </h1>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 hover:scale-105 md:py-2 p-3 md:px-5 md:rounded rounded-full text-white">
                            <Plus className="size-4" />
                            <span className="hidden md:block">Create</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create New Project</DialogTitle>
                        </DialogHeader>
                        <CreateNewProject onClose={() => setIsDialogOpen(false)} />
                    </DialogContent>
                </Dialog>
            </header>
            <p className="text-slate-200 md:text-base text-sm mt-1">
                Manage your widgets here
            </p>
        </div>
    );
}