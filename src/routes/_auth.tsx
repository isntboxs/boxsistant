import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { z } from 'zod'
import { zodValidator } from '@tanstack/zod-adapter'
import { validateCallbackUrl } from '#/utils/validate-callback-url'

const loginRouterSchema = z.object({
  redirect_to: z.string().default('/'),
})

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
  validateSearch: zodValidator(loginRouterSchema),
  beforeLoad: ({ context, search }) => {
    const safeCallbackUrl = validateCallbackUrl(search.redirect_to)

    if (context.auth) {
      throw redirect({
        to: safeCallbackUrl,
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
