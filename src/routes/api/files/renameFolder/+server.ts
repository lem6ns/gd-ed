import {
	RCLONE_CRYPT_REMOTE_NAME,
	RCLONE_RC_PASSWORD,
	RCLONE_RC_USERNAME,
} from "$env/static/private";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST = (async ({ locals, request }) => {
	const params = await request.json();
	const userId = (await locals.getSession())?.user?.id;
	const oldPath = params.oldPath.trim().replace(/^\/|\/$/g, "");
	const newPath = `${
		oldPath ? `${oldPath.split("/").slice(0, -1).join("/")}/` : ""
	}${params.newPath.trim().replace(/^\/|\/$/g, "")}`;

	if (!userId) {
		return json({
			error: true,
			data: "Not authenticated",
		});
	}

	if (!(oldPath && newPath)) {
		return json({
			error: true,
			data: "No path passed",
		});
	}

	let rename = await fetch("http://127.0.0.1:5572/sync/move", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Basic ${Buffer.from(
				`${RCLONE_RC_USERNAME}:${RCLONE_RC_PASSWORD}`,
			).toString("base64")}`,
		},
		body: JSON.stringify({
			srcFs: `${RCLONE_CRYPT_REMOTE_NAME}:${userId}/${oldPath}`,
			dstFs: `${RCLONE_CRYPT_REMOTE_NAME}:${userId}/${newPath}`,
			createEmptySrcDirs: true,
			deleteEmptySrcDirs: true,
		}),
	}).then((r) => r.json());

	if (rename.error) {
		return json({
			error: true,
			data: rename.error,
		});
	}

	return json({
		error: false,
		data: "Renamed successfully",
	});
}) satisfies RequestHandler;
