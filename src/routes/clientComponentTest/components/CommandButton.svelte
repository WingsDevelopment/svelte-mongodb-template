<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import TooltipButton from '$lib/components/TooltipButton.svelte';
	import AddIcon from '$lib/icons/AddIcon.svelte';
	import type { BlogContentRow } from '$lib/models/Blog';
	import CommandStore from '$lib/store/CommandStore';

	export let row: BlogContentRow;

	let isOptionsOpen = false;

	const {
		addCodeRowItemCommand,
		addEmbedRowItemCommand,
		addImageRowItemCommand,
		addSeparatorRowItemCommand,
		addVideoRowItemCommand
	} = CommandStore;
</script>

<!-- {#if row.type === BlogContentRowType.Text}
	
{/if} -->
<div class="command-button">
	<TooltipButton
		tooltip="Add image, code, video, etc."
		onClick={() => {
			isOptionsOpen = !isOptionsOpen;
		}}
		className={`${
			isOptionsOpen ? 'rotate-45' : 'rotate-0'
		} transition-transform duration-500 ease-in-out`}
	>
		<AddIcon />
	</TooltipButton>
	{#if isOptionsOpen}
		<span class="command-button-tooltip">
			<div class="flex space-x-2 items-center justify-center">
				<TooltipButton
					tooltip="Upload image"
					onClick={() => {
						isOptionsOpen = false;
						addImageRowItemCommand(row.id, '');
					}}
				>
					<AddIcon />
				</TooltipButton>
				<TooltipButton
					tooltip="Search for image"
					onClick={() => {
						isOptionsOpen = false;
						addImageRowItemCommand(row.id, '');
					}}
				>
					<AddIcon />
				</TooltipButton>
				<TooltipButton
					tooltip="Add video"
					onClick={() => {
						isOptionsOpen = false;
						addVideoRowItemCommand(row.id, '');
					}}
				>
					<AddIcon />
				</TooltipButton>
				<TooltipButton
					tooltip="Add embeded"
					onClick={() => {
						isOptionsOpen = false;
						addEmbedRowItemCommand(row.id, '');
					}}
				>
					<AddIcon />
				</TooltipButton>
				<TooltipButton
					tooltip="Create code block"
					onClick={() => {
						isOptionsOpen = false;
						addCodeRowItemCommand(row.id, '');
					}}
				>
					<AddIcon />
				</TooltipButton>
				<TooltipButton
					tooltip="Add separator"
					onClick={() => {
						isOptionsOpen = false;
						addSeparatorRowItemCommand(row.id);
					}}
				>
					<AddIcon />
				</TooltipButton>
			</div>
		</span>
	{/if}
</div>

<style>
	.command-button {
		@apply relative inline-block border-b border-dotted border-black;
	}

	/* render tooltip on the right side of command-button element */
	.command-button .command-button-tooltip {
		@apply block absolute z-10 left-16 top-0;
	}
</style>
