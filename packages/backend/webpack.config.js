const path = require('path');

const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const env = process.env.NODE_ENV || 'production';

const rootPath = path.resolve(__dirname);
const srcPath = path.resolve(rootPath, 'src');

function makePlugins() {
	const plugins = [
		new webpack.ProgressPlugin(),
		new webpack.DefinePlugin({
			// 라이브러리에서 process.env.xxx 쓰는것까징 웹팩이 치환하지 못한다
			// 그래서 값만 넘기고 런타임에 갈아끼우는 방향으로 접근
			'process.env.WEBPACK_GIT_BRANCH': JSON.stringify(process.env.GIT_BRANCH ?? ''),
			'process.env.WEBPACK_GIT_TAG': JSON.stringify(process.env.GIT_TAG ?? ''),
			'process.env.WEBPACK_COMMIT_ID': JSON.stringify(process.env.COMMIT_ID ?? ''),
			'process.env.WEBPACK_COMMIT_DATE': JSON.stringify(process.env.COMMIT_DATE ?? ''),
			'process.env.WEBPACK_BUILD_DATE': JSON.stringify(process.env.BUILD_DATE ?? ''),
		}),
	];
	return plugins;
}

const config = {
	mode: env,
	entry: {
		handlers: './dist/src/handlers.js',
	},
	devtool: env === 'production'
		? 'source-map'
		: 'eval-cheap-module-source-map',
	output: {
		libraryTarget: 'commonjs',
		path: path.join(__dirname, '.webpack'),
		filename: '[name].js',
	},
	externalPresets: { node: true },
	node: { __dirname: true },
	plugins: makePlugins(),
	externals: [nodeExternals({
		additionalModuleDirs: ['../../node_modules'],
		allowlist: ['@nrh/protocols'],
	})],
	optimization: {
		minimize: false,
		removeAvailableModules: false,
		removeEmptyChunks: false,
		splitChunks: false,
	},
	performance: {
		hints: false,
	},
};

module.exports = config;
