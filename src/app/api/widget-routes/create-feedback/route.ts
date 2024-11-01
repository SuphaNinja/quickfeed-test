/* import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';


export async function POST(request: Request) {
  try {
    // Parse and validate the request body
    const body = await request.json();

    // Check if the project exists
    const project = await prisma.projectRoom.findUnique({
      where: { id: body.projectId },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Create the feedback
    const feedback = await prisma.feedback.create({
      data: {

      },
    });



    return NextResponse.json(feedback, { status: 201 });

  } catch (error) {
    return NextResponse.json({ error: 'An unknown error occurred during your request.' }, { status: 500 });
  }
} */