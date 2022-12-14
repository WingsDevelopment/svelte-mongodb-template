<script lang="ts">
	import type { Blog } from '$lib/models/Blog';
	import BlogStore from '$lib/store/BlogStore';
	import CommandStore from '$lib/store/CommandStore';
	import { onDestroy } from 'svelte';
	import Row from './components/Row.svelte';

	let blog: Blog;

	const unsubscribe = BlogStore.subscribe((value) => {
		blog = value;
	});

	const { addCodeRowCommand, removeRowCommand, undo, redo } = CommandStore;

	onDestroy(() => {
		unsubscribe();
	});
</script>

<ul>
	{#each blog.content.rows as row}
		<Row {row} />
	{/each}
</ul>

<button on:click={() => addCodeRowCommand('test')}>Add Code Row</button>
<button on:click={() => undo()}>Undo</button>
<button on:click={() => redo()}>Redo</button>
