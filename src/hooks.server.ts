import { auth } from '$lib/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { building } from '$app/environment';
import type { Handle } from '@sveltejs/kit';
import './lib/orpc.server'

export const handle: Handle = async ({ event, resolve }) => {
    const pathname = event.url.pathname;
    const isAuthApiRoute = pathname.startsWith('/api/auth');
    const isDashboardRoute = pathname === '/dashboard' || pathname.startsWith('/dashboard/');
    const isAuthPageRoute = pathname === '/login' || pathname.startsWith('/login/') || pathname === '/sign-up' || pathname.startsWith('/sign-up/');

    if (isAuthApiRoute) {
        return svelteKitHandler({ event, resolve, auth, building });
    }

    // Ambil session sekali untuk proteksi dashboard dan redirect dari auth pages.
    const session = await auth.api.getSession({
        headers: event.request.headers,
    });

    if (session) {
        event.locals.user = session.user;
        event.locals.session = session.session;
    }

    if (session && isAuthPageRoute) {
        return Response.redirect(new URL('/dashboard', event.url), 303);
    }

    if (isDashboardRoute && !session) {
        return Response.redirect(new URL('/login', event.url), 303);
    }

    return svelteKitHandler({ event, resolve, auth, building });
};
