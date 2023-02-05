<script lang="ts">
    import { modalStore, type ModalSettings } from "@skeletonlabs/skeleton";
    import { Trash } from "@steeze-ui/heroicons";
    import { Icon } from "@steeze-ui/svelte-icon";

    export let row: Record<string, any>;
    export let items: any;

    const remove = (type: string, path: string) => {
        const confirm: ModalSettings = {
            type: "confirm",
            title: "Please Confirm",
            body: `Are you sure you wish to delete ${row.name}?`,
            response: async (r: boolean) => {
                if (!r) false;
                await fetch(
                    `/api/files/${
                        type === "file" ? "delete" : "purge"
                    }`,
                    {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                        },
                        body: JSON.stringify({
                            path,
                        }),
                    }
                ).then((r) => r.json());
                $items = $items.filter(
                    (item: { path: string }) => item.path !== path
                );
            },
            buttonTextCancel: "Cancel",
            buttonTextConfirm: "Delete",
        };
        modalStore.trigger(confirm);
    };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<span on:click={() => remove(row.type, row.path)} class="cursor-pointer">
    <Icon src={Trash} theme="solid" class="mx-2 w-6 inline-block" />
</span>
