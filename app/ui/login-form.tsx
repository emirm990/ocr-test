'use client';

import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Box, Button, Container, FormLabel, Grid2, Input, Paper, Stack, TextField, Typography } from '@mui/material';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/home';
  const [errorMessage, formAction] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <Container sx={{ height: '100vh' }}>
      <Grid2 container justifyContent="center" alignItems="center" spacing={2} sx={{ height: '100%' }}>
        <form action={formAction}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2}}>
              Please log in to continue.
            </Typography>
            <Stack spacing={2}>
              <Stack>
                <TextField
                  id="email"
                  type="email"
                  name="email"
                  label="Email"
                  required
                />
              </Stack>
              <Stack spacing={2}>
                <TextField
                  id="password"
                  type="password"
                  name="password"
                  label="Password"
                  required
                  slotProps={{
                    htmlInput: { minLength: 6 },
                  }}
                />
              </Stack>
              <input type="hidden" name="redirectTo" value={callbackUrl} />
              <Button type="submit" variant="contained">
                Log in
              </Button>
              <Button variant="text">
                <Link href="/register">
                  Register
                </Link>
              </Button>
            </Stack>
            <div>
              {errorMessage && (<p>{errorMessage}</p>)}
            </div>
          </Paper>
        </form>
      </Grid2>
    </Container>
  );
}
