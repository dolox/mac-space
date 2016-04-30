/**
*
* Lodash mixin.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @mixin mixin/castToArray
*
**/
module.exports = function() {
	'use strict';

	// Define the mixin.
	_.mixin({
		/**
		*
		* Cast a defined reference to a Array.
		*
		* @author Salvatore Garbesi <sal@dolox.com>
		* @method castToArray
		* @memberof _
		* @param {string} input The reference to cast.
		* @returns {array|undefined} The reference cast to an Array, unless it was `undefined`.
		*
		**/
		castToArray: function(input) {
			// Cast the reference to a Array.
			return _.isArray(input) === true || _.isUndefined(input) === true ? input : [input];
		}
	});
};
