import { Button, Container, Paper, Stack } from "@mui/material"
import LogoutForm from "../ui/logout-form"
import { Suspense } from "react"
import Link from "next/link"

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense>
      <Container sx={{ height: '100vh' }}>
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
          <Stack direction="row" justifyContent="flex-start" spacing={2}>
            <Button variant="text" >
              <Link href="/home">Home</Link>
            </Button>
            <Button variant="text">
              <Link href="/home/dashboard">Dashboard</Link>
            </Button>
          </Stack>
          <Stack direction="row" justifyContent="flex-end">
            <LogoutForm />
          </Stack>
        </Stack>
        <Paper sx={{ p: 2 }}>
          <div>{children}</div>
        </Paper>
      </Container>
    </Suspense>
  )
}