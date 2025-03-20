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
        INSERT INTO records (user_id, text, image_path)
        VALUES (${userId}, ${text}, ${fileUrl})
      `;
  } catch (_error) {
    return 'Database Error: Failed to Register User.';
  }

  return sql`
    SELECT * FROM records WHERE user_id=${userId} AND image_path=${fileUrl}
  `
}

export async function getRecords(userId: string) {
  try {
    const records = await sql`
        SELECT * FROM records WHERE user_id=${userId} ORDER BY updated_at DESC
      `;

    return records;
  } catch (_error) {
    return NextResponse.json({ error: 'Database Error: Failed to Fetch Records.' }, { status: 500 });
  }
}

export async function updateRecord(recordId: string, ai_text: string, text?: string) {
  try {
    if (text) {
      await sql`
        UPDATE records SET ai_text=${ai_text}, text=${text}, updated_at=${new Date()} WHERE id=${recordId}
      `;
    } else {
      await sql`
        UPDATE records SET ai_text=${ai_text}, updated_at=${new Date()} WHERE id=${recordId}
      `;
    }
  } catch (_error) {
    console.log(_error)
    return 'Database Error: Failed to Update Record.';
  }

  return 'Ok';
}

export async function deleteRecord(recordId: string) {
  try {
    await sql`
        DELETE FROM records WHERE id=${recordId}
      `;
  } catch (_error) {
    console.log(_error)
    return 'Database Error: Failed to Delete Record.';
  }

  return 'Ok';
}

export async function getRecord(recordId: string) {
  try {
    const record = await sql`
        SELECT * FROM records WHERE id=${recordId}
      `;

    return record;
  } catch (_error) {
    return 'Database Error: Failed to Fetch Record.';
  }
}