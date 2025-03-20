import { deleteImage } from "@/app/lib/actions"
import { deleteRecord, updateRecord } from "@/app/lib/data"
import { NextRequest, NextResponse } from "next/server"

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const data = await request.json()
  const { id } = await params

  updateRecord(id, data.ai_text, data.text)

  return NextResponse.json({ message: 'PUT request to the dashboard' })
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  deleteImage(id)
  deleteRecord(id)

  return NextResponse.json({ message: 'DELETE request to the dashboard' })
}
