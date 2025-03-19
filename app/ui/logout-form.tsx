'use client';

import { useActionState } from 'react';
import { signOutUser } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';
import { Button, Input } from '@mui/material';

export default function LogoutForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/login';
  const [_, formAction] = useActionState(
    signOutUser,
    undefined,
  );

  return (
    <form action={formAction}>
      <Input type="hidden" name="redirectTo" value={callbackUrl} />
      <Button type="submit" variant="outlined">Logout</Button>
    </form>
  );
}
