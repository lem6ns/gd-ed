import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event) => {
	const session = await event.locals.getSession();
	if (event.url.pathname.startsWith("/signin")) return { session };
	if (!session?.user?.inServer) throw redirect(303, "/signin");
	return { session };
};