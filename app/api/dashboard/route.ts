import { getRecords } from "@/app/lib/data";
import { auth, getUser } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth()
  const email = session?.user?.email

  if (!email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const user = await getUser(email)

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const records = await getRecords(user.id);

    return NextResponse.json({ records });
  } catch (e) {
    console.log(e)
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    )
  }
}
