import { error, redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event) => {
	try {
		await fetch("http://127.0.0.1:5572/");
	} catch (e) {
		throw error(400, "Rclone Remote Control not accessible. Is it started?");
	}
	
	const session = await event.locals.getSession();
	if (!session && event.url.pathname !== "/signin")
		throw redirect(303, "/signin");
	return { session };
};
