<script lang="ts">
    import { ArrowRight } from "@steeze-ui/heroicons";
    import { Icon } from "@steeze-ui/svelte-icon";

    export let row: Record<string, any>;
    export let items: any;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<span on:click={() => {}} class="cursor-pointer">
    <Icon src={ArrowRight} theme="solid" class="mx-2 w-6 inline-block" />
</span>