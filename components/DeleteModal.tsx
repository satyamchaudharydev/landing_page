"use client"
import { handleDelete } from "@/lib/deletePage"

export const DeleteButton = ({id}: {id: string}) => {
    return (
      <button onClick={() => handleDelete(id)}>Delete</button>
    )
  }