import { SvelteKitAuth } from "@auth/sveltekit";
import Discord from "@auth/core/providers/discord";
import {
	DISCORD_ID,
	DISCORD_SECRET,
	DISCORD_SERVER_ID,
	AUTH_SECRET,
} from "$env/static/private";

export const handle = SvelteKitAuth({
	trustHost: true,
	secret: AUTH_SECRET,
	callbacks: {
		async jwt({ token, account }) {
			if (account) {
				token.created = Date.now();
				token.id = account?.providerAccountId ?? token.id;
				const resp = await fetch("https://discord.com/api/users/@me/guilds", {
					headers: {
						Authorization: `Bearer ${account?.access_token}`,
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
