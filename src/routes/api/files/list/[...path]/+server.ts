import { error } from "@sveltejs/kit";
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
	const path = params.path.trim().replace(/^\/|\/$/g, "") ?? "";

	if (!userId) {
		return new Response(
			JSON.stringify({
				error: true,
				data: "Not authenticated",
			}),
		);
	}

	let list = await fetch("http://127.0.0.1:5572/operations/list", {
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

	if (list.error && path !== "") {
		return new Response(
			JSON.stringify({
				error: true,
				data: "Path does not exist",
			}),
		);
	}
	if (list.error && path === "") {
		await fetch("http://127.0.0.1:5572/operations/mkdir", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Basic ${Buffer.from(
					`${RCLONE_RC_USERNAME}:${RCLONE_RC_PASSWORD}`,
				).toString("base64")}`,
			},
			body: JSON.stringify({
				fs: `${RCLONE_CRYPT_REMOTE_NAME}:`,
				remote: userId,
			}),
		}).then((r) => r.json());
		return new Response(
			JSON.stringify({
				error: false,
				data: [],
			}),
		);
	}

	return new Response(
		JSON.stringify({
			error: false,
			data: list.list.map((object: Record<string, any>) => ({
				path: object.Path.replace(`${userId}/`, ""),
				type: object.IsDir ? "folder" : "file",
				name: object.Name,
				dateModified: new Date(object.ModTime).toUTCString(),
				size: object.Size === -1 ? "" : object.Size,
			})),
		}),
	);
}) satisfies RequestHandler;
