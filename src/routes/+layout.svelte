<script lang="ts">
    import "@skeletonlabs/skeleton/themes/theme-crimson.css";
    import "@skeletonlabs/skeleton/styles/all.css";
    import "../app.postcss";
    import { AppShell, AppBar } from "@skeletonlabs/skeleton";
    import { page } from "$app/stores";
    import { signOut } from "@auth/sveltekit/client";
    import { PUBLIC_INSTANCE_NAME } from "$env/static/public";
    import { Folder, ArrowLeftOnRectangle, Cog } from "@steeze-ui/heroicons";
    import { Icon } from "@steeze-ui/svelte-icon";
    import { goto } from "$app/navigation";

    const tiles = [
        {
            name: "Files",
            href: "/files",
            icon: Folder,
        },
        {
            name: "Settings",
            href: "/settings",
            icon: Cog,
        },
    ];
</script>

<svelte:head>
    <title>{PUBLIC_INSTANCE_NAME}</title>
</svelte:head>

<!-- App Shell -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<AppShell
    slotSidebarLeft={$page.data.session
        ? "bg-surface-800 w-56 border-r-4 border-surface-900/50 hidden lg:block"
        : ""}
>
    <svelte:fragment slot="header">
        <!-- App Bar -->
        <AppBar>
            <svelte:fragment slot="lead">
                <strong class="text-xl">{PUBLIC_INSTANCE_NAME}</strong
                >
            </svelte:fragment>
            <svelte:fragment slot="trail">
                {#if $page.data.session}
                    {#each tiles as tile}
                        <div on:click={() => goto(tile.href)} class="block lg:hidden p-2 -mx-3 {$page.url.pathname.startsWith(tile.href) ? "bg-surface-900" : ""}">
                            <Icon
                                src={tile.icon}
                                theme="solid"
                                class="w-8 inline-block"
                            />
                        </div>
                    {/each}
                    {#if $page.data.session.user?.image}
                        <div on:click={() => signOut()}>
                            <Icon
                                src={ArrowLeftOnRectangle}
                                theme="solid"
                                class="w-8 inline-block text-red-400 cursor-pointer"
                            />
                        </div>
                    {/if}
                {/if}
            </svelte:fragment>
        </AppBar>
    </svelte:fragment>
    <svelte:fragment slot="sidebarLeft">
        {#if $page.data.session}
            {#each tiles as tile, i}
                <div
                    class="w-full cursor-pointer p-4 {$page.url.pathname.startsWith(tile.href) ? "bg-surface-900/60" : ""}"
                    on:click={() => goto(tile.href)}
                >
                    <Icon
                        src={tile.icon}
                        theme="solid"
                        class="w-8 inline-block"
                    />
                    <span class="text-xl absolute mt-0.5 ml-3">{tile.name}</span>
                </div>
            {/each}
        {/if}
    </svelte:fragment>
    <!-- Page Route Content -->
    <slot />
</AppShell>
