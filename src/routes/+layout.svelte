<script>
    import "@skeletonlabs/skeleton/themes/theme-rocket.css";
    import "@skeletonlabs/skeleton/styles/all.css";
    import "../app.postcss";
    import { AppShell, AppBar } from "@skeletonlabs/skeleton";
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { signOut } from "@auth/sveltekit/client";
    import { PUBLIC_INSTANCE_NAME } from "$env/static/public";

    onMount(() => {
        if ($page.data.session && !$page.data.session?.user?.inServer)
            return signOut();
    });
</script>

<svelte:head>
    <title>{PUBLIC_INSTANCE_NAME}</title>
</svelte:head>

<!-- App Shell -->
<AppShell slotSidebarLeft="bg-surface-500/5 w-56 p-4">
    <svelte:fragment slot="header">
        <!-- App Bar -->
        <AppBar>
            <svelte:fragment slot="lead">
                <strong class="text-xl uppercase">{PUBLIC_INSTANCE_NAME}</strong>
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
                {/if}
            </svelte:fragment>
        </AppBar>
    </svelte:fragment>
    <!-- Page Route Content -->
    <slot />
</AppShell>
