import { AppSidebar } from '#/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '#/components/ui/sidebar'
import { AppLeftNavbar, AppRightNavbar } from '#/components/app-navbar'

export const SidebarWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppLeftNavbar />
      <AppRightNavbar />

      <AppSidebar variant="sidebar" />

      <SidebarInset className="relative flex h-svh w-full flex-1 flex-col overflow-hidden transition-[width,height]">
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
