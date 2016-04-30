/**
*
* Lodash mixin.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @mixin mixin/isArrayOrObject
*
**/
module.exports = function() {
	'use strict';

	// Define the mixin.
	_.mixin({
		/**
		*
		* Determine if a reference is a Array or Object.
		*
		* @author Salvatore Garbesi <sal@dolox.com>
		* @method isArrayOrObject
		* @memberof _
		* @param {string} input The reference to analyze.
		* @returns {boolean} Whether the `input` is a Array or Object.
		*
		**/
		isArrayOrObject: function(input) {
			// Invoke the conditions.
			return _.isArray(input) === true || _.isObject(input) === true;
		}
	});
};
