import ReviewList from "@/components/review-list"

export default function ReviewsPage() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Code Reviews</h1>
      <ReviewList />
    </main>
  )
}