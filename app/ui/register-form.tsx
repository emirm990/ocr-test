'use client';

import { useActionState } from 'react';
import { register } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';

export default function RegisterForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/home';
  const [errorMessage, formAction] = useActionState(
    register,
    undefined,
  );

  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="redirectTo" value={callbackUrl} />
      <label htmlFor="email">
        Email
      </label>
      <input type="text" name="email" required placeholder="Enter your email address" />
      <label htmlFor="password">
        Password
      </label>
      <input type="password" name="password" required placeholder="Enter password" />
      <label htmlFor="confirmPassword">
        Confirm Password
      </label>
      <input type="password" name="confirmPassword" required placeholder="Confirm entered password" />
      <label htmlFor="name">
        Name
      </label>
      <input type="text" name="name" placeholder="Enter name" />
      <button type="submit">Submit</button>
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
}
