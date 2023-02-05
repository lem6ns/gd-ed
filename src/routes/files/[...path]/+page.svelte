<script lang="ts">
    import { page, navigating } from "$app/stores";
    import TableView from "$lib/components/Table/TableView.svelte";
    import {
        AppBar,
        ProgressRadial,
        modalStore,
        type ModalSettings,
    } from "@skeletonlabs/skeleton";
    import { CloudArrowUp, FolderPlus } from "@steeze-ui/heroicons";
    import { Icon } from "@steeze-ui/svelte-icon";
    import { onMount } from "svelte";
    import { writable } from "svelte/store";

    let items = writable([]);
    let loading = true;
    const getItems = async () => {
        $items = [];
        loading = true;
        $items = (
            await fetch(
                `/api/files/list`,
                {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({
                        path:
                            $navigating?.to?.params?.path ?? $page.params.path,
                    }),
                }
            ).then((r) => r.json())
        ).data;
        loading = false;
    };

    const newFolderPrompt = (): void => {
        const prompt: ModalSettings = {
            type: "prompt",
            title: "New Folder",
            body: "Enter the new folder name.",
            // Populates the initial input value
            value: "",
            // Returns the updated response value
            response: async (r: string) => {
                if (!r) return;
                const success = !(
                    await fetch(`/api/files/newFolder`, {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                        },
                        body: JSON.stringify({
                            path: `${
                                $page.params.path ? `${$page.params.path}/` : ""
                            }${r}`,
                        }),
                    }).then((r) => r.json())
                ).error;
                if (success) {
                    $items = (
                        await fetch(`/api/files/list`, {
                            method: "POST",
                            headers: {
                                "content-type": "application/json",
                            },
                            body: JSON.stringify({
                                path:
                                    $navigating?.to?.params?.path ??
                                    $page.params.path,
                            }),
                        }).then((r) => r.json())
                    ).data;
                    loading = false;
                }
            },
            // Optionally override the button text
            buttonTextCancel: "Cancel",
            buttonTextSubmit: "Create",
        };
        modalStore.trigger(prompt);
    };

    $: if ($navigating) getItems();
    onMount(getItems);
</script>

<div class="h-full w-full flex justify-center items-center">
    <div class="h-full w-full bg-surface-700 rounded-lg">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <AppBar>
            <svelte:fragment slot="lead">
                <span class="text-lg">Files</span>
            </svelte:fragment>
            <svelte:fragment slot="trail">
                <span on:click={() => newFolderPrompt()}>
                    <Icon
                        src={FolderPlus}
                        theme="solid"
                        class="w-8 h-8 inline-block cursor-pointer"
                    />
                </span>
                <Icon
                    src={CloudArrowUp}
                    theme="solid"
                    class="w-8 h-8 inline-block"
                />
            </svelte:fragment>
        </AppBar>

        {#key $items}
            {#if loading}
                <div class="h-64 w-64 mx-auto mt-12">
                    <ProgressRadial stroke={20} />
                </div>
            {:else}
                <TableView {items} />
            {/if}
        {/key}
    </div>
</div>
