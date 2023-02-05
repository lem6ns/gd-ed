<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { ArrowUpLeft, Folder, Document } from "@steeze-ui/heroicons";
    import { Icon } from "@steeze-ui/svelte-icon";
    import Actions from "./Actions/Single/Actions.svelte";

    export let row: Record<string, any>;
    export let rowIndex: number;
    export let items: Record<string, any>[];

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
</script>

<tr class:table-row-checked={row.dataTableChecked} aria-rowindex={rowIndex + 1}>
    <td role="gridcell" aria-colindex={1} tabindex="0">
        <input type="checkbox" bind:checked={row.dataTableChecked} />
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
                src={row.type === "folder" ? Folder : Document}
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
            <Actions {row} {items} />
        {/if}
    </td>
</tr>
