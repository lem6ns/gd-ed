<script lang="ts">
    import { page, navigating } from "$app/stores";
    import TableView from "$lib/components/TableView.svelte";
    import { AppBar } from "@skeletonlabs/skeleton";
    import { onMount } from "svelte";

    let items: Record<string, any>[] = [];
    const getItems = async () => {
        items = [];
        items = (
            await fetch(`/api/files/list/${$navigating?.to?.params?.path ?? $page.params.path}`).then((r) =>
                r.json()
            )
        ).data;
    };

    $: if ($navigating) getItems();
    onMount(getItems)
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
            <TableView {items} />
        {/key}
    </div>
</div>
