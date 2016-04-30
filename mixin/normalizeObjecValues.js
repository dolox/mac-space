/**
*
* Lodash mixin.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @mixin mixin/normalizeObjecValues
*
**/
module.exports = function() {
	'use strict';

	// Define the mixin.
	_.mixin({
		/**
		*
		* Normalize the values for a Object.
		*
		* @author Salvatore Garbesi <sal@dolox.com>
		* @method normalizeObjecValues
		* @memberof _
		* @param {object} input The source Object to normalize.
		* @param {object} instruction The normalization instructions.
		* @returns {object} The normalized Object.
		*
		**/
		normalizeObjecValues: function(input, instruction) {
			// The normalized Object.
			var output = {};

			// If `instruction` isn't a Object, then stop the Function.
			if (_.isObject(instruction) === false) {
				return output;
			}

			// Normalize the `input` to a Object.
			input = _.isObject(input) ? input : {};

			// Iterate through each of the defaults.
			_.each(instruction, function(value, key) {
				// If the `value` is a Object, then handle the nested validation instructions.
				if (_.isObject(value) === true) {
					output[key] = _.normalizeObjectValues(input[key], value);
				}

				// If the `value` is a Array, and the first item of the Array is a Function, then use that Function to perform the
				// normalization on the `value`.
				else if (_.isArray(value) === true && value.length > 0 && _.isFunction(value[0]) === true) {
					// Build the arguments.
					var args = value.slice(1);

					// Add the `value` as the first argument.
					args.unshift(input[key]);

					// Invoke the validation.
					output[key] = value[0].apply(null, args);
				}

				// If the `input` value isn't `undefined`, then use it, otherwise fallback to the `value`.
				else {
					output[key] = _.isUndefined(input[key]) === false ? input[key] : value;
				}
			});

			// Return the normalized Object.
			return output;
		}
	});
};
