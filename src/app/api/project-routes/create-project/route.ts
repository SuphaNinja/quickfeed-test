import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';


export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    const { title, description, url } = await request.json();

    if (!title || !description || !url) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { id: userId },
        select: { id: true, firstName: true, lastName: true, email: true, image: true }
      });

      if (!user) {
        throw new Error("User not found");
      }

      const projectRoom = await tx.projectRoom.create({
        data: {
          title,
          description,
          url,
          users: {
            create: {
              userId: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              image: user.image,
              role: "admin"
            }
          }
        },
        include: {
          users: true
        }
      });

      return projectRoom;
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}