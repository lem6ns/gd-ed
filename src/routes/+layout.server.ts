import { RCLONE_CRYPT_MOUNT_PATH } from "$env/static/private";
import { error, redirect } from "@sveltejs/kit";
import { existsSync } from "node:fs";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event) => {
	try {
		await fetch("http://127.0.0.1:5572/");
	} catch (e) {
		throw error(400, "Rclone Remote Control not accessible. Is it started?");
	}

	if (!existsSync(RCLONE_CRYPT_MOUNT_PATH)) {
		throw error(
			400,
			"Rclone Mount Path Inaccessible. Is the command running and does the server have proper permissions?",
		);
	}

	const session = await event.locals.getSession();
	if (!session && event.url.pathname !== "/signin")
		throw redirect(303, "/signin");
	return { session };
};
