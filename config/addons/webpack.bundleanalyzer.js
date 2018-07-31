/* eslint-disable import/no-extraneous-dependencies */

/* BundleAnalyzerPlugin is a webpack plugin and CLI utility that represents
   bundle content as convenient interactive zoomable treemap */

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
	plugins: [
		new BundleAnalyzerPlugin({
			analyzerMode: 'server', /* In server mode, analyzer will start an
									   HTTP server to show bundle report. */
		}),
	],
};
