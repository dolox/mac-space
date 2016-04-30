/**
*
* Lodash mixin.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @mixin src/mixin/exec
*
**/
module.exports = function() {
	'use strict';

	// Define the mixin.
	_.mixin({
		/**
		*
		* Execute a shell command synchronously and return its String value.
		*
		* @author Salvatore Garbesi <sal@dolox.com>
		* @method exec
		* @memberof _
		* @param {string} input The shell command to execute.
		* @returns {string} The output from the command.
		*
		**/
		exec: function() {
			// Invoke the command.
			return childProcess.execSync.apply(this, arguments).toString();
		}
	});
};
