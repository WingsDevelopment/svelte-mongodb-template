<script lang="ts">
	export let count: number;
	export let changeCount: (count: number) => void;

	console.log('CounterDisplay');
	console.log(count);
</script>

<div>
	<p>
		CounterDisplay:
		<span>{count}</span>
	</p>
	<button on:click={() => changeCount(count - 1)}>Decrease</button>
	<button on:click={() => changeCount(count + 1)}>Increase</button>
	<button disabled={count !== 2}>test?</button>
</div>
