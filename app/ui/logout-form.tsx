'use client';

import { useActionState } from 'react';
import { signOutUser } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';

export default function LogoutForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/login';
  const [_, formAction] = useActionState(
    signOutUser,
    undefined,
  );

  return (
    <form action={formAction}>
      <input type="hidden" name="redirectTo" value={callbackUrl} />
      <button type="submit">Logout</button>
    </form>
  );
}
