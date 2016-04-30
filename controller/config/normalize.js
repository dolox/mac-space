/**
*
* Normalize a configuration Object.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @method normalize
* @memberof controller/config
* @param {object} input The configuration Object to normalize.
* @returns {object} The normalized configuration.
*
**/
module.exports = function() {
	'use strict';

	// Wrap the Function.
	return function(input) {
		// Normalize the top level of the configuration.
		input = _.normalizeObjectValues(input, app.controller.config.instruction());

		// Normalize the space(s).
		if (input.space.length !== 0) {
			// Iterate through each of the space configuration(s) and normalize them.
			_.each(input.space, function(value, key) {
				// Normalize the top level of the configuration.
				input[key] = _.normalizeObjectValues(value, app.controller.config.instruction.space());
			});
		}

		// Return the normalized configuration.
		return input;
	};
};
