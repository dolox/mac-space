/**
*
* The normalization instructions for the configuration.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @method instruction
* @memberof controller/config
* @returns {object} A set of normalization instructions.
*
**/
module.exports = function() {
	'use strict';

	// Wrap the Function.
	return function() {
		// Build the instructions.
		return {
			// The delay between launching windows.
			delay: [_.isNumber, undefined, 0.5],

			// The configuration for the space.
			space: [_.isArrayOrObject, _.castToArray, []]
		};
	};
};
