import { NextResponse } from 'next/server'
import { OpenAI } from 'openai'
import { prisma } from '@/lib/prisma';

const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: apiKey
});

export async function POST(request: Request) {
  if (!apiKey) {
    return NextResponse.json({ error: "OpenAI API key not configured" }, { status: 500 })
  }

  try {
    const { projectId, feedbacks} = await request.json()
    const userId = request.headers.get('x-user-id');

    if (!userId) {
        return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    if (!feedbacks || !Array.isArray(feedbacks)) {
      return NextResponse.json({ error: "Invalid feedbacks data" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
        where: {id: userId}
    });

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
        {
        role: "system",
        content: "You are an AI assistant that analyzes customer feedback and ALWAYS provides a summary in valid JSON format. Your analysis must be detailed and include specific metrics and patterns found in the feedback."
        },
        {
        role: "user",
        content: `Analyze the following customer feedback and provide a summary in JSON format that MUST match this exact structure:
            {
            "title": "Brief title summarizing the overall feedback",
            "description": "Detailed analysis of the feedback, including main points and trends",
            "overallRating": "Average rating as a float",
            "diagramData": {
                "ratingDistribution": {
                "5-star": {"count": 0, "keywords": [], "commonThemes": []},
                "4-star": {"count": 0, "keywords": [], "commonThemes": []},
                "3-star": {"count": 0, "keywords": [], "commonThemes": []},
                "2-star": {"count": 0, "keywords": [], "commonThemes": []},
                "1-star": {"count": 0, "keywords": [], "commonThemes": []}
                },
                "sentimentBreakdown": {
                "positive": {"count": 0, "examples": []},
                "neutral": {"count": 0, "examples": []},
                "negative": {"count": 0, "examples": []}
                },
                "topIssues": [
                {"issue": "", "frequency": 0, "averageRating": 0.0}
                ],
                "improvementAreas": [
                {"area": "", "mentionCount": 0, "relatedFeedback": []}
                ]
            }
            }

            Ensure all numeric values are numbers, not strings. Arrays should contain actual data, not placeholder text.
            Parse and analyze this feedback: ${JSON.stringify(feedbacks)}`
        }
    ],
    temperature: 0.7, // Add some creativity while keeping structure
    response_format: { type: "json_object" } // Ensure JSON response
    })

    const result = JSON.parse(completion.choices[0].message?.content || '{}')
    console.log(result)
    const analysisResult = {
      title: result.title,
      description: result.description,
      overallRating: result.overallRating,
      diagramData: result.diagramData,
      projectRoomId: projectId, 
      createdBy: user.firstName + " " + user.lastName,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    console.log(analysisResult)
    
    return NextResponse.json(analysisResult)
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error with OpenAI API request: ${error.message}`)
      return NextResponse.json({ error: error.message }, { status: 500 })
    } else {
      console.error(`Unknown error occurred: ${String(error)}`)
      return NextResponse.json({ error: 'An unknown error occurred during your request.' }, { status: 500 })
    }
  }
}