<script lang="ts">
	import Button from './Button.svelte';

	export let onClick: () => void;
	export let className: string | undefined = undefined;
	export let tooltip: string | undefined = undefined;
</script>

<div class="tooltip-button">
	<Button {className} {onClick}><slot /></Button>
	<span class="tooltip">
		{tooltip}
	</span>
</div>

<style>
	.tooltip-button {
		@apply relative inline-block border-b border-dotted border-black;
	}

	.tooltip-button .tooltip {
		@apply hidden w-32 bg-black text-white text-center rounded-md absolute z-10;
	}

	.tooltip-button:hover .tooltip {
		@apply block;
	}
</style>
