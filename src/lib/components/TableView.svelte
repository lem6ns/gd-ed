<script lang="ts">
    import { page } from "$app/stores";
    import { Icon } from "@steeze-ui/svelte-icon";
    import {
        Document,
        Folder,
        UserPlus,
        ArrowRightOnRectangle,
        Trash,
        ArrowUpLeft,
    } from "@steeze-ui/heroicons";
    import {
        createDataTableStore,
        dataTableHandler,
        tableInteraction,
        tableA11y,
    } from "@skeletonlabs/skeleton";
    import { goto } from "$app/navigation";

    export let items: Record<string, any>[];
    const dataTableStore = createDataTableStore(
        // Pass your source data here:
        [
            {
                type: "back",
                name: "Back",
                dateModified: "",
                size: "",
            },
            ...items,
        ],
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

    const navigate = (type: string, path: string) => {
        if (type == "back")
            return goto($page.url.pathname.split("/").slice(0, -1).join("/"));
        if (type == "folder") return goto(`/files/${path}`);
        if (type == "file") return goto(`/api/files/get/${path}`); // temp
    };
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
                <th class="bg-surface-800 table-cell-fit">
                    <input
                        type="checkbox"
                        on:click={(e) => {
                            dataTableStore.selectAll(e.currentTarget.checked);
                        }}
                    />
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
                </th>
            </thead>

            <tbody>
                {#each $dataTableStore.filtered as row, rowIndex}
                    {#if $page.url.pathname == "/files" && row.type === "back"}
                        <!-- hide back button -->
                    {:else}
                        <tr
                            class:table-row-checked={row.dataTableChecked}
                            aria-rowindex={rowIndex + 1}
                        >
                            <td role="gridcell" aria-colindex={1} tabindex="0">
                                <input
                                    type="checkbox"
                                    bind:checked={row.dataTableChecked}
                                />
                            </td>
                            <td
                                role="gridcell"
                                aria-colindex={2}
                                tabindex="0"
                                class="cursor-pointer"
                                on:click={() => navigate(row.type, row.path)}
                            >
                                {#if row.type !== "back"}
                                    <Icon
                                        src={row.type === "folder"
                                            ? Folder
                                            : Document}
                                        theme="solid"
                                        class="mr-2 w-6 inline-block"
                                    />
                                {:else if row.type == "back"}
                                    <Icon
                                        src={ArrowUpLeft}
                                        theme="solid"
                                        class="mr-2 w-6 inline-block"
                                    />
                                {/if}
                                {row.name}
                            </td>
                            <td role="gridcell" aria-colindex={3} tabindex="0">
                                {row.dateModified}
                            </td>
                            <td role="gridcell" aria-colindex={4} tabindex="0">
                                {row.size}
                            </td>
                            <td role="gridcell" aria-colindex={5} tabindex="0">
                                {#if row.type !== "back"}
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
                                {/if}
                            </td>
                        </tr>
                    {/if}
                {/each}
            </tbody>
        </table>
    </div>
</div>
