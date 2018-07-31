/* eslint-disable import/no-extraneous-dependencies */

/* webpack.common.js contains all webpack configuration info that is common to
   all configurations */

const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonPaths = require('./common-paths');

const config = {
	entry: {
		// Split out the vendor module, as its a big boy
		vendor: ['react', 'react-dom'],
	},

	output: {
		path: commonPaths.outputPath,

		/* publicPath is an important option when using on-demand-loading or
		   loading external resources like images, files, etc. If an incorrect
		   value is specified you'll receive 404 errors while loading these
		   resources. And Hot reloading won’t work as expected for nested
		   routes without it */
		publicPath: '/',
	},

	/* Module: This describes what types of modules your application will
	   include, in our case we will support ESNext (Babel) and CSS Modules.

	   rules: How we handle each different type of module. Here is how rules
	   usually work:
	   {
		test: /\.YOUR_FILE_EXTENSION$/,
		exclude: /SOMETHING THAT IS THAT EXTENSION BUT SHOULD NOT BE PROCESSED/,
		use: {
		  loader: "loader for your file extension  or a group of loaders"
	   }
	 */
	module: {
		/* As webpack traverses the source dir, it builds a graph tree,
		   aka, the dependency graph. It does so using the various import,
		   require, export statements it finds. Its creating modules as it
		   does this. The rules define which files get added to the dependency
		   graph and how they are transformed */
		rules: [
			{
				// Transform all jsx files using babel-loader. See the .babelrc
				test: /\.js|.jsx?$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'fonts/',
					},
				}],
			},
			{
				// Not working yet
				test: /\.(jpg|png)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '/images/[hash].[ext]',
					},
				},
			},
		],
	},

	/* This optimization section is kind of magic. It makes sure the vendor
	   bundle size is as small as possible. See
	   https://github.com/webpack/webpack/issues/6357 */
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					chunks: 'initial',
					test: 'vendor',
					name: 'vendor',
					enforce: true,
				},
			},
		},
	},

	// loaders operate on a single file, plugins can operate on many files
	plugins: [
		/* Generate index.html based on our template; with no arg, the plugin
		   would attempt to create its own HTML file, but this causes it to
		   use our template */
		new HtmlWebpackPlugin({
			template: 'public/index.html',
			favicon: 'public/favicon.ico',
		}),
	],
};

module.exports = config;
