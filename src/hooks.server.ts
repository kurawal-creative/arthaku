import { auth } from '$lib/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { building } from '$app/environment';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    // 1. Ambil session terlebih dahulu
    const session = await auth.api.getSession({
        headers: event.request.headers,
    });

    // 2. Isi event.locals agar bisa digunakan di server (layout.server.ts, actions, dll)
    if (session) {
        // @ts-ignore
        event.locals.user = session.user;
        // @ts-ignore
        event.locals.session = session.session;
    }

    // 3. Cek proteksi route
    const pathname = event.url.pathname;
    const isDashboardRoute = pathname === '/dashboard' || pathname.startsWith('/dashboard/');

    if (isDashboardRoute && !session) {
        return Response.redirect(new URL('/login', event.url), 303);
    }

    // 4. Gunakan svelteKitHandler untuk menangani request Better Auth
    return svelteKitHandler({ event, resolve, auth, building });
};
