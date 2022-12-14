<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	let Paddle: any;

	if (browser) {
		// client-only code here
		console.log('browser');
	}

	onMount(async () => {
		console.log('onMount');
		const { window } = globalThis;
		Paddle = (window as any).Paddle;

		Paddle.Environment.set('sandbox');
		Paddle.Setup({
			vendor: 9356
		});
	});

	function openCheckout() {
		var form = document.getElementById('pre-checkout');
		if (!form) return;
		console.log('form.useremail.value');
		console.log('form.useremail.value');
		// Customer email
		// Customer country
		// Customer postcode ()
		Paddle.Checkout.open({
			product: 40505,
			email: 'form.useremail.value'
		});
	}
	// const { window } = globalThis;
	console.log('window.location');
	// let innerWidth = window.innerWidth;
	// console.log(innerWidth);
	// const Paddle = (window as any).Paddle;

	// const openCheckout = () => {
	// 	Paddle.Checkout.open({ product: 40505 });
	// };
</script>

<!-- <svelte:window bind:innerWidth /> -->

<div class="App">
	<header class="App-header">
		<!-- <button on:click={openCheckout}>Subscribe Now!</button> -->
	</header>

	<form id="pre-checkout">
		<input id="useremail" type="text" placeholder="Email address" />
	</form>
	<button on:click={openCheckout}>Buy now!</button>
</div>
