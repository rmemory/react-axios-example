/* Top level webpack configuration

   This file merges the content from all other webpack config files located in
   the 'config' directory.

   Here is a great course that explains this entire architecture:
   https://webpack.academy
*/

const webpackMerge = require('webpack-merge');

/* Import a couple common files */
const buildValidations = require('./config/build-validations');
const commonConfig = require('./config/webpack.common');

/* Using this function, npm scripts can include Webpack plugins, through the
   concept of addons. These do not need to run every time an npm script is
   run. The only current example is the 'Bundle Analyzer', but using this
   mechanism we could add other 'addons' */
const addons = (/* string | string[] */ addonsArg) => {
	const filteredAddons = [...[addonsArg]]
		.filter(Boolean); /* If addons arg is undefined, filter it out. Note,
							 passing Boolean to filter() will remove all falsy
							 (false, null, undefined, 0, NaN or an empty
							 string) items out of an array. Perty cool. */

	// Return an array of files that contain the addon config files */
	return filteredAddons.map(addonName =>
		require(`./config/addons/webpack.${addonName}.js`), // eslint-disable-line global-require, import/no-dynamic-require
	);
};

/* Webpack configuration goes here, which is assembled from various config
   files in the 'config' directory

   The 'env' arg will contain the environment variables from 'scripts' section
   in 'package.json', prefixed with 'env' */
// console.log(env); => { env: 'dev' }
module.exports = (env) => {
	/* use 'buildValidations' to check for the 'env' flag; all scripts must
	   pass an 'env' var */
	if (!env) {
		throw new Error(buildValidations.ERR_NO_ENV_FLAG);
	}

	/* Select which Webpack configuration to use; development or production */
	// console.log(env.env); => dev
	const envConfig = require(`./config/webpack.${env.env}.js`); // eslint-disable-line global-require, import/no-dynamic-require

	/* 'webpack-merge' will combine all configurations, meaning the environment
	   specific configurations and any addons we are including */
	const mergedConfig = webpackMerge(
		commonConfig,
		envConfig,
		...addons(env.addons), /* return value converted to an iterable in case
								  there are multiple addons */
	);

	// Then return the final configuration for Webpack
	return mergedConfig;
};
