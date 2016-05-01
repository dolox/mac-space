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
			_.each(input.space, function(spaceValue, spaceKey) {
				// Normalize the top level of the configuration.
				input.space[spaceKey] = _.normalizeObjectValues(spaceValue, app.controller.config.instruction.space());

				// Normalize the window(s).
				if (input.space[spaceKey].window.length !== 0) {
					// Iterate through each of the window configuration(s) and normalize them.
					_.each(input.space[spaceKey].window, function(windowValue, windowKey) {
						// Normalize the top level of the configuration.
						input.space[spaceKey].window[windowKey] = _.normalizeObjectValues(windowValue, app.controller.config.instruction.space.window());

					});
				}
			});
		}

		// Return the normalized configuration.
		return input;
	};
};
