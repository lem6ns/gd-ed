<script lang="ts">
    import { page, navigating } from "$app/stores";
    import TableView from "$lib/components/TableView.svelte";
    import { AppBar, ProgressRadial } from "@skeletonlabs/skeleton";
    import { onMount } from "svelte";

    let items: Record<string, any>[] = [];
    let loading = true;
    const getItems = async () => {
        items = [];
        loading = true;
        items = (
            await fetch(
                `/api/files/list/${
                    $navigating?.to?.params?.path ?? $page.params.path
                }`
            ).then((r) => r.json())
        ).data;
        loading = false;
    };

    $: if ($navigating) getItems();
    onMount(getItems);
</script>

<div class="h-full w-full flex justify-center items-center">
    <div class="h-full w-full bg-surface-700 rounded-lg">
        <AppBar>
            <svelte:fragment slot="lead">
                <span class="text-lg">Files</span>
            </svelte:fragment>
            <svelte:fragment slot="trail">
                <span class="text-lg">Upload</span>
            </svelte:fragment>
        </AppBar>

        {#key items}
            {#if loading}
                <div class="h-64 w-64 mx-auto mt-12">
                    <ProgressRadial stroke={20} />
                </div>
            {:else}
                <TableView {items} />
            {/if}
        {/key}
    </div>
</div>
