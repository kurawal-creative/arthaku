import { ORPCError, os } from "@orpc/server";
import type { Session, User } from "better-auth";

export interface ORPCContext {
  user?: User;
  session?: Session;
}

// Public: semua bisa akses
export const pub = os.$context<ORPCContext>();

// Protected: hanya user yang sudah login
export const authed = pub.use(({ context, next }) => {
  if (!context.user || !context.session) {
    throw new ORPCError('UNAUTHORIZED', {
      message: 'Kamu harus login untuk mengakses ini.'
    })
  }
  return next({
    context: { user: context.user, session: context.session }, // user sekarang non-nullable
  });
});
