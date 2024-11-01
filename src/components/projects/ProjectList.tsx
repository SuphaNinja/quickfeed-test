"use client"

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import DeleteProjectBtn from "./DeleteProjectBtn";
import { useState } from "react";
import { useAuth } from "@/providers/QueryProvider";
import ProjectCard from "./ProjectCard";

const ProjectsList = () => {
    const { currentUser, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!currentUser) {
        return <div>Please log in to view your projects.</div>;
    }

    const projectRooms = currentUser.projectRoomsUser || [];

    return (
        <div className="my-10">
            {projectRooms.length === 0 ? (
                <NoProjects />
            ) : (
                <ul className="flex md:flex-row flex-col gap-4">
                    {projectRooms.map((room: any) => (
                        <ProjectCard
                            key={room.projectRoomId}
                            title={room.projectRoom.title}
                            description={room.projectRoom.description}
                            roomId={room.projectRoomId}
                        />
                    ))}
                    {currentUser.isSubscribed && <PayWall />}
                </ul>
            )}
        </div>
    );
};
export default ProjectsList;

const NoProjects = () => {
    return (
        <main className="flex items-center justify-center flex-col md:h-[calc(100dvh-400px)]  h-[calc(100dvh-200px)] ">
            <h1 className="text-2xl mt-4 fontbold">
                No Projects found 👀
            </h1>
        </main>
    );
};

const PayWall = () => {
    return (
        <li className="bg-transparent">
            <Card className="flex flex-col h-[200px] bg-transparent border border-[#CED4DA] dark:border-[#131314] rounded-md md:w-[400px] w-full overflow-hidden ">
                <CardHeader className="flex-1">
                    <div className="flex justify-between relative">
                        <CardTitle className="text-[#343A40] dark:text-[#F8F9FA]">Upgrade to Pro</CardTitle>
                        <div className="bg-blue-500 size-20 blur-[40px] absolute right-0 -top-10 -z-[-1]" />
                    </div>
                    <CardDescription>
                        <p>Get access to all features</p>
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button>this is gonna be subscribe button</Button>
                </CardFooter>
            </Card>
        </li>
    );
};