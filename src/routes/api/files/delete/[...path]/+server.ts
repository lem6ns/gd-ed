import {
	RCLONE_CRYPT_REMOTE_NAME,
	RCLONE_RC_PASSWORD,
	RCLONE_RC_USERNAME,
} from "$env/static/private";
import type { RequestHandler } from "../$types";

export const GET = (async ({ params, locals, setHeaders }) => {
	setHeaders({
		"content-type": "application/json",
	});
	const userId = (await locals.getSession())?.user?.id;
	const path = params.path ?? "";

	if (!userId) {
		return new Response(
			JSON.stringify({
				error: true,
				data: "Not authenticated",
			}),
		);
	}

	if (!path) {
		return new Response(
			JSON.stringify({
				error: true,
				data: "No path passed",
			}),
		);
	}

	let remove = await fetch("http://127.0.0.1:5572/operations/deletefile", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Basic ${Buffer.from(
				`${RCLONE_RC_USERNAME}:${RCLONE_RC_PASSWORD}`,
			).toString("base64")}`,
		},
		body: JSON.stringify({
			fs: `${RCLONE_CRYPT_REMOTE_NAME}:`,
			remote: `${userId}${path ? `/${path}` : ""}`,
		}),
	}).then((r) => r.json());

	console.log(remove)
	if (remove.error && path !== "") {
		return new Response(
			JSON.stringify({
				error: true,
				data: remove.error,
			}),
		);
	}

	return new Response(
		JSON.stringify({
			error: false,
			data: "removed successfully",
		}),
	);
}) satisfies RequestHandler;
