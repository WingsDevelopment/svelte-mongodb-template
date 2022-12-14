import { sveltekit } from '@sveltejs/kit/vite';
import { build } from 'vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	build: {
		commonjsOptions: {
			esmExternals: true
		}
	}
};

export default config;
