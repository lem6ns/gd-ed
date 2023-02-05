import {
	RCLONE_CRYPT_REMOTE_NAME,
	RCLONE_RC_PASSWORD,
	RCLONE_RC_USERNAME,
} from "$env/static/private";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "../$types";

export const GET = (async ({ params, locals, request }) => {
	const userId = (await locals.getSession())?.user?.id;
	const path = params.path?.trim().replace(/^\/|\/$/g, "");

	if (!userId) {
		return json({
			error: true,
			data: "Not authenticated",
		});
	}

	const fileResp = await fetch(
		`http://127.0.0.1:5572/[${RCLONE_CRYPT_REMOTE_NAME}:]/${userId}${path.includes("/") ? `/${path}` : path}`,
		{
			headers: {
				Authorization: `Basic ${Buffer.from(
					`${RCLONE_RC_USERNAME}:${RCLONE_RC_PASSWORD}`,
				).toString("base64")}`,
			},
		},
	);

	let error = false;
	try {
		error = Boolean((await fileResp.clone().json()).error);
	} catch {}

	if (error) {
		return json({
			error: true,
			data: "Path does not exist",
		});
	}
	return fileResp;
}) satisfies RequestHandler;
