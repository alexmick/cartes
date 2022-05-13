/* eslint-env node */
const HTMLPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')
const { NormalModuleReplacementPlugin } = require('webpack')

module.exports.default = {
	watchOptions: {
		// not setting this option resulted in too many files being watched
		// TODO we may have a problem with the number of node dependencies here, some not useful now that publicodes is outside this project. Is there a tool to prune dependencies in package.json ?
		ignored: /node_modules/,
	},
	resolve: {
		fallback: {
			path: 'path-browserify',
			buffer: 'buffer',
		},
		alias: {
			Actions: path.resolve('source/actions/'),
			Components: path.resolve('source/components/'),
			Pages: path.resolve('source/pages/'),
			Selectors: path.resolve('source/selectors/'),
			Reducers: path.resolve('source/reducers/'),
			Types: path.resolve('source/types/'),
			Images: path.resolve('source/images/'),
		},
		extensions: ['.js', '.ts', '.tsx'],
	},
	entry: {
		publicodes: './source/sites/publicodes/entry.js',
		iframe: './source/sites/publicodes/iframe.js',
	},
	output: {
		path: path.resolve('./dist/'),
		globalObject: 'self',
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				'./manifest.webmanifest',
				'./source/sites/publicodes/sitemap.txt',
				'./iframeResizer.contentWindow.min.js',
				'./source/images/logo.svg',
				{
					from: './source/images',
					to: 'images',
				},
				{
					from: './source/data',
					to: 'data',
				},
			],
		}),
		new NormalModuleReplacementPlugin(
			/react-easy-emoji/,
			'Components/emoji.js'
		),
	],
}

module.exports.styleLoader = (styleLoader) => ({
	test: /\.css$/,
	use: [
		{ loader: styleLoader },
		{
			loader: 'css-loader',
			options: {
				sourceMap: true,
				importLoaders: 1,
			},
		},
		{
			loader: 'postcss-loader',
		},
	],
})

module.exports.commonLoaders = (mode = 'production') => {
	const babelLoader = {
		loader: 'babel-loader',
		options: {
			presets: [
				[
					'@babel/preset-env',
					{
						targets: {
							esmodules: true,
						},
						useBuiltIns: 'entry',
						corejs: '3',
					},
				],
			],
			plugins: [
				// ... other plugins
				mode === 'development' && require.resolve('react-refresh/babel'),
			].filter(Boolean),
		},
	}

	return [
		{
			test: /node_modules\/vfile\/core\.js/,
			use: [
				{
					loader: 'imports-loader',
					options: {
						type: 'commonjs',
						imports: ['single process/browser process'],
					},
				},
			],
		},
		{
			test: /\.(js|ts|tsx)$/,
			use: [babelLoader],
			exclude: /node_modules|dist/,
		},
		{
			test: /\.(jpe?g|png|svg)$/,
			type: 'asset/resource',
		},

		{
			test: /\.yaml$/,
			use: ['yaml-loader'],
		},
		{
			test: /\.csv$/,
			loader: 'csv-loader',
			options: {
				dynamicTyping: true,
				header: true,
				skipEmptyLines: true,
			},
		},
		{
			test: /\.(ttf|woff2?)$/,
			type: 'asset/resource',
		},

		{ test: /\.mp3$/, type: 'asset/resource' },
	]
}

module.exports.HTMLPlugins = ({ injectTrackingScript = false } = {}) => [
	new HTMLPlugin({
		template: 'index.html',
		favicon: '/logo.svg',
		logo: '/logo.png',
		chunks: ['publicodes'],
		title: 'Futureco 🔥',
		description:
			//"Êtes-vous écolo ? Faites le test en 2 minutes. Découvrez l'impact climat de votre quotidien.",
			"Découvrez l'empreinte climat des choses de votre quotidien",
		filename: 'index.html',
		injectTrackingScript,
		base: '/',
	}),
]
