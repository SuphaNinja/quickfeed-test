import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    
    if (!userId) {
      console.error('User ID not found in request headers');
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        isSubscribed: true,
        createdAt: true,
        updatedAt: true,
        projectRooms: {
          select: {
            id: true,
            inviteUrl: true,
            createdAt: true,
            updatedAt: true,
            project: {
              select: {
                id: true,
                name: true,
                description: true,
                createdAt: true,
                updatedAt: true
              }
            },
            admins: {
              where: {
                userId: userId
              },
              select: {
                id: true,
              }
            }
          }
        }
      },
    });

    if (!user) {
      console.error(`User not found for ID: ${userId}`);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Transform the data to include isAdmin flag
    const transformedUser = {
      ...user,
      projectRooms: user.projectRooms.map(room => ({
        ...room,
        isAdmin: room.admins.length > 0,
        admins: undefined // Remove the admins array from the response
      }))
    };

    return NextResponse.json(transformedUser);

  } catch (error) {
    console.error('Error in GET /api/user/me:', error);
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}