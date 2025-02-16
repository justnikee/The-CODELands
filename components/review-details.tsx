'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Review } from '@/lib/types'

export default function ReviewDetails({ id }: { id: string }) {
  const [review, setReview] = useState<Review | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchReview = async () => {
      // TODO: Replace with actual API call
      const response = await fetch(`/api/reviews/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch review')
      }
      const data = await response.json()
      setReview(data)
      setIsLoading(false)
    }

    fetchReview()
  }, [id])

  if (isLoading) {
    return <Skeleton className="w-full h-64" />
  }

  if (!review) {
    return <div>Review not found</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Code Review</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Code Snippet</h3>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code>{review.codeSnippet}</code>
          </pre>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">AI Feedback</h3>
          <p>{review.feedback}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Details</h3>
          <p>Language: {review.language}</p>
          <p>Status: {review.status}</p>
          <p>Submitted: {new Date(review.date).toLocaleString()}</p>
        </div>
      </CardContent>
    </Card>
  )
}