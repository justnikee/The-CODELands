'use client'

import { useForm } from 'react-hook-form'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'


import { useMutation, useQueryClient } from '@tanstack/react-query'

type FormData = {
  code: string
  language: string
}

export default function CodeReviewForm() {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>()

        const queryClient = useQueryClient();

        const mutation = useMutation({
          mutationFn: async (codeData: FormData): Promise<any> =>  {
            const res = await fetch('/api/review', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(codeData),
            })
            return res.json()
          },
          onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['reviews']});
          },
        })

  const onSubmit = (data: FormData) => {
    mutation.mutate(data)
    console.log(data)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Submit Code for Review</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Enter your code here..."
            {...register('code', { required: 'Code is required' })}
          />
          {errors.code && <p className="text-red-500">{errors.code.message}</p>}
          <Select {...register('language', { required: 'Language is required' })}
          onValueChange={(value) => setValue('language', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="java">Java</SelectItem>
            </SelectContent>
          </Select>
          {errors.language && <p className="text-red-500">{errors.language.message}</p>}
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Submitting...' : 'Submit for Review'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}