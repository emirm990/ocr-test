'use client';

import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/home';
  const [errorMessage, formAction] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form action={formAction}>
      <div >
        <h1>
          Please log in to continue.
        </h1>
        <div>
          <label
            htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email address"
            required
          />
          <label
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Enter password"
            required
            minLength={6}
          />
          <input type="hidden" name="redirectTo" value={callbackUrl} />
          <button type="submit">
            Log in
          </button>
          <Link href="/register">
            Register
          </Link>
        </div>
        <div>
          {errorMessage && (<p>{errorMessage}</p>)}
        </div>
      </div>
    </form>
  );
}
