<script lang="ts">
    import { page } from "$app/stores";
    import { modalStore, type ModalSettings } from "@skeletonlabs/skeleton";
    import { PencilSquare } from "@steeze-ui/heroicons";
    import { Icon } from "@steeze-ui/svelte-icon";

    export let row: Record<string, any>;
    export let items: any;

    const rename = async (type: string, oldPath: string) => {
        const prompt: ModalSettings = {
            type: "prompt",
            title: `Rename ${oldPath.split("\\").pop()?.split("/").pop()}`,
            body: `Enter the new name for "${oldPath
                .split("\\")
                .pop()
                ?.split("/")
                .pop()}".`,
            value: type === "file" ? `.${oldPath.split(".").pop()}` : "",
            response: async (r: string) => {
                if (!r) return;
                const success = !(
                    await fetch(
                        `/api/files/${
                            type === "file" ? "renameFile" : "renameFolder"
                        }`,
                        {
                            method: "POST",
                            headers: {
                                "content-type": "application/json",
                            },
                            body: JSON.stringify({
                                oldPath,
                                newPath: r,
                            }),
                        }
                    ).then((r) => r.json())
                ).error;
                if (success) {
                    $items = (
                        await fetch(`/api/files/list`, {
                            method: "POST",
                            headers: {
                                "content-type": "application/json",
                            },
                            body: JSON.stringify({
                                path: $page.params.path,
                            }),
                        }).then((r) => r.json())
                    ).data;
                }
            },
            buttonTextCancel: "Cancel",
            buttonTextSubmit: "Rename",
        };
        modalStore.trigger(prompt);
    };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<span on:click={() => rename(row.type, row.path)} class="cursor-pointer">
    <Icon src={PencilSquare} theme="solid" class="mx-2 w-6 inline-block" />
</span>
