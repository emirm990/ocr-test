'use server';

import { z } from 'zod';
import postgres from 'postgres';
import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcrypt';
import { getRecord } from './data';
import { join } from 'path';
import { unlink } from 'fs';

const sql = postgres(process.env.POSTGRES_URL!);

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  name: z.string(),
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
      path: ['confirmPassword']
    });
  }
})

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function signOutUser() {
  await signOut();
}

export async function register(
  prevState: string | undefined,
  formData: FormData
) {
  // registration logic
  const validatedFields = RegisterSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
    name: formData.get('name'),
  });

  if (!validatedFields.success) {
    return 'Missing Fields or Incorrect data: Failed to Register User.';
  }

  try {
    const hashedPassword = await bcrypt.hash(validatedFields.data.password, 10);
    await sql`
      INSERT INTO users (email, password, name)
      VALUES (${validatedFields.data.email}, ${hashedPassword}, ${validatedFields.data.name})
    `;
  } catch (_error) {
    return 'Database Error: Failed to Register User.';
  }

  await authenticate(undefined, formData);
}

export async function deleteImage(recordId: string) {
  const record = await getRecord(recordId)

  if (!record || !Array.isArray(record) || record.length === 0) {
    return 'Record not found';
  }

  const path = record[0].image_path;
  const filePath = join(process.cwd(), path);
  // delete image
  console.log('deleting image', filePath);
  unlink(filePath, (err) => {
    if (err) {
      console.error(err);
    }
  });
}
