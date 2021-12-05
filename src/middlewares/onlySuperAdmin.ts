import { NextFunction } from 'grammy'
import Context from '@/models/Context'
import env from '@/helpers/env'

export default function onlySuperAdmin(ctx: Context, next: NextFunction) {
  if (ctx.from?.id === env.SUPER_ADMIN_ID) {
    return next()
  }
}
