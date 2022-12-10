import db from '$lib/db';
import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export const actions: Actions = {
	default: async (event) => {
		console.log('event');
		const { request } = event;
		const data = await request.formData();
		const car = Object.fromEntries(data);

		await db.collection('cars').insertOne({
			...car
		});

		redirect(300, '/test');
		return {
			status: 400,
			body: {
				message: 'Car created'
			}
		};
	}
};
