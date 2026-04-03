import { auth } from "$lib/auth";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
	const pathname = event.url.pathname;
	const isDashboardRoute = pathname === "/dashboard" || pathname.startsWith("/dashboard/");

	if (isDashboardRoute) {
		const session = await auth.api.getSession({
			headers: event.request.headers,
		});

		if (!session) {
			return Response.redirect(new URL("/login", event.url), 303);
		}
	}

	const response = await resolve(event);
	return response;
};