const ENVIRONMENT_VARIABLES = ['VITE_MONGODB_URI', 'VITE_MONGODB_NAME'] as const;

type EnvironmentVariable = typeof ENVIRONMENT_VARIABLES[number];

const convertEnv = (env: string | boolean) => {
	if (typeof env === 'string') return env;

	return '';
};

export const ENV = (envName: EnvironmentVariable) => convertEnv(import.meta.env[envName]);
