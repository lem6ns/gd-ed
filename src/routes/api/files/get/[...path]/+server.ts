import { RCLONE_CRYPT_MOUNT_PATH } from "$env/static/private";
import { readFileSync, existsSync } from "node:fs";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "../$types";

export const GET = (async ({ params, locals }) => {
	const userId = (await locals.getSession())?.user?.id;
	const path = params.path?.trim().replace(/^\/|\/$/g, "");
	const fullPath = `${RCLONE_CRYPT_MOUNT_PATH}/${userId}/${path}`;

	if (!userId) {
		return json({
			error: true,
			data: "Not authenticated",
		});
	}

	if (!existsSync(fullPath)) {
		return json({
			error: true,
			data: "Path does not exist",
		});
	}

	return new Response(readFileSync(fullPath));
}) satisfies RequestHandler;
