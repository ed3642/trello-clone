'use server'

import { z } from 'zod'

import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export type State = {
  errors?: {
    title?: string[];
  },
  message?: string | null;
}

const CreateBoard = z.object({
  title: z.string().min(3, {
    message: 'Title must be at least 3 characters long'
  })
})

export async function create(prevState: State, formData: FormData) {

  const validatedFields = CreateBoard.safeParse({
    title: formData.get('title'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields"
    }
  }

  const { title } = validatedFields.data

  try {
    // artificial wait to see the loading state
    //await new Promise((resolve) => setTimeout(resolve, 2000))
    await db.board.create({
      data: {
        title
      }
    })
  } catch (error) {
    return {
      message: 'Database error'
    }
  }


  revalidatePath('/organization/org_2g1ZxBPxhQh3YCW5nZZrmWnR2yc')
  redirect('/organization/org_2g1ZxBPxhQh3YCW5nZZrmWnR2yc')
}