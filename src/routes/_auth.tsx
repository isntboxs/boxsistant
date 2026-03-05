import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { z } from 'zod'
import { zodValidator } from '@tanstack/zod-adapter'
import { validateCallbackUrl } from '#/utils/validate-callback-url'

const loginRouterSchema = z.object({
  redirect_to: z.string().default('/').transform(validateCallbackUrl),
})

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
  validateSearch: zodValidator(loginRouterSchema),
  beforeLoad: ({ context, search }) => {
    if (context.auth) {
      throw redirect({
        to: search.redirect_to,
        viewTransition: true,
      })
    }
  },
})

function RouteComponent() {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <Outlet />
    </div>
  )
}
