import { error } from "@sveltejs/kit";
import {
	RCLONE_CRYPT_REMOTE_NAME,
	RCLONE_RC_PASSWORD,
	RCLONE_RC_USERNAME,
} from "$env/static/private";
import type { RequestHandler } from "../[file]/$types";

export const GET = (async ({ params, locals, setHeaders }) => {
	const userId = (await locals.getSession())?.user?.id;
	const path = params.path.trim().replace(/^\/|\/$/g, "") ?? "";

	if (!userId) {
		return new Response(
			JSON.stringify({
				error: true,
				data: "Not authenticated",
			}),
		);
	}

	const fileResp = await fetch(
		`http://127.0.0.1:5572/[${RCLONE_CRYPT_REMOTE_NAME}:]/${userId}${
			path ? `/${path}` : ""
		}`,
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
		setHeaders({
			"content-type": "application/json",
		});
		return new Response(
			JSON.stringify({
				error: true,
				data: "Path does not exist",
			}),
		);
	}
	return fileResp;
}) satisfies RequestHandler;
