import type { ComponentProps } from 'react'
import { AppSidebarHeader } from '#/components/app-sidebar-header'
import { Sidebar } from '#/components/ui/sidebar'
import { AppSidebarContent } from '#/components/app-sidebar-content'
import { AppSidebarFooter } from '#/components/app-sidebar-footer'

type AppSidebarProps = ComponentProps<typeof Sidebar>

export const AppSidebar = ({ ...props }: AppSidebarProps) => {
  return (
    <Sidebar {...props}>
      <AppSidebarHeader />

      <AppSidebarContent />

      <AppSidebarFooter />
    </Sidebar>
  )
}
