import { SvelteKitAuth } from "@auth/sveltekit";
import Discord from "@auth/core/providers/discord";
import {
	DISCORD_ID,
	DISCORD_SECRET,
	DISCORD_SERVER_ID,
} from "$env/static/private";

export const handle = SvelteKitAuth({
	trustHost: true,
	callbacks: {
		async jwt({ token, account }) {
			if (account || Number(token.created) + 60 * 60 * 1000 < Date.now()) {
				token.created = Date.now();
				token.accessToken = account?.access_token ?? token.accessToken;
				token.id = account?.providerAccountId ?? token.id;
				const resp = await fetch("https://discord.com/api/users/@me/guilds", {
					headers: {
						Authorization: `Bearer ${token.accessToken}`,
						"Content-Type": "application/json",
					},
				}).then((r) => r.json());

				try {
					if (
						!resp.find(
							(server: { id: string }) => server.id === DISCORD_SERVER_ID,
						)
					)
						return null;
				} catch {
					return null;
				}
			}
			return token;
		},
		async session({ session, token }) {
			return {
				...session,
				user: {
					name: session.user?.name,
					image: session.user?.image,
					id: token.id,
				},
			};
		},
	},
	providers: [
		// @ts-ignore
		Discord({
			clientId: DISCORD_ID,
			clientSecret: DISCORD_SECRET,
			authorization:
				"https://discord.com/api/oauth2/authorize?scope=identify+guilds",
		}),
	],
});
