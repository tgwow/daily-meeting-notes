module.exports = {
	env: {
		commonjs: true,
		es6: true,
		node: true,
	},
	extends: [
		'airbnb-base',
	],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parserOptions: {
		ecmaVersion: 2018,
	},
	rules: {
		'indent': ['error', 'tab'],
		'no-tabs': 0,
		'comma-dangle': 0
	},
};
