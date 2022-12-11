import db from '$lib/db';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async (event) => {
		console.log('event');
		const { request } = event;
		const data = await request.formData();
		const car = Object.fromEntries(data);

		await db.collection('cars').insertOne({
			...car
		});

		return {
			status: 200,
			body: 'OK'
		};
	}
};
