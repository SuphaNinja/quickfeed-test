import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    console.log("id from params", id)
    // Verify that the user is authenticated
    const userId = request.headers.get('x-user-id');
    if (!userId) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    // Fetch the ProjectRoom with related data
    const projectRoom = await prisma.projectRoom.findUnique({
      where: { id },
      include: {
        project: true,
        users: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          }
        },
        admins: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              }
            }
          }
        }
      }
    });

    if (!projectRoom) {
      return NextResponse.json({ error: "ProjectRoom not found" }, { status: 404 });
    }

    // Check if the authenticated user is a member of the ProjectRoom
    const isMember = projectRoom.users.some(user => user.id === userId);
    if (!isMember) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    // Determine if the authenticated user is an admin
    const isAdmin = projectRoom.admins.some(admin => admin.user.id === userId);

    // Prepare the response data
    const responseData = {
      ...projectRoom,
      isAdmin,
      admins: projectRoom.admins.map(admin => admin.user),
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error fetching ProjectRoom:', error);
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}