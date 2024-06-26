'use server'

import { auth } from '@clerk/nextjs/server'

import { db } from '@/lib/db'
import { InputType, ReturnType } from './types'
import { revalidatePath } from 'next/cache'
import { createSafeAction } from '@/lib/create-safe-action'
import { CreateBoard } from './schema'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = auth()

  if (!userId) {
    return {
      error: 'User not authenticated',
    }
  }

  const { title } = data

  let board

  try {
    board = await db.board.create({
      data: {
        title,
      },
    })
  } catch (error) {
    return {
      error: 'Database error',
    }
  }

  revalidatePath(`/boards/${board.id}`)

  return {
    data: board,
  }
}

export const createBoard = createSafeAction(CreateBoard, handler)
