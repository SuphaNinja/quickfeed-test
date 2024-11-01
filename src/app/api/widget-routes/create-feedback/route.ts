import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  

  try {
   const { description, name, rating, projectId } = await request.json()

   if (!description)
    
  } catch (error) {
    return NextResponse.json({ error: 'An unknown error occurred during your request.' }, { status: 500 })
  }
}