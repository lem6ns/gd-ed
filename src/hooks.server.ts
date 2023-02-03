import { SvelteKitAuth } from "@auth/sveltekit";
import Discord from "@auth/core/providers/discord";
import {
	DISCORD_ID,
	DISCORD_SECRET,
	DISCORD_SERVER_ID,
} from "$env/static/private";

export const handle = SvelteKitAuth({
	callbacks: {
		async jwt({ token, account }) {
			if (account || Number(token.lastCheck) + 60 * 1000 < Date.now()) {
				token.accessToken = account?.access_token ?? token.accessToken;
				const resp = await fetch("https://discord.com/api/users/@me/guilds", {
					headers: {
						Authorization: `Bearer ${token.accessToken}`,
						"Content-Type": "application/json",
					},
				}).then((r) => r.json());

				token.id = account?.providerAccountId ?? token.id;
				token.inServer = !!resp.find(
					(server: { id: string }) => server.id === DISCORD_SERVER_ID,
				);
				token.lastCheck = Date.now();
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
                    inServer: token.inServer
                }
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
