/**
*
* Lodash mixin.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @mixin mixin/isArrayOrString
*
**/
module.exports = function() {
	'use strict';

	// Define the mixin.
	_.mixin({
		/**
		*
		* Determine if a reference is a Array or String.
		*
		* @author Salvatore Garbesi <sal@dolox.com>
		* @method isArrayOrString
		* @memberof _
		* @param {string} input The reference to analyze.
		* @returns {boolean} Whether the `input` is a Array or String.
		*
		**/
		isArrayOrString: function(input) {
			// Invoke the conditions.
			return _.isArray(input) === true || _.isString(input) === true;
		}
	});
};
