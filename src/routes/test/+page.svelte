<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	console.log('data.cars');
	console.log(data.cars);
</script>

<h1 class="text-3xl font-bold underline">Hello from tailwind!</h1>
<ul>
	{#each data.cars as car}
		<li>
			<h3>{car.name}</h3>
		</li>
	{/each}
</ul>
