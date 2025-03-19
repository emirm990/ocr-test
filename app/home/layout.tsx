import { Container, Paper, Stack } from "@mui/material"
import LogoutForm from "../ui/logout-form"

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Container sx={{ height: '100vh' }}>
      <Stack direction="row" justifyContent="flex-end" sx={{ mb: 2 }}>
        <LogoutForm />
      </Stack>
      <Paper sx={{ p: 2 }}>
        <div>{children}</div>
      </Paper>
    </Container>
  )
}