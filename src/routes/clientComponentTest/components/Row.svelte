<script lang="ts">
	import type { BlogContentRow } from '$lib/models/Blog';
	import CommandStore from '$lib/store/CommandStore';

	export let row: BlogContentRow;

	const { removeRowCommand } = CommandStore;
</script>

<li>
	<h1>id: {row.id}</h1>
	<p>type: {row.type}</p>
	check if row is type of CodeBlogContentRow
	<div>
		<button on:click={() => removeRowCommand(row)}>Remove Row</button>
	</div>
</li>
