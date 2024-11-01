"use client"

import { AlertTriangle, Bell, Calendar, CalendarDays, CheckCircle, CheckCircle2, ChevronDown, Clock, Flag, Home, LayoutDashboard, LogOut, MoreVertical, Search, Settings, TrendingUp, User, Users } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Bar, BarChart, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const mockProject = {
    id: "cm2xm3kju0001q2zbxuvymw02",
    title: "Portfolio Project",
    description: "A showcase of my latest work and skills",
    url: "https://my-portfolio-mu-gilt.vercel.app/",
    inviteUrl: null,
    createdAt: "2024-10-31T18:01:16.733Z",
    updatedAt: "2024-10-31T18:01:16.733Z",
    users: [
        {
            id: "cm2xm3kjy0003q2zb4w0tnxq8",
            userId: "cm2xldupl0004zvxo4h7qlm8r",
            firstName: "Sid",
            lastName: "Rico Björk",
            email: "sidricobjork@gmail.com",
            image: null,
            projectRoomId: "cm2xm3kju0001q2zbxuvymw02",
            role: "admin",
            createdAt: "2024-10-31T18:01:16.733Z",
            assignedTasks: [],
            createdTasks: []
        },
        {
            id: "user2",
            userId: "user2id",
            firstName: "Jane",
            lastName: "Doe",
            email: "jane.doe@example.com",
            image: null,
            projectRoomId: "cm2xm3kju0001q2zbxuvymw02",
            role: "member",
            createdAt: "2024-11-01T10:00:00.000Z",
            assignedTasks: [],
            createdTasks: []
        },
        {
            id: "user3",
            userId: "user3id",
            firstName: "John",
            lastName: "Smith",
            email: "john.smith@example.com",
            image: null,
            projectRoomId: "cm2xm3kju0001q2zbxuvymw02",
            role: "member",
            createdAt: "2024-11-02T14:30:00.000Z",
            assignedTasks: [],
            createdTasks: []
        }
    ],
    analyses: [
        {
            id: "an1",
            title: "Initial Site Analysis",
            description: "Overview of the portfolio site structure and performance",
            overallRating: 4.2,
            diagramData: "{}",
            projectRoomId: "cm2xm3kju0001q2zbxuvymw02",
            createdAt: "2024-11-01T10:00:00.000Z",
            updatedAt: "2024-11-01T10:00:00.000Z"
        },
        {
            id: "an2",
            title: "SEO Performance Review",
            description: "Analysis of search engine optimization strategies",
            overallRating: 3.8,
            diagramData: "{}",
            projectRoomId: "cm2xm3kju0001q2zbxuvymw02",
            createdAt: "2024-11-05T14:30:00.000Z",
            updatedAt: "2024-11-05T14:30:00.000Z"
        }
    ],
    tasks: [
        {
            id: "task1",
            title: "Update About Section",
            description: "Add recent projects and skills to the about section",
            createdAt: "2024-11-01T09:00:00.000Z",
            updatedAt: "2024-11-01T09:00:00.000Z",
            deadline: "2024-11-07T23:59:59.000Z",
            status: "In Progress",
            priority: "High",
            assigneeId: "cm2xm3kjy0003q2zb4w0tnxq8",
            assignorId: "cm2xm3kjy0003q2zb4w0tnxq8",
            projectRoomId: "cm2xm3kju0001q2zbxuvymw02"
        },
        {
            id: "task2",
            title: "Optimize Images",
            description: "Compress and optimize all images for better performance",
            createdAt: "2024-11-01T10:30:00.000Z",
            updatedAt: "2024-11-01T10:30:00.000Z",
            deadline: "2024-11-05T23:59:59.000Z",
            status: "Completed",
            priority: "Medium",
            assigneeId: "cm2xm3kjy0003q2zb4w0tnxq8",
            assignorId: "cm2xm3kjy0003q2zb4w0tnxq8",
            projectRoomId: "cm2xm3kju0001q2zbxuvymw02"
        },
        {
            id: "task3",
            title: "Implement Contact Form",
            description: "Add a functional contact form to the website",
            createdAt: "2024-11-02T11:00:00.000Z",
            updatedAt: "2024-11-02T11:00:00.000Z",
            deadline: "2024-11-10T23:59:59.000Z",
            status: "Pending",
            priority: "Low",
            assigneeId: "user2",
            assignorId: "cm2xm3kjy0003q2zb4w0tnxq8",
            projectRoomId: "cm2xm3kju0001q2zbxuvymw02"
        }
    ],
    feedbacks: [
        {
            id: "fb1",
            projectRoomId: "cm2xm3kju0001q2zbxuvymw02",
            message: "Great portfolio! The project showcases are impressive.",
            rating: 5,
            name: "John Doe",
            isRead: false,
            createdAt: "2024-11-02T14:30:00.000Z",
            updatedAt: "2024-11-02T14:30:00.000Z"
        },
        {
            id: "fb2",
            projectRoomId: "cm2xm3kju0001q2zbxuvymw02",
            message: "The site looks good, but could use better mobile responsiveness.",
            rating: 4,
            name: "Jane Smith",
            isRead: true,
            createdAt: "2024-11-03T09:15:00.000Z",
            updatedAt: "2024-11-03T09:15:00.000Z"
        },
        {
            id: "fb3",
            projectRoomId: "cm2xm3kju0001q2zbxuvymw02",
            message: "Love the clean design! Maybe add more interactive elements?",
            rating: 4,
            name: "Mike Johnson",
            isRead: false,
            createdAt: "2024-11-04T16:45:00.000Z",
            updatedAt: "2024-11-04T16:45:00.000Z"
        }
    ]
}

const mockProjects = [
    { ...mockProject, id: "project1", title: "Portfolio Project" },
    { ...mockProject, id: "project2", title: "E-commerce Website" },
    { ...mockProject, id: "project3", title: "Mobile App" },
]

function Sidebar({ projects, onSelectProject }) {
    return (
        <div className="w-64  border-r p-6">
            <div className="flex items-center space-x-2 mb-6">
                <LayoutDashboard className="h-6 w-6" />
                <span className="text-xl font-bold">ProjectHub</span>
            </div>  
            <nav className="space-y-2">
                <h4 className="px-2 text-sm font-semibold text-gray-500 uppercase">Projects</h4>
                {projects.map((project) => (
                    <Button
                        key={project.id}
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => onSelectProject(project)}
                    >
                        <Home className="mr-2 h-4 w-4" />
                        {project.title}
                    </Button>
                ))}
            </nav>
            <div className="mt-auto pt-6 space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Team
                </Button>
            </div>
        </div>
    )
}

function ProjectChart({ project }) {
    // This is a placeholder data. You should replace this with actual project data.
    const data = [
        { name: "Jan", tasks: 10, progress: 20 },
        { name: "Feb", tasks: 15, progress: 35 },
        { name: "Mar", tasks: 20, progress: 45 },
        { name: "Apr", tasks: 25, progress: 60 },
        { name: "May", tasks: 30, progress: 75 },
        { name: "Jun", tasks: 35, progress: 90 },
    ]

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
                <Tooltip />
                <Line type="monotone" dataKey="progress" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="tasks" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
        </ResponsiveContainer>
    )
}

function ProjectOverview({ project }) {
    const completedTasks = project.tasks.filter(t => t.status === "Completed").length
    const inProgressTasks = project.tasks.filter(t => t.status === "In Progress").length
    const pendingTasks = project.tasks.filter(t => t.status === "Pending").length
    const totalTasks = project.tasks.length
    const averageRating = project.feedbacks.reduce((acc, f) => acc + f.rating, 0) / project.feedbacks.length
    const progressPercentage = (completedTasks / totalTasks) * 100

    const taskStatusData = [
        { name: "Task Status", Completed: completedTasks, "In Progress": inProgressTasks, Pending: pendingTasks },
    ]

    return (
        <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalTasks}</div>
                        <Progress
                            value={progressPercentage}
                            className="mt-2"
                        />
                        <p className="text-xs text-muted-foreground mt-2">
                            {completedTasks} completed ({progressPercentage.toFixed(0)}%)
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Team Members</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{project.users.length}</div>
                        <p className="text-xs text-muted-foreground mt-2">Active contributors</p>
                    </CardContent>
                    <CardFooter>
                        <div className="flex -space-x-2 overflow-hidden">
                            {project.users.slice(0, 5).map((user, index) => (
                                <Avatar key={user.id} className="inline-block border-2 border-background">
                                    <AvatarImage src={`https://i.pravatar.cc/150?u=${user.id}`} alt={`${user.firstName} ${user.lastName}`} />
                                    <AvatarFallback>{user.firstName[0]}{user.lastName[0]}</AvatarFallback>
                                </Avatar>
                            ))}
                            {project.users.length > 5 && (
                                <Avatar className="inline-block border-2 border-background">
                                    <AvatarFallback>+{project.users.length - 5}</AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-4 h-4 text-yellow-500"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{averageRating.toFixed(1)}</div>
                        <p className="text-xs text-muted-foreground mt-2">
                            From {project.feedbacks.length} feedbacks
                        </p>
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Project Progress</CardTitle>
                    <CardDescription>Task status breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={taskStatusData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Completed" fill="#8884d8" />
                            <Bar dataKey="In Progress" fill="#82ca9d" />
                            <Bar dataKey="Pending" fill="#ffc658" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest updates on the project</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-8">
                        {project.tasks.slice(-3).reverse().map((task) => (
                            <div key={task.id} className="flex items-center">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">{task.title}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {task.status} - Assigned to {project.users.find(u => u.id === task.assigneeId)?.firstName}
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function ProjectAnalysis({ project }) {
    return (
        <div className="space-y-6">
            {project.analyses.map((analysis) => (
                <Card key={analysis.id} className="overflow-hidden">
                    <CardHeader className="border-b bg-muted/20 pb-4">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg font-semibold">{analysis.title}</CardTitle>
                            <Badge variant={analysis.overallRating >= 4 ? "success" : analysis.overallRating >= 3 ? "warning" : "destructive"}>
                                {analysis.overallRating.toFixed(1)}
                            </Badge>
                        </div>
                        <CardDescription className="mt-1.5">{analysis.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="mb-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Overall Rating</span>
                                <div className="flex items-center">
                                    {analysis.overallRating >= 4 ? (
                                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                    ) : analysis.overallRating >= 3 ? (
                                        <AlertTriangle className="mr-2 h-4 w-4 text-yellow-500" />
                                    ) : (
                                        <TrendingUp className="mr-2 h-4 w-4 text-red-500" />
                                    )}
                                    <span className="font-semibold">{analysis.overallRating.toFixed(1)}</span>
                                </div>
                            </div>
                            <Progress
                                value={analysis.overallRating * 10}
                                className="h-2 w-full"
                                indicatorcolor={
                                    analysis.overallRating >= 4 ? "bg-green-500" :
                                        analysis.overallRating >= 3 ? "bg-yellow-500" : "bg-red-500"
                                }
                            />
                        </div>
                        <div className="mb-6">
                            <h4 className="mb-2 text-sm font-semibold">Rating Distribution</h4>
                            <ResponsiveContainer width="100%" height={120}>
                                <BarChart data={[
                                    { name: '1', value: 5 },
                                    { name: '2', value: 8 },
                                    { name: '3', value: 12 },
                                    { name: '4', value: 18 },
                                    { name: '5', value: 7 },
                                ]}>
                                    <XAxis dataKey="name" />
                                    <YAxis hide />
                                    <Tooltip />
                                    <Bar dataKey="value" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center">
                                <CalendarDays className="mr-2 h-4 w-4" />
                                <span>Created: {new Date(analysis.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center">
                                <CalendarDays className="mr-2 h-4 w-4" />
                                <span>Updated: {new Date(analysis.updatedAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="bg-muted/10 flex justify-between">
                        <Button variant="outline">View Details</Button>
                        <Button>Take Action</Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}

function ProjectTasks({ project }) {
    const [filter, setFilter] = useState("all")

    const filteredTasks = project.tasks.filter(task => {
        if (filter === "all") return true
        return task.status.toLowerCase() === filter
    })

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "completed": return "bg-green-500"
            case "in progress": return "bg-blue-500"
            case "pending": return "bg-yellow-500"
            default: return "bg-gray-500"
        }
    }

    const getPriorityColor = (priority) => {
        switch (priority.toLowerCase()) {
            case "high": return "text-red-500"
            case "medium": return "text-yellow-500"
            case "low": return "text-green-500"
            default: return "text-gray-500"
        }
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Project Tasks</CardTitle>
                    <CardDescription>Manage and track your project tasks</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="all" className="w-full">
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="all" onClick={() => setFilter("all")}>All</TabsTrigger>
                            <TabsTrigger value="completed" onClick={() => setFilter("completed")}>Completed</TabsTrigger>
                            <TabsTrigger value="in progress" onClick={() => setFilter("in progress")}>In Progress</TabsTrigger>
                            <TabsTrigger value="pending" onClick={() => setFilter("pending")}>Pending</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </CardContent>
            </Card>

            {filteredTasks.map((task) => (
                <Card key={task.id} className="overflow-hidden">
                    <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                            <div>
                                <CardTitle className="text-lg font-semibold">{task.title}</CardTitle>
                                <CardDescription className="mt-1">{task.description}</CardDescription>
                            </div>
                            <Badge className={`${getStatusColor(task.status)} text-white`}>{task.status}</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            <div className="flex items-center">
                                <Flag className={`mr-2 h-4 w-4 ${getPriorityColor(task.priority)}`} />
                                <span className="text-sm font-medium">{task.priority} Priority</span>
                            </div>
                            <div className="flex items-center">
                                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{new Date(task.deadline).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center">
                                <User className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">
                                    {project.users.find(u => u.id === task.assigneeId)?.firstName || 'Unassigned'}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{new Date(task.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                        <Progress
                            value={task.status === "Completed" ? 100 : task.status === "In Progress" ? 50 : 0}
                            className="mt-4"
                        />
                    </CardContent>
                    <CardFooter className="bg-muted/10 flex justify-between">
                        <div className="flex items-center space-x-2">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={`https://i.pravatar.cc/150?u=${task.assigneeId}`} />
                                <AvatarFallback>{project.users.find(u => u.id === task.assigneeId)?.firstName[0]}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">
                                {project.users.find(u => u.id === task.assigneeId)?.firstName} {project.users.find(u => u.id === task.assigneeId)?.lastName}
                            </span>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit Task</DropdownMenuItem>
                                <DropdownMenuItem>Change Status</DropdownMenuItem>
                                <DropdownMenuItem>Delete Task</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}

export default function Dashboard() {
    const [selectedProject, setSelectedProject] = useState(mockProjects[0])
    const [activeTab, setActiveTab] = useState("overview")

    return (
        <div className="flex h-screen ">
            <Sidebar projects={mockProjects} onSelectProject={setSelectedProject} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className=" border-b px-6 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-semibold">Welcome back, {selectedProject.users[0].firstName}!</h1>
                        <div className="flex items-center space-x-4">
                            <Button variant="ghost" size="icon">
                                <Bell className="h-5 w-5" />
                            </Button>
                            <Avatar>
                                <AvatarImage src="/placeholder.svg" alt={selectedProject.users[0].firstName} />
                                <AvatarFallback>{selectedProject.users[0].firstName[0]}</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Take a look at your project overview</p>
                </header>
                <nav className=" border-b px-6 py-2">
                    <div className="flex space-x-4">
                        {["Overview", "Analysis", "Tasks"].map((tab) => (
                            <Button
                                key={tab}
                                variant={activeTab === tab.toLowerCase() ? "default" : "ghost"}
                                onClick={() => setActiveTab(tab.toLowerCase())}
                            >
                                {tab}
                            </Button>
                        ))}
                    </div>
                </nav>
                <main className="flex-1 overflow-auto p-6">
                    {activeTab === "overview" && <ProjectOverview project={selectedProject} />}
                    {activeTab === "analysis" && <ProjectAnalysis project={selectedProject} />}
                    {activeTab === "tasks" && <ProjectTasks project={selectedProject} />}
                </main>
            </div>
        </div>
    )
}