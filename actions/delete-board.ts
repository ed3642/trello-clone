'use server'

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteBoard(id: string) {
  // artificial wait to see the loading state
  //await new Promise((resolve) => setTimeout(resolve, 2000))
  await db.board.delete({
    where: {
      id
    }
  })

  revalidatePath('/organization/org_2g1ZxBPxhQh3YCW5nZZrmWnR2yc')
}