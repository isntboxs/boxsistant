import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { SidebarWrapper } from '#/components/sidebar-wrapper'

export const Route = createFileRoute('/_main')({
  component: RouteComponent,
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

function RouteComponent() {
  return (
    <SidebarWrapper>
      <Outlet />
    </SidebarWrapper>
  )
}
