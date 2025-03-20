import { createNewRecord } from "@/app/lib/data";
import { auth, getUser } from "@/auth";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

import { join } from "path";

export async function POST(request: NextRequest) {
  const session = await auth()
  const email = session?.user?.email

  if (!email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const user = await getUser(email)

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get('image') as File
  const text = formData.get('text') as string

  const buffer = Buffer.from(await file.arrayBuffer())
  const uploadDir = join(process.cwd(), '/public/uploads')
  try {

    await writeFile(`${uploadDir}/${file.name}`, buffer)

    const fileUrl = `public/uploads/${file.name}`
    const record = await createNewRecord(user.id, fileUrl, text)

    return Response.json({ status: record, fileUrl, text})
  } catch (e) {
    console.log(e)
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    )
  }
}
