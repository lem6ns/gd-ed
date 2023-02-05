<script lang="ts">
    import { page } from "$app/stores";
    import { Icon } from "@steeze-ui/svelte-icon";
    import {
        Document,
        Folder,
        UserPlus,
        Trash,
        ArrowUpLeft,
        PencilSquare,
    } from "@steeze-ui/heroicons";
    import {
        createDataTableStore,
        dataTableHandler,
        tableInteraction,
        tableA11y,
        modalStore,
        type ModalSettings,
    } from "@skeletonlabs/skeleton";
    import { goto } from "$app/navigation";

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

    const formatBytes = (bytes: number, decimals = 2): string => {
        if (!+bytes) return "0 Bytes";

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${
            sizes[i]
        }`;
    };

    const navigate = (type: string, path: string) => {
        if (type == "back")
            return goto($page.url.pathname.split("/").slice(0, -1).join("/"));
        if (type == "folder") return goto(`/files/${path}`);
        if (type == "file") return goto(`/api/files/get/${path}`); // temp
    };

    const rename = async (type: string, oldPath: string) => {
        const prompt: ModalSettings = {
            type: "prompt",
            title: `Rename ${oldPath.split("\\").pop()?.split("/").pop()}`,
            body: `Enter the new name for "${oldPath
                .split("\\")
                .pop()
                ?.split("/")
                .pop()}".`,
            // Populates the initial input value
            value: type === "file" ? `.${oldPath.split(".").pop()}` : "",
            // Returns the updated response value
            response: async (r: string) => {
                if (!r) return;
                const success = !(
                    await fetch(
                        `/api/files/${
                            type === "file" ? "renameFile" : "renameFolder"
                        }/${oldPath}?newPath=${r}`
                    ).then((r) => r.json())
                ).error;
                if (success) {
                    $items = (
                        await fetch(
                            `/api/files/list/${$page.params.path}`
                        ).then((r) => r.json())
                    ).data;
                }
            },
            // Optionally override the button text
            buttonTextCancel: "Cancel",
            buttonTextSubmit: "Rename",
        };
        modalStore.trigger(prompt);
    };

    const renameSelected = () => {
        const selected = $dataTableStore.selection.filter(
            (selected) => selected.type !== "back"
        );

        selected.forEach((row) => {
            rename(row.type, row.path);
        });
    };

    const remove = async (type: string, path: string) => {
        await fetch(
            `/api/files/${type === "file" ? "delete" : "purge"}/${path}`
        ).then((r) => r.json());
        $items = $items.filter((item: { path: string }) => item.path !== path);
    };

    const removeSelected = () => {
        const selected = $dataTableStore.selection.filter(
            (selected) => selected.type !== "back"
        );

        selected.forEach((row) => {
            remove(row.type, row.path);
        });
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
                    <Icon
                        src={UserPlus}
                        theme="solid"
                        class="mx-2 w-6 inline-block"
                    />
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <span
                        class="cursor-pointer"
                        on:click={() => renameSelected()}
                    >
                        <Icon
                            src={PencilSquare}
                            theme="solid"
                            class="mx-2 w-6 inline-block"
                        />
                    </span>
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <span
                        class="cursor-pointer"
                        on:click={() => removeSelected()}
                    >
                        <Icon
                            src={Trash}
                            theme="solid"
                            class="mx-2 w-6 inline-block"
                        />
                    </span>
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
                            </td>

                            <td
                                role="gridcell"
                                aria-colindex={3}
                                tabindex="0"
                                class="cursor-pointer"
                                on:click={() => navigate(row.type, row.path)}
                            >
                                {row.name}
                            </td>

                            <td role="gridcell" aria-colindex={4} tabindex="0">
                                {row.dateModified}
                            </td>

                            <td role="gridcell" aria-colindex={5} tabindex="0">
                                {row.size ? formatBytes(row.size) : ""}
                            </td>

                            <td role="gridcell" aria-colindex={6} tabindex="0">
                                {#if row.type !== "back"}
                                    <Icon
                                        src={UserPlus}
                                        theme="solid"
                                        class="mx-2 w-6 inline-block"
                                    />
                                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                                    <span
                                        on:click={() =>
                                            rename(row.type, row.path)}
                                        class="cursor-pointer"
                                    >
                                        <Icon
                                            src={PencilSquare}
                                            theme="solid"
                                            class="mx-2 w-6 inline-block"
                                        />
                                    </span>
                                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                                    <span
                                        on:click={() =>
                                            remove(row.type, row.path)}
                                        class="cursor-pointer"
                                    >
                                        <Icon
                                            src={Trash}
                                            theme="solid"
                                            class="mx-2 w-6 inline-block"
                                        />
                                    </span>
                                {/if}
                            </td>
                        </tr>
                    {/if}
                {/each}
            </tbody>
        </table>
    </div>
</div>
