<script lang="ts">
    import { page } from "$app/stores";
    import {
        createDataTableStore,
        dataTableHandler,
        tableInteraction,
        tableA11y,
    } from "@skeletonlabs/skeleton";
    import ActionsSelected from "./Actions/Selected/Actions.svelte";
    import TableItem from "./TableItem.svelte";

    export let items: any;
    const dataTableStore = createDataTableStore(
        [
            {
                type: "back",
                name: "Back",
                dateModified: "",
                size: "",
            },
            ...$items,
        ],
        {
            search: "",
            sort: "",
        }
    );

    dataTableStore.subscribe((model) => dataTableHandler(model));
</script>

<div class="p-4">
    <input
        bind:value={$dataTableStore.search}
        type="search"
        placeholder="Search..."
        class="!rounded-none mb-3"
    />

    <div class="table-container !rounded-none">
        <table
            class="table table-hover !rounded-none"
            role="grid"
            use:tableInteraction
            use:tableA11y
        >
            <thead
                on:click={(e) => {
                    dataTableStore.sort(e);
                }}
                on:keypress
            >
                <th class="bg-surface-800 table-cell-fit">
                    <input
                        type="checkbox"
                        on:click={(e) => {
                            dataTableStore.selectAll(e.currentTarget.checked);
                        }}
                    />
                </th>

                <th data-sort="type" class="bg-surface-800 table-cell-fit">
                    Type
                </th>

                <th data-sort="name" class="bg-surface-800"> Name </th>

                <th
                    data-sort="dateModified"
                    class="bg-surface-800 table-cell-fit"
                >
                    Date Modified
                </th>

                <th data-sort="size" class="bg-surface-800 table-cell-fit">
                    Size
                </th>

                <th class="bg-surface-800 table-cell-fit">
                    <ActionsSelected
                        selected={$dataTableStore.selection.filter(
                            (selected) => selected.type !== "back"
                        )}
                        {items}
                    />
                </th>
            </thead>

            <tbody>
                {#each $dataTableStore.filtered as row, rowIndex}
                    {#if $page.url.pathname == "/files" && row.type === "back"}
                        <!-- hide back button -->
                    {:else}
                        <TableItem {row} {rowIndex} {items} />
                    {/if}
                {/each}
            </tbody>
        </table>
    </div>
</div>
