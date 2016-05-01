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
			// The name of the application recognizable by AppleScript.
			application: [_.isString, undefined, ''],

			// A description for the window.
			description: [_.isString, undefined, ''],

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
			title: [_.isString, undefined, '']
		};
	};
};
