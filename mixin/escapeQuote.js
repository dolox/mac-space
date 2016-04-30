/**
*
* Lodash mixin.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @mixin src/mixin/escapeQuote
*
**/
module.exports = function() {
	'use strict';

	// Define the mixin.
	_.mixin({
		/**
		*
		* Escape quotes contained within a String.
		*
		* @author Salvatore Garbesi <sal@dolox.com>
		* @method escapeQuote
		* @memberof _
		* @param {string} input The String with quotes to escape.
		* @returns {string} The output from the command.
		*
		**/
		escapeQuote: function(input) {
			// Escape the quotes.
			return _.isUndefined(input) === true ? '' : JSON.stringify(input).slice(1, -1);
		}
	});
};
