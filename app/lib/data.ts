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
