<script lang="ts">
    import { UserPlus } from "@steeze-ui/heroicons";
    import { Icon } from "@steeze-ui/svelte-icon";

    export let items: any;
    export let selected: Record<string, any>[];
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<span on:click={() => {}} class="cursor-pointer">
    <Icon src={UserPlus} theme="solid" class="mx-2 w-6 inline-block" />
</span>