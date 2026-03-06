import type { ComponentProps } from 'react'
import { SidebarContent } from '#/components/ui/sidebar'
import { cn } from '#/lib/utils'

type AppSidebarContentProps = ComponentProps<typeof SidebarContent>

export const AppSidebarContent = ({
  className,
  ...props
}: AppSidebarContentProps) => {
  return (
    <SidebarContent {...props} className={cn('mt-2 px-4', className)}>
      This is the content
    </SidebarContent>
  )
}
