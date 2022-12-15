<script lang="ts">
	import type { Blog } from '$lib/models/Blog';
	import BlogStore from '$lib/store/BlogStore';
	import CommandStore from '$lib/store/CommandStore';
	import { onDestroy } from 'svelte';
	import Row from './components/Row.svelte';

	let blog: Blog;
	let undoCount: number = 0;
	let redoCount: number = 0;
	let ctrlDown: boolean = false;

	const blogUnsubscribe = BlogStore.subscribe((value) => {
		blog = value;
	});
	const stackUnsubscribe = CommandStore.subscribe((value) => {
		undoCount = value.undoStack.length;
		redoCount = value.redoStack.length;
	});

	const { addTextRowCommand, undo, redo } = CommandStore;

	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === 'Control' || e.key === 'Meta') {
			ctrlDown = true;
		}
		if (ctrlDown && e.key === 'z') {
			e.preventDefault();
			undo();
			return false;
		}
		if (ctrlDown && e.key === 'y') {
			e.preventDefault();
			redo();
			return false;
		}
	};

	const handleKeyup = (e: KeyboardEvent) => {
		if (e.key === 'Control' || e.key === 'Meta') {
			ctrlDown = false;
		}
	};

	onDestroy(() => {
		blogUnsubscribe();
		stackUnsubscribe();
	});
</script>

<svelte:window on:keydown={handleKeydown} on:keyup={handleKeyup} />

<ul>
	{#each blog.content.rows as row}
		<Row {row} />
	{/each}
</ul>

<button on:click={() => addTextRowCommand('test')}>Add Text Row</button>
<button on:click={() => undo()}>Undo ({undoCount})</button>
<button on:click={() => redo()}>Redo ({redoCount})</button>
