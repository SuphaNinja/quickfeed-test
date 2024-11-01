"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Bar, Pie, Line } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
)

// Mock data
const ratingDistribution = [
    { name: "5 Stars", value: 45 },
    { name: "4 Stars", value: 30 },
    { name: "3 Stars", value: 15 },
    { name: "2 Stars", value: 7 },
    { name: "1 Star", value: 3 },
]

const sentimentBreakdown = [
    { name: "Positive", value: 65 },
    { name: "Neutral", value: 20 },
    { name: "Negative", value: 15 },
]

const topIssues = [
    { issue: "Slow Performance", frequency: 50, averageRating: 2.5 },
    { issue: "UI Confusion", frequency: 30, averageRating: 3.2 },
    { issue: "Missing Features", frequency: 20, averageRating: 3.8 },
    { issue: "Bugs", frequency: 15, averageRating: 2.1 },
    { issue: "Poor Support", frequency: 10, averageRating: 1.9 },
]

const ratingTrends = [
    { date: "2023-01", averageRating: 3.5 },
    { date: "2023-02", averageRating: 3.7 },
    { date: "2023-03", averageRating: 3.9 },
    { date: "2023-04", averageRating: 4.1 },
    { date: "2023-05", averageRating: 4.0 },
    { date: "2023-06", averageRating: 4.2 },
]

const keywordAnalysis = [
    { keyword: "Fast", frequency: 80, sentiment: "Positive", averageRating: 4.5 },
    { keyword: "Intuitive", frequency: 60, sentiment: "Positive", averageRating: 4.2 },
    { keyword: "Buggy", frequency: 40, sentiment: "Negative", averageRating: 2.1 },
    { keyword: "Expensive", frequency: 30, sentiment: "Negative", averageRating: 2.8 },
    { keyword: "Helpful", frequency: 50, sentiment: "Positive", averageRating: 4.0 },
]

export default function AnalysisDashboard() {
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
        },
    }

    const ratingDistributionData = {
        labels: ratingDistribution.map(item => item.name),
        datasets: [
            {
                data: ratingDistribution.map(item => item.value),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                ],
            },
        ],
    }

    const sentimentBreakdownData = {
        labels: sentimentBreakdown.map(item => item.name),
        datasets: [
            {
                data: sentimentBreakdown.map(item => item.value),
                backgroundColor: [
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(255, 99, 132, 0.8)',
                ],
            },
        ],
    }

    const topIssuesData = {
        labels: topIssues.map(item => item.issue),
        datasets: [
            {
                label: 'Frequency',
                data: topIssues.map(item => item.frequency),
                backgroundColor: 'rgba(255, 99, 132, 0.8)',
            },
            {
                label: 'Average Rating',
                data: topIssues.map(item => item.averageRating),
                backgroundColor: 'rgba(54, 162, 235, 0.8)',
            },
        ],
    }

    const ratingTrendsData = {
        labels: ratingTrends.map(item => item.date),
        datasets: [
            {
                label: 'Average Rating',
                data: ratingTrends.map(item => item.averageRating),
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    }

    const keywordAnalysisData = {
        labels: keywordAnalysis.map(item => item.keyword),
        datasets: [
            {
                label: 'Frequency',
                data: keywordAnalysis.map(item => item.frequency),
                backgroundColor: 'rgba(255, 99, 132, 0.8)',
            },
            {
                label: 'Average Rating',
                data: keywordAnalysis.map(item => item.averageRating),
                backgroundColor: 'rgba(54, 162, 235, 0.8)',
            },
        ],
    }

    return (
        <div className="space-y-8 p-8">
            <h1 className="text-3xl font-bold">Analysis Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Rating Distribution</CardTitle>
                        <CardDescription>Distribution of ratings from 1 to 5 stars</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <Pie data={ratingDistributionData} options={chartOptions} />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Sentiment Breakdown</CardTitle>
                        <CardDescription>Distribution of positive, neutral, and negative sentiments</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <Pie data={sentimentBreakdownData} options={chartOptions} />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Top Issues</CardTitle>
                        <CardDescription>Frequency and average rating of top issues</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <Bar data={topIssuesData} options={chartOptions} />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Rating Trends</CardTitle>
                        <CardDescription>Average rating over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <Line data={ratingTrendsData} options={chartOptions} />
                        </div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Keyword Analysis</CardTitle>
                        <CardDescription>Frequency, sentiment, and average rating of key terms</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[400px]">
                            <Bar data={keywordAnalysisData} options={chartOptions} />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}