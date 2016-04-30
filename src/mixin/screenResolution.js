/**
*
* Lodash mixin.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @mixin src/mixin/screenResolution
*
**/
module.exports = function() {
	'use strict';

	// Define the mixin.
	_.mixin({
		/**
		*
		* Fetch the screen resolution.
		*
		* @author Salvatore Garbesi <sal@dolox.com>
		* @method screenResolution
		* @memberof _
		* @returns {object} The screens resolution.
		*
		**/
		screenResolution: function() {
			// Invoke the shell command to derive the screen resolution.
			var output = _.osa('tell application "Finder" to get bounds of window of desktop');

			// Split on the comma delimiter.
			output = output.split(', ');

			// Return the resolution.
			return {
				// Derive the height.
				height: _.parseInt(output[3]),

				// Derive the width.
				width: _.parseInt(output[2])
			};
		}
	});
};
