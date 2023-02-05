<script lang="ts">
    import { page } from "$app/stores";
    import { modalStore, type ModalSettings } from "@skeletonlabs/skeleton";
    import { PencilSquare } from "@steeze-ui/heroicons";
    import { Icon } from "@steeze-ui/svelte-icon";

    export let items: any;
    export let selected: Record<string, any>[];

    const rename = async (type: string, oldPath: string, newName: string) => {
        const success = !(
            await fetch(
                `/api/files/${type === "file" ? "renameFile" : "renameFolder"}`,
                {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({
                        oldPath,
                        newPath: newName,
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
    };

    const renameSelected = () => {
        let find: string;
        let replace: string;
        const findPrompt: ModalSettings = {
            type: "prompt",
            title: "Find & Replace",
            body: "Enter what string you want to find in the filename. (ex. potatosalad.png, potato)",
            value: "",
            response: (r: string) => {
                if (!r) return;
                find = r;
            },
            buttonTextCancel: "Cancel",
            buttonTextSubmit: "Find",
        };
        const replacePrompt: ModalSettings = {
            type: "prompt",
            title: "Find & Replace",
            body: "Enter what string you want to replace in the filename. (ex. potatosalad.png -> tomatosalad.png, tomato)",
            value: "",
            response: (r: string) => {
                if (!r) return;
                replace = r;
                selected.forEach((row) => {
                    rename(
                        row.type,
                        row.path,
                        row.path
                            .split("\\")
                            .pop()
                            .split("/")
                            .pop()
                            .replace(find, replace)
                    );
                });
            },
            buttonTextCancel: "Cancel",
            buttonTextSubmit: "Replace",
        };
        modalStore.trigger(findPrompt);
        modalStore.trigger(replacePrompt);
    };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<span on:click={() => renameSelected()} class="cursor-pointer">
    <Icon src={PencilSquare} theme="solid" class="mx-2 w-6 inline-block" />
</span>
