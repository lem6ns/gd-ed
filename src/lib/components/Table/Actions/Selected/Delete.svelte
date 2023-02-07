<script lang="ts">
    import { modalStore, type ModalSettings } from "@skeletonlabs/skeleton";
    import { Trash } from "@steeze-ui/heroicons";
    import { Icon } from "@steeze-ui/svelte-icon";

    export let items: any;
    export let selected: Record<string, any>[];

    const remove = async (type: string, path: string) => {
        await fetch(`/api/files/${type === "file" ? "delete" : "purge"}`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                path,
            }),
        }).then((r) => r.json());
        $items = $items.filter((item: { path: string }) => item.path !== path);
    };

    const removeSelected = () => {
        const confirm: ModalSettings = {
            type: "confirm",
            title: "Please Confirm",
            body: `Are you sure you wish to delete ${selected.length} files?`,
            // TRUE if confirm pressed, FALSE if cancel pressed
            response: (r: boolean) => {
                if (!r) return;
                selected.forEach((row) => {
                    remove(row.type, row.path);
                });
            },
            // Optionally override the button text
            buttonTextCancel: "Cancel",
            buttonTextConfirm: "Delete",
        };
        modalStore.trigger(confirm);
    };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<span on:click={() => removeSelected()} class="cursor-pointer">
    <Icon src={Trash} theme="solid" class="mx-2 w-6 inline-block" />
</span>
