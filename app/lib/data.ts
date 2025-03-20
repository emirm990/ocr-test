import { NextResponse } from "next/server";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!);

export async function createNewRecord(userId: string, fileUrl: string, text: string) {

  // This is a placeholder for a database call
  if (!userId) {
    return 'Unauthorized';
  }

  try {
    await sql`
        INSERT INTO records (user_id, text, imagePath)
        VALUES (${userId}, ${text}, ${fileUrl})
      `;
  } catch (_error) {
    return 'Database Error: Failed to Register User.';
  }

  return 'Ok';
}

export async function getRecords(userId: string) {
  try {
    const records = await sql`
        SELECT * FROM records WHERE user_id=${userId}
      `;
    return records;
  } catch (_error) {
    return NextResponse.json({ error: 'Database Error: Failed to Fetch Records.' }, { status: 500 });
  }
}