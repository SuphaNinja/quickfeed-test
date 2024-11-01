import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const addUserSchema = z.object({
    userId: z.string(),
});

export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const projectRoomId = params.id;
        const userId = request.headers.get('x-user-id');

        if (!userId) {
            return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
        }

        // Check if the current user is an admin of the project room
        


        const json = await request.json();
        const { userId: newUserId } = addUserSchema.parse(json);

        // Add the user to the project room
        

        
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors }, { status: 400 });
        }
        console.error('Error adding user to project room:', error);
        return NextResponse.json({ error: "Failed to add user to project room" }, { status: 500 });
    }
}