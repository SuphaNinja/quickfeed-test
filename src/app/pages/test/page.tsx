"use client"

import { Button } from '@/components/ui/button'
import { useAuth } from '@/providers/QueryProvider'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

interface FeedbacksProps {
    message: string;
    rating: number;
    name: string;
    createdAt: Date;
}

const feedbacks: FeedbacksProps[] = [
    {
        message: "Really good delivery time but the button on the home page doesn't work. I tried clicking it several times and nothing happened. Otherwise, the site looks great!",
        rating: 5,
        name: "Adam A",
        createdAt: new Date("2023-06-15T09:30:00.000Z")
    },
    {
        message: "The product quality was disappointing. It didn't match the description on the website. The customer service was helpful, but couldn't fully resolve my issues.",
        rating: 2,
        name: "Jessica B",
        createdAt: new Date("2023-06-14T14:45:00.000Z")
    },
    {
        message: "The new feature is intuitive and easy to use. It has significantly improved my workflow. However, it would be great if there was a tutorial for new users.",
        rating: 3,
        name: "Kalle C",
        createdAt: new Date("2023-06-13T11:20:00.000Z")
    },
    {
        message: "The mobile app is much improved after the recent update. It's faster and more responsive. The new dark mode is a great addition, but there are still some minor bugs.",
        rating: 4,
        name: "Abdi B",
        createdAt: new Date("2023-06-12T16:55:00.000Z")
    },
    {
        message: "Exceptional customer service! The support team went above and beyond to solve my problem. They were patient, knowledgeable, and followed up to ensure everything was resolved.",
        rating: 5,
        name: "Anna T",
        createdAt: new Date("2023-06-11T10:15:00.000Z")
    },
    {
        message: "The checkout process is frustrating and overly complicated. I abandoned my cart because it was too difficult to complete the purchase. Please simplify this process.",
        rating: 1,
        name: "Noel K",
        createdAt: new Date("2023-06-10T13:40:00.000Z")
    }
];


export default function CreateNewAnalysis() {
    const { token } = useAuth()
    const projectId = "cm2yp2yp600028iy9zqhe47nx"
    const sendData = useMutation({
        mutationFn: () => axios.post("/api/openai-routes/create-new-analysis", {feedbacks: feedbacks, projectId: projectId}, {
            headers: {"x-access-token" : token}
        }),
        onSuccess: (data) => console.log(data)
    })

  return (
    <div>

    <Button onClick={()=> sendData.mutate()}>
        testsend and see what we get back
    </Button>
    </div>
  )
}

