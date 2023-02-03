<script>
    import "@skeletonlabs/skeleton/themes/theme-rocket.css";
    import "@skeletonlabs/skeleton/styles/all.css";
    import "../app.postcss";
    import { AppShell, AppBar } from "@skeletonlabs/skeleton";
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { signOut } from "@auth/sveltekit/client";

    onMount(() => {
        if ($page.data.session && !$page.data.session?.user?.inServer)
            return signOut();
    });
</script>

<!-- App Shell -->
<AppShell slotSidebarLeft="bg-surface-500/5 w-56 p-4">
    <svelte:fragment slot="header">
        <!-- App Bar -->
        <AppBar>
            <svelte:fragment slot="lead">
                <strong class="text-xl uppercase">gd-ed</strong>
            </svelte:fragment>
            <svelte:fragment slot="trail">
                {#if $page.data.session}
                    {#if $page.data.session.user?.image}
                        <img
                            class="h-8 w-8 rounded-full"
                            alt="Profile"
                            src={$page.data.session.user.image}
                        />
                    {/if}
                {:else}
                    <a
                        class="text-sm p-1.5 rounded-lg bg-slate-500"
                        href="/signin">Sign In</a
                    >
                {/if}
            </svelte:fragment>
        </AppBar>
    </svelte:fragment>
    <!-- Page Route Content -->
    <slot />
</AppShell>
