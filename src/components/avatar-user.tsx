import type { auth } from '#/lib/auth/server'
import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar'
import { GeneratedAvatar } from '#/components/generated-avatar'
import { cn } from '#/lib/utils'

export const AvatarUser = ({
  user,
  className,
}: {
  user: typeof auth.$Infer.Session.user
  className?: string
}) => {
  if (!user.image) {
    return (
      <GeneratedAvatar
        seed={user.name}
        style="notionistsNeutral"
        className={cn('size-8', className)}
      />
    )
  }

  return (
    <Avatar className={cn('size-8', className)}>
      <AvatarImage className={cn(className)} src={user.image} alt={user.name} />
      <AvatarFallback className={cn('size-8 uppercase', className)}>
        {user.name.charAt(0)}
      </AvatarFallback>
    </Avatar>
  )
}
