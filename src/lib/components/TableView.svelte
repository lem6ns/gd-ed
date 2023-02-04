<script lang="ts">
    import { Icon } from "@steeze-ui/svelte-icon";
    import {
        Document,
        Folder,
        UserPlus,
        ArrowRightOnRectangle,
        Trash,
    } from "@steeze-ui/heroicons";
    import {
        createDataTableStore,
        dataTableHandler,
        tableInteraction,
        tableA11y,
    } from "@skeletonlabs/skeleton";

    export let items: Record<string, any>[];
    const dataTableStore = createDataTableStore(
        // Pass your source data here:
        items,
        // Provide optional settings:
        {
            // The current search term.
            search: "",
            // The current sort key.
            sort: "",
        }
    );

    // This automatically handles search, sort, etc when the model updates.
    dataTableStore.subscribe((model) => dataTableHandler(model));
</script>

<div class="p-4">
    <input
        bind:value={$dataTableStore.search}
        type="search"
        placeholder="Search..."
    />

    <br />
    <br />

    <div class="table-container !rounded-none">
        <table
            class="table table-hover !rounded-none"
            use:tableInteraction
            role="grid"
            use:tableA11y
        >
            <thead
                on:click={(e) => {
                    dataTableStore.sort(e);
                }}
                on:keypress
            >
                <th
                    class="bg-surface-800 border-x-2 border-surface-900/50 table-cell-fit"
                >
                    <input
                        type="checkbox"
                        on:click={(e) => {
                            dataTableStore.selectAll(e.currentTarget.checked);
                        }}
                    />
                </th>

                <th
                    data-sort="name"
                    class="bg-surface-800 border-2 border-surface-900/50"
                >
                    Name
                </th>

                <th
                    data-sort="dateModified"
                    class="bg-surface-800 border-2 border-surface-900/50 table-cell-fit"
                >
                    Date Modified
                </th>

                <th
                    data-sort="size"
                    class="bg-surface-800 border-2 border-surface-900/50 table-cell-fit"
                >
                    Size
                </th>

                <th
                    class="bg-surface-800 border-2 border-surface-900/50 table-cell-fit"
                >
                    Actions
                </th>
            </thead>

            <tbody>
                {#each $dataTableStore.filtered as row, rowIndex}
                    <tr
                        class:table-row-checked={row.dataTableChecked}
                        aria-rowindex={rowIndex + 1}
                    >
                        <td class="border-x-2 border-surface-900/50" role="gridcell" aria-colindex={1} tabindex="0">
                            <input
                                type="checkbox"
                                bind:checked={row.dataTableChecked}
                            />
                        </td>
                        <td class="border-2 border-surface-900/50" role="gridcell" aria-colindex={2} tabindex="0">
                            <Icon
                                src={row.type === "folder" ? Folder : Document}
                                theme="solid"
                                class="mr-2 w-6 inline-block"
                            />
                            {row.name}
                        </td>
                        <td class="border-2 border-surface-900/50" role="gridcell" aria-colindex={3} tabindex="0">
                            {row.dateModified}
                        </td>
                        <td class="border-2 border-surface-900/50" role="gridcell" aria-colindex={4} tabindex="0">
                            {row.size}
                        </td>
                        <td class="border-2 border-surface-900/50" role="gridcell" aria-colindex={5} tabindex="0">
                            <Icon
                                src={UserPlus}
                                theme="solid"
                                class="mx-2 w-6 inline-block"
                            />
                            <Icon
                                src={ArrowRightOnRectangle}
                                theme="solid"
                                class="mx-2 w-6 inline-block"
                            />
                            <Icon
                                src={Trash}
                                theme="solid"
                                class="mx-2 w-6 inline-block"
                            />
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
