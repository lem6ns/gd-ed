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
	const folderPath = params.folderPath.trim() ?? "";

	if (!userId) {
		return new Response(
			JSON.stringify({
				error: true,
				data: "Not authenticated",
			}),
		);
	}

	if (!folderPath) {
		return new Response(
			JSON.stringify({
				error: true,
				data: "No folder name passed",
			}),
		);
	}

	let mkdir = await fetch("http://127.0.0.1:5572/operations/mkdir", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Basic ${Buffer.from(
				`${RCLONE_RC_USERNAME}:${RCLONE_RC_PASSWORD}`,
			).toString("base64")}`,
		},
		body: JSON.stringify({
			fs: `${RCLONE_CRYPT_REMOTE_NAME}:`,
			remote: `${userId}${folderPath ? `/${folderPath}` : ""}`,
		}),
	}).then((r) => r.json());

	if (mkdir.error && folderPath !== "") {
		return new Response(
			JSON.stringify({
				error: true,
				data: mkdir.error,
			}),
		);
	}

	return new Response(
		JSON.stringify({
			error: false,
			data: "Created successfully",
		}),
	);
}) satisfies RequestHandler;
