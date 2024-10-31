import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const projectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  description: z.string().min(1, 'Project description is required'),
});

export async function POST(request: NextRequest) {
  try {
    // The middleware has already verified the token and added the userId to the request headers
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    const json = await request.json();
    const { name, description } = projectSchema.parse(json);

    const result = await prisma.$transaction(async (prisma) => {
      const project = await prisma.project.create({
        data: {
          name,
          description,
          projectRoom: {
            create: {
              inviteUrl: `invite-${Math.random().toString(36).substr(2, 9)}`,
              users: {
                connect: { id: userId }
              },
              admins: {
                create: {
                  user: { connect: { id: userId } }
                }
              }
            }
          }
        },
        include: {
          projectRoom: {
            include: {
              users: true,
              admins: true
            }
          }
        }
      });

      return project;
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