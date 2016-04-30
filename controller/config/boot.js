/**
*
* Imports and normalized the clients configuration.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @method boot
* @memberof controller/config
* @param {string} input The configuration file to load for the instance.
* @returns {object} The normalized configuration.
*
**/
module.exports = function() {
	'use strict';

	// Wrap the Function.
	return function() {
		// Verify that the configuration file exists.
		var exists = fs.existsSync(cli.config);

		// If the file cannot be access, throw a error.
		if (exists === false) {
			return log.error('The configration file doesn\'t exist or cannot be accessed.', '(' + cli.config + ')');
		}

		// By default return a fail state.
		var config = false;

		// Attempt to read and parse the configuration file.
		try {
			// Read and parse the configuration.
			config = JSON.parse(fs.readFileSync(cli.config));

			// Throw a success to console.
			log.success('Configuration loaded successfully.', '(' + cli.config + ')');
		}

		// Catch any exceptions.
		catch (exception) {
			// Throw a error to console.
			log.error('Unable to read or parse JSON configuration file.', '(' + cli.config + ')', exception);
		}

		// Return the configuration.
		return config;
	};
};
