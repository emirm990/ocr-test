import LogoutForm from "../ui/logout-form"

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <LogoutForm />
      <div>{children}</div>
    </div>
  )
}