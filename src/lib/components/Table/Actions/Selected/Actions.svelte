<script lang="ts">
    import Rename from "./Rename.svelte";
    import Delete from "./Delete.svelte";
    import Share from "./Share.svelte";

    export let selected: Record<string, any>[];
    export let items: any;
</script>

<Share {selected} {items} />
<Rename {selected} {items} />
<Delete {selected} {items} />
