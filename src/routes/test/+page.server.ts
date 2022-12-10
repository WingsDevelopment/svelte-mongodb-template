import db from '$lib/db';
import type { PageServerLoad } from './$types';

export const load = (<PageServerLoad>(async ({ params }) => {
	const cars = await db.collection('cars').find().toArray();
	console.log(cars);
	return {
		status: 200,
		cars: cars.map((car) => ({ name: car.name }))
	};
})) satisfies PageServerLoad;
