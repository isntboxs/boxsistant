import { createFileRoute } from '@tanstack/react-router'
import { BoxsIcon } from '#/components/global/boxs-icon'
import { Card, CardContent } from '#/components/ui/card'
import { Separator } from '#/components/ui/separator'
import { GuestLoginButton } from '#/components/guest-login-button'
import { SocialLoginButtons } from '#/components/social-login-buttons'

export const Route = createFileRoute('/_auth/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="w-full space-y-6">
      <div className="mx-auto space-y-4 text-center">
        <BoxsIcon className="mx-auto h-10" />
        <p className="text-muted-foreground text-base font-normal">
          Login to Boxsistant to continue
        </p>
      </div>

      <Card className="mx-auto w-full max-w-sm">
        <CardContent className="space-y-4">
          <SocialLoginButtons />

          <div className="flex items-center justify-center gap-2">
            <Separator className="flex-1" />
            <span className="text-muted-foreground">or</span>
            <Separator className="flex-1" />
          </div>

          <GuestLoginButton />
        </CardContent>
      </Card>
    </div>
  )
}
