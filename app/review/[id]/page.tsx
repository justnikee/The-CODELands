import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import ReviewDetails from '@/components/review-details'
import { Skeleton } from '@/components/ui/skeleton'

export default function ReviewPage({ params }: { params: { id: string } }) {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Review Details</h1>
      <Suspense fallback={<Skeleton className="w-full h-64" />}>
        <ReviewDetails id={params.id} />
      </Suspense>
    </main>
  )
}