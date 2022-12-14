<script lang="ts">
	export let onClick: () => void;
	export let className: string | undefined = undefined;
</script>

<button on:click={onClick} class={className}><slot /></button>
