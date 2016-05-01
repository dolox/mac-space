/**
*
* The normalization instructions for the `space` namespace of the configuration.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @method space
* @memberof controller/config/instruction
* @returns {object} A set of normalization instructions.
*
**/
module.exports = function() {
	'use strict';

	// Wrap the Function.
	return function() {
		// Build the instructions.
		return {
			// The grid columns configuration.
			column: {
				// The maximum number of columns to allow.
				max: [_.isNumber, undefined, 0],

				// The number of pixels to space the columns with.
				spacing: [_.isNumber, undefined, 0]
			},

			// Whether the space is enabled or not.
			enabled: [_.isBoolean, undefined, true],

			// The grid rows configuration.
			row: {
				// The maximum number of rows to allow.
				max: [_.isNumber, undefined, 0],

				// The number of pixels to space the rows with.
				spacing: [_.isNumber, undefined, 0]
			},

			// The Mac OS X space to assign the windows to.
			space: [_.isNumber, undefined, 1],

			// The configuration for each of the windows for the space.
			window: [_.isArrayOrObject, _.castToArray, []]
		};
	};
};
