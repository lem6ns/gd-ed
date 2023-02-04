<script lang="ts">
	import { page } from "$app/stores";
	import TableView from "$lib/components/TableView.svelte";
	import { AppBar } from "@skeletonlabs/skeleton";

	const items = [
		{
			type: "folder",
			name: "totally not porn (it isn't porn)",
			dateModified: new Date().toUTCString(),
			size: null,
		},
		{
			type: "file",
			name: "gaming.png",
			dateModified: new Date().toUTCString(),
			size: 1000,
		},
		{
			type: "folder",
			name: "totally not porn (it isn't porn)",
			dateModified: new Date().toUTCString(),
			size: null,
		},
		{
			type: "file",
			name: "gaming.png",
			dateModified: new Date().toUTCString(),
			size: 1000,
		},
		{
			type: "folder",
			name: "totally not porn (it isn't porn)",
			dateModified: new Date().toUTCString(),
			size: null,
		},
		{
			type: "file",
			name: "gaming.png",
			dateModified: new Date().toUTCString(),
			size: 1000,
		},
		{
			type: "folder",
			name: "totally not porn (it isn't porn)",
			dateModified: new Date().toUTCString(),
			size: null,
		},
		{
			type: "file",
			name: "gaming.png",
			dateModified: new Date().toUTCString(),
			size: 1000,
		},
		{
			type: "folder",
			name: "totally not porn (it isn't porn)",
			dateModified: new Date().toUTCString(),
			size: null,
		},
		{
			type: "file",
			name: "gaming.png",
			dateModified: new Date().toUTCString(),
			size: 1000,
		},
		{
			type: "folder",
			name: "totally not porn (it isn't porn)",
			dateModified: new Date().toUTCString(),
			size: null,
		},
		{
			type: "file",
			name: "gaming.png",
			dateModified: new Date().toUTCString(),
			size: 1000,
		},
		{
			type: "folder",
			name: "totally not porn (it isn't porn)",
			dateModified: new Date().toUTCString(),
			size: null,
		},
		{
			type: "file",
			name: "gaming.png",
			dateModified: new Date().toUTCString(),
			size: 1000,
		},
		{
			type: "folder",
			name: "totally not porn (it isn't porn)",
			dateModified: new Date().toUTCString(),
			size: null,
		},
		{
			type: "file",
			name: "gaming.png",
			dateModified: new Date().toUTCString(),
			size: 1000,
		},
		{
			type: "folder",
			name: "totally not porn (it isn't porn)",
			dateModified: new Date().toUTCString(),
			size: null,
		},
		{
			type: "file",
			name: "gaming.png",
			dateModified: new Date().toUTCString(),
			size: 1000,
		},
		{
			type: "folder",
			name: "totally not porn (it isn't porn)",
			dateModified: new Date().toUTCString(),
			size: null,
		},
		{
			type: "file",
			name: "gaming.png",
			dateModified: new Date().toUTCString(),
			size: 1000,
		},
		{
			type: "folder",
			name: "totally not porn (it isn't porn)",
			dateModified: new Date().toUTCString(),
			size: null,
		},
		{
			type: "file",
			name: "gaming.png",
			dateModified: new Date().toUTCString(),
			size: 1000,
		},
		{
			type: "folder",
			name: "totally not porn (it isn't porn)",
			dateModified: new Date().toUTCString(),
			size: null,
		},
		{
			type: "file",
			name: "gaming.png",
			dateModified: new Date().toUTCString(),
			size: 1000,
		},
		{
			type: "folder",
			name: "totally not porn (it isn't porn)",
			dateModified: new Date().toUTCString(),
			size: null,
		},
		{
			type: "file",
			name: "gaming.png",
			dateModified: new Date().toUTCString(),
			size: 1000,
		},
		{
			type: "folder",
			name: "totally not porn (it isn't porn)",
			dateModified: new Date().toUTCString(),
			size: null,
		},
		{
			type: "file",
			name: "gaming.png",
			dateModified: new Date().toUTCString(),
			size: 1000,
		},
		{
			type: "folder",
			name: "totally not porn (it isn't porn)",
			dateModified: new Date().toUTCString(),
			size: null,
		},
		{
			type: "file",
			name: "gaming.png",
			dateModified: new Date().toUTCString(),
			size: 1000,
		},
		{
			type: "folder",
			name: "totally not porn (it isn't porn)",
			dateModified: new Date().toUTCString(),
			size: null,
		},
		{
			type: "file",
			name: "gaming.png",
			dateModified: new Date().toUTCString(),
			size: 1000,
		},
		{
			type: "folder",
			name: "totally not porn (it isn't porn)",
			dateModified: new Date().toUTCString(),
			size: null,
		},
		{
			type: "file",
			name: "gaming.png",
			dateModified: new Date().toUTCString(),
			size: 1000,
		},
		{
			type: "folder",
			name: "totally not porn (it isn't porn)",
			dateModified: new Date().toUTCString(),
			size: null,
		},
		{
			type: "file",
			name: "gaming.png",
			dateModified: new Date().toUTCString(),
			size: 1000,
		},
		{
			type: "folder",
			name: "totally not porn (it isn't porn)",
			dateModified: new Date().toUTCString(),
			size: null,
		},
		{
			type: "file",
			name: "gaming.png",
			dateModified: new Date().toUTCString(),
			size: 1000,
		},
	];
</script>

<div class="h-full w-full flex justify-center items-center">
	<div class="h-full w-full bg-surface-700 rounded-lg">
		<AppBar>
			<svelte:fragment slot="lead">
				<span class="text-lg">Files</span>
			</svelte:fragment>
		</AppBar>

		<TableView {items} />
	</div>
</div>
