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
				max: [_.isNumber, undefined, 2],

				// The number of pixels to space the columns with.
				spacing: [_.isNumber, undefined, 0]
			},

			// The grid rows configuration.
			row: {
				// The maximum number of rows to allow.
				max: [_.isNumber, undefined, 2],

				// The number of pixels to space the rows with.
				spacing: [_.isNumber, undefined, 0]
			},

			// The Mac OS X space to assign the windows to.
			space: [_.isNumber, undefined, 1],

			// The configuration for each of the windows for the space.
			window: {
				// The name of the application recognizable by AppleScript.
				application: [_.isString, ''],

				// Invoke OSA commands after the window has launched.
				osascriptPost: [_.isArrayOrString, _.castToArray, []],

				// Invoke OSA commands before the window has launched.
				osascriptPre: [_.isArrayOrString, _.castToArray, []],

				// Invoke OSA commands to assist with launching the window.
				osascript: [_.isArrayOrString, _.castToArray, []],

				// Invoke shell commands after the window has launched.
				shellPost: [_.isArrayOrString, _.castToArray, []],

				// Invoke shell commands before the window has launched.
				shellPre: [_.isArrayOrString, _.castToArray, []],

				// Invoke shells commands to assist with launching the window.
				shell: [_.isArrayOrString, _.castToArray, []],

				// The title for the window.
				title: [_.isString, '']
			}
		};
	};
};
