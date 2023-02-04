<script>
	import { page } from "$app/stores";
	import { AppBar } from "@skeletonlabs/skeleton";
	import { Icon } from "@steeze-ui/svelte-icon";
	import { Folder } from "@steeze-ui/heroicons";
</script>

<div class="h-full w-full flex justify-center items-center">
	<div class="h-full w-full bg-surface-700 rounded-lg">
		<AppBar>
			<svelte:fragment slot="lead">
				<span class="text-lg"> Files </span>
			</svelte:fragment>
		</AppBar>

		<div class="flex">
			<div class="w-full p-4 border-b-4 border-surface-800">
				<Icon src={Folder} theme="solid" class="w-8 inline-block text-amber-200" />
				<span class="mt-1 ml-1.5 absolute">Folder</span>
			</div>
		</div>
	</div>
</div>
