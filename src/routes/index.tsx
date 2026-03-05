import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
  beforeLoad: ({ context, location }) => {
    if (!context.auth) {
      throw redirect({
        from: '/',
        to: '/login',
        search: { redirect_to: location.href },
        viewTransition: true,
      })
    }

    return { auth: context.auth }
  },
})

function App() {
  return (
    <div>
      <h1>App</h1>
    </div>
  )
}
