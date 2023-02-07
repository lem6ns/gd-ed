<script lang="ts">
    import Rename from "./Rename.svelte";
    import Delete from "./Delete.svelte";
    import Share from "./Share.svelte";
    import Move from "./Move.svelte";

    export let row: Record<string, any>;
    export let items: any;
</script>

<Share {row} {items} />
<Move {row} {items} />
<Rename {row} {items} />
<Delete {row} {items} />
