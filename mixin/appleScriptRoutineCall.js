/**
*
* Lodash mixin.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @mixin mixin/appleScriptRoutineCall
*
**/
module.exports = function() {
	'use strict';

	// Define the mixin.
	_.mixin({
		/**
		*
		* Generate the String to invoke a AppleScript routine.
		*
		* @author Salvatore Garbesi <sal@dolox.com>
		* @method appleScriptRoutineCall
		* @memberof _
		* @param {string} routine The name of the routine.
		* @param {array} input The arguments for the routine.
		* @returns {string} The line of code to invoke the AppleScript routine.
		*
		**/
		appleScriptRoutineCall: function(routine, input) {
			// Store the normalized arguments.
			var args = [];

			// Build the arguments.
			_.each(input, function(value) {
				// If the `value` is a Number and is malformed, then force it to `0`.
				if (_.isNumber(value) === true && (_.isFinite(value) === false || _.isNaN(value) === true)) {
					value = 0;
				}

				// Store the normalized argument.
				args.push(_.isNumber(value) === true ? value : '"' + _.escapeQuote(value) + '"');
			});

			// Generate the routine call.
			return routine + '(' + args.join(', ') + ')';
		}
	});
};
