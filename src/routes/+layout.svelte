<script>
    import "@skeletonlabs/skeleton/themes/theme-rocket.css";
    import "@skeletonlabs/skeleton/styles/all.css";
    import "../app.postcss";
    import { AppShell, AppBar } from "@skeletonlabs/skeleton";
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
                Trail
            </svelte:fragment>
        </AppBar>
    </svelte:fragment>
    <!-- Page Route Content -->
    <slot />
</AppShell>
