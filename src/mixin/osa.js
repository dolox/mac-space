/**
*
* Lodash mixin.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @mixin src/mixin/osa
*
**/
module.exports = function() {
	'use strict';

	// Define the mixin.
	_.mixin({
		/**
		*
		* Execute a `osascript` command synchronously and return its String value.
		*
		* @author Salvatore Garbesi <sal@dolox.com>
		* @method osa
		* @memberof _
		* @param {string} input The `osascript` command to execute.
		* @returns {string} The output from the command.
		*
		**/
		osa: function(input) {
			// Invoke the command.
			return _.exec('osascript -e "' + _.escapeQuote(input) + '"');
		}
	});
};
