const path = require('path');
const nodeExternals = require('webpack-node-externals');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');
const webpack = require('webpack');

const env = process.env.NODE_ENV || 'production';

const rootPath = path.resolve(__dirname);
const srcPath = path.resolve(rootPath, 'src');

function makePlugins() {
	const plugins = [
		new webpack.ProgressPlugin(),
	];

	if (env === 'development') {
		const plugins_development = [
			new ForkTsCheckerWebpackPlugin(),
			new ForkTsCheckerNotifierWebpackPlugin(),
			new NodemonPlugin({
				watch: path.resolve(__dirname, '.webpack'),
				script: path.resolve(__dirname, '.webpack', 'main.js'),
			}),
		];
		for (const p of plugins_development) { plugins.push(p); }
	}

	return plugins;
}

const config = {
	mode: env,
	entry: path.resolve(srcPath, 'index.ts'),
	target: 'node',
	devtool: 'source-map',
	output: {
		libraryTarget: 'commonjs',
		path: path.join(__dirname, '.webpack'),
		filename: '[name].js',
	},
	module: {
		rules: [
			// all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
			{
				test: /\.(tsx?)$/,
				loader: 'ts-loader',
				exclude: [
					[
						path.resolve(__dirname, 'node_modules'),
						path.resolve(__dirname, '.webpack'),
					],
				],
			},
		],
	},
	resolve: {
		extensions: [".ts", ".js", ".json"],
	},
	plugins: makePlugins(),
	externals: [nodeExternals({
		additionalModuleDirs: ['../../node_modules'],
		allowlist: ['@nrh/protocols'],
	})],
};

module.exports = config;
