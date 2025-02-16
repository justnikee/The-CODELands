import CodeReviewForm from "@/components/code-review-form"

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">AI Code Review</h1>
      <CodeReviewForm />
    </main>
  )
}