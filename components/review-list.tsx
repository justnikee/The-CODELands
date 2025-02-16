'use client'

import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import { Review } from '@/lib/types'

export default function ReviewList() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      // TODO: Replace with actual API call
      const response = await fetch('/api/reviews')
      const data = await response.json()
      setReviews(data)
      setIsLoading(false)
    }

    fetchReviews()
  }, [])

  if (isLoading) {
    return <Skeleton className="w-full h-64" />
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Code Snippet</TableHead>
          <TableHead>Language</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>AI Feedback Summary</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reviews.map((review) => (
          <TableRow key={review.id}>
            <TableCell>{review.codeSnippet.substring(0, 50)}...</TableCell>
            <TableCell>{review.language}</TableCell>
            <TableCell>{review.status}</TableCell>
            <TableCell>{review.feedbackSummary}</TableCell>
            <TableCell>{new Date(review.date).toLocaleDateString()}</TableCell>
            <TableCell>
              <Button asChild>
                <Link href={`/reviews/${review.id}`}>View</Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}