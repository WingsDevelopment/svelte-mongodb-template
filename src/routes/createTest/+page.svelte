<script lang="ts">
	import { invalidateAll, goto } from '$app/navigation';
	import { applyAction, deserialize } from '$app/forms';
	import type { ActionResult } from '@sveltejs/kit';

	async function handleSubmit() {
		const response = await fetch(this.action, {
			method: 'POST',
			body: new FormData(this)
		});
		const result: ActionResult = deserialize(await response.text());
		console.log(result);

		if (result.type === 'success') {
			// re-run all `load` functions, following the successful update
			await invalidateAll();
		}
		if (result.type === 'error') {
			// show the error message
			alert(result.error.message);
		}

		applyAction(result);
		//redirect to the test page
		goto('/test');
	}
</script>

<form method="POST" on:submit|preventDefault={handleSubmit}>
	<input name="name" type="name" />
	<button>Create test</button>
</form>
