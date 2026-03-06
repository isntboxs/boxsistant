import { useRouteContext, useRouter } from '@tanstack/react-router'
import { ChevronsUpDown, LogOutIcon } from 'lucide-react'
import {
  IconCreditCard,
  IconDotsVertical,
  IconLogout,
} from '@tabler/icons-react'
import type { ComponentProps } from 'react'
import type { auth } from '#/lib/auth/server'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '#/components/ui/drawer'
import {
  SidebarFooter,
  SidebarMenuButton,
  useSidebar,
} from '#/components/ui/sidebar'
import { cn } from '#/lib/utils'
import { Button } from '#/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'
import { AvatarUser } from '#/components/avatar-user'
import { signOut } from '#/lib/auth/client'

type AppSidebarFooterProps = ComponentProps<typeof SidebarFooter>

export const AppSidebarFooter = ({
  className,
  ...props
}: AppSidebarFooterProps) => {
  const { auth } = useRouteContext({ from: '/_main' })
  const router = useRouter()
  const { isMobile } = useSidebar()

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          void router.invalidate()
        },
      },
    })
  }
  return (
    <SidebarFooter className={cn(className)} {...props}>
      <UserButton
        user={auth.user}
        onSignOut={handleSignOut}
        isMobile={isMobile}
      />
    </SidebarFooter>
  )
}

type UserButtonProps = {
  user: typeof auth.$Infer.Session.user
  onSignOut: () => void
  isMobile: boolean
}

const UserButton = ({ user, onSignOut, isMobile }: UserButtonProps) => {
  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
          >
            <AvatarUser user={user} className="rounded-none" />
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{user.name}</span>
              <span className="truncate text-xs">{user.email}</span>
            </div>
            <ChevronsUpDown className="ml-auto size-4" />
          </SidebarMenuButton>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="font-normal">
            <div className="flex items-center gap-2 text-left text-sm">
              <AvatarUser user={user} className="rounded-none" />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <DrawerTitle className="truncate font-semibold">
                  {user.name}
                </DrawerTitle>
                <DrawerDescription className="truncate text-xs">
                  {user.email}
                </DrawerDescription>
              </div>
            </div>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline" className="w-full">
                <IconCreditCard />
                Billing
              </Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button variant="default" onClick={onSignOut} className="w-full">
                <LogOutIcon />
                Sign out
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <AvatarUser user={user} className="rounded-none" />
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{user.name}</span>
            <span className="text-muted-foreground truncate text-xs">
              {user.email}
            </span>
          </div>
          <IconDotsVertical className="ml-auto size-4" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56"
        side={'right'}
        align="end"
        sideOffset={14}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <AvatarUser user={user} className="rounded-none" />
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.name}</span>
              <span className="text-muted-foreground truncate text-xs">
                {user.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <IconCreditCard />
            Billing
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onSignOut}>
          <IconLogout />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
