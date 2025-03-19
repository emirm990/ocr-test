'use client';

import { useActionState } from 'react';
import { register } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';
import { Button, Container, Grid2, Paper, Stack, TextField, Typography } from '@mui/material';
import Link from 'next/link';

export default function RegisterForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/home';
  const [errorMessage, formAction] = useActionState(
    register,
    undefined,
  );

  return (
    <Container sx={{ height: '100vh' }}>
      <Grid2 container justifyContent="center" alignItems="center" spacing={2} sx={{ height: '100%' }}>
        <form action={formAction} className="space-y-3">
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2}}>
              Please register to continue.
            </Typography>
            <input type="hidden" name="redirectTo" value={callbackUrl} />
            <Stack spacing={2}>
              <TextField
                type="text"
                name="email"
                label="Email"
                required
              />
              <TextField
                type="password"
                name="password"
                label="Password"
                required
                slotProps={{
                  htmlInput: { minLength: 6 },
                }}
              />
              <TextField
                type="password"
                name="confirmPassword"
                label="Confirm Password"
                required
                slotProps={{
                  htmlInput: { minLength: 6 },
                }}
              />
              <TextField
                type="text"
                name="name"
                label="Name"
              />
              <Button
                type="submit"
                variant="contained"
              >
                Register
              </Button>
              <Button variant="text">
                <Link href="/login">
                  Log in
                </Link>
              </Button>
            </Stack>
            {errorMessage && <p>{errorMessage}</p>}
          </Paper>
        </form>
      </Grid2>
    </Container>
  );
}
