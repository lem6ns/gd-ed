import {
	RCLONE_CRYPT_REMOTE_NAME,
	RCLONE_RC_PASSWORD,
	RCLONE_RC_USERNAME,
} from "$env/static/private";
import type { RequestHandler } from "../$types";

export const GET = (async ({ url, params, locals, setHeaders }) => {
	setHeaders({
		"content-type": "application/json",
	});
	const userId = (await locals.getSession())?.user?.id;
	const oldPath = params.path.trim().replace(/^\/|\/$/g, "") ?? "";
	const newPath = `${oldPath
		.split("/")
		.slice(0, -1)
		.join("/")}/${url.searchParams
		.get("newPath")
		.trim().replace(/^\/|\/$/g, "")}`;

	if (!userId) {
		return new Response(
			JSON.stringify({
				error: true,
				data: "Not authenticated",
			}),
		);
	}

	if (!(oldPath && newPath)) {
		return new Response(
			JSON.stringify({
				error: true,
				data: "No path passed",
			}),
		);
	}

	let rename = await fetch("http://127.0.0.1:5572/operations/movefile", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Basic ${Buffer.from(
				`${RCLONE_RC_USERNAME}:${RCLONE_RC_PASSWORD}`,
			).toString("base64")}`,
		},
		body: JSON.stringify({
			srcFs: `${RCLONE_CRYPT_REMOTE_NAME}:`,
			srcRemote: `${userId}${oldPath ? `/${oldPath}` : ""}`,
			dstFs: `${RCLONE_CRYPT_REMOTE_NAME}:`,
			dstRemote: `${userId}${newPath ? `/${newPath}` : ""}`,
		}),
	}).then((r) => r.json());

	if (rename.error) {
		return new Response(
			JSON.stringify({
				error: true,
				data: rename.error,
			}),
		);
	}

	return new Response(
		JSON.stringify({
			error: false,
			data: "Renamed successfully",
		}),
	);
}) satisfies RequestHandler;
