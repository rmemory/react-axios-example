/* eslint-disable import/no-extraneous-dependencies */
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonPaths = require('./common-paths');

const config = {
	mode: 'production',

	entry: {
		app: ['babel-polyfill', `${commonPaths.appEntry}/index.js`],
	},

	output: {
		filename: 'static/[name].[hash].js',
	},

	devtool: 'source-map', /* A full SourceMap is emitted as a separate file.
							  It adds a reference comment to the bundle so
							  development tools know where to find it. To
							  entirely omit source maps, remove this line */

	module: {
		rules: [
			{
				test: /\.css$/,
				/* ExtractTextPlugin moves all the required *.css modules in
				   entry chunks into a separate CSS file. So your styles are
				   no longer inlined into the JS bundle, but in a separate
				   CSS file (styles.css). If your total stylesheet volume is
				   big, it will be faster because the CSS bundle is loaded in
				   parallel to the JS bundle. */
				use: ExtractTextPlugin.extract({
					/* According to docs for ExtractTextPlugin, style-loader can
					   Only be a fallback */
					fallback: 'style-loader',
					use: [
						// 'css-loader',
						{
							loader: 'css-loader',
							options: {
								modules: false,
								importLoaders: 1,
								camelCase: true,
								sourceMap: true,
							},
						},
						{
							loader: 'postcss-loader',
							options: {
								config: {
									ctx: {
										autoprefixer: {
											browsers: 'last 2 versions',
										},
									},
								},
							},
						},
					],
				}),
			},
		],
	},
	plugins: [
		new ExtractTextPlugin({
			filename: 'styles/styles.[hash].css',
			allChunks: true,
		}),
	],
};
module.exports = config;
