<script lang="ts">
	import { useEffect } from '$lib/hooks/useEffect';
	import { BlogContentRowType, type BlogContentRow } from '$lib/models/Blog';
	import CommandStore from '$lib/store/CommandStore';
	import { onMount, text } from 'svelte/internal';
	import CommandButton from './CommandButton.svelte';
	import CodeBlogContentRowItem from './rowComponents/CodeBlogContentRowItem.svelte';
	import EmbedBlogContentRow from './rowComponents/EmbedBlogContentRowItem.svelte';
	import ImageBlogContentRow from './rowComponents/ImageBlogContentRowItem.svelte';
	import SeparatorBlogContentRow from './rowComponents/SeparatorBlogContentRowItem.svelte';
	import VideoBlogContentRow from './rowComponents/VideoBlogContentRowItem.svelte';

	export let row: BlogContentRow;

	const { updateTextRowCommand } = CommandStore;
	let textAreaString: string = row.text;
	let oldTextAreaString: string;
	$: rowText = row.text;

	useEffect(
		() => {
			if (textAreaString !== row.text) textAreaString = rowText;
			return () => {};
		},
		() => [rowText]
	);

	function handleKeydown(event: { key: any; code: any }) {
		//check if key is space
		if (event.key === ' ') {
			if (oldTextAreaString !== textAreaString) {
				console.log('updateTextRowCommand');
				updateTextRowCommand(row, textAreaString);
				oldTextAreaString = textAreaString;
			}
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="flex space-x-2 items-center justify-center">
	{#if row.item === undefined}
		{#if row.text === ''}
			<CommandButton {row} />
		{/if}
		<div>
			{row.text}
			<textarea class="w-full h-32" bind:value={textAreaString} placeholder="Enter text here..." />
		</div>
	{/if}
	{#if row.item?.type === BlogContentRowType.Code}
		<CodeBlogContentRowItem item={row.item} />
	{:else if row.item?.type === BlogContentRowType.Embed}
		<EmbedBlogContentRow item={row.item} />
	{:else if row.item?.type === BlogContentRowType.Image}
		<ImageBlogContentRow item={row.item} />
	{:else if row.item?.type === BlogContentRowType.Separator}
		<SeparatorBlogContentRow item={row.item} />
	{:else if row.item?.type === BlogContentRowType.Video}
		<VideoBlogContentRow item={row.item} />
	{/if}
</div>
