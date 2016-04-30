/**
*
* The main application which loads the spaces configuration.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @module index
*
* @return {undefined} Nothing is returned from this Function.
*
**/
module.exports = (function() {
	'use strict';

	// Load the Boostrap.
	require(require('path').join(__dirname, '/bootstrap'));

	// If no configuration file is missing.
	if (_.isString(_.get(cli, 'config')) === false) {
		// Throw a error to console.
		log.error('No configuration file specified.');

		// Stop the Function.
		return;
	}
	// Load and normalize the configuration for the instance.
	var config = app.controller.config.boot(cli.config);

	// If the configuration failed to normalize, or there's no `space`(s) to process, stop the Function.
	if (config === false || config.space.length === 0) {
		return;
	}

	// Iterate through each of the space(s) and load them.
	_.each(config.space, app.controller.space.boot.bind(null, config));
}());
