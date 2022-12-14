import { writable } from 'svelte/store';

const { set, subscribe, update } = writable({
	count: 0
});

export const counterStore = {
	subscribe,
	increment: (t: number) =>
		update((counter) => {
			console.log(counter);
			counter.count = counter.count + t;
			return counter;
		}),
	decrement: (t: number) =>
		update((counter) => {
			console.log(counter);
			counter.count = counter.count - t;
			return counter;
		})
};
