/**
*
* Lodash mixin.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @mixin mixin/templateAppleScript
*
**/
module.exports = function() {
	'use strict';

	// Define the mixin.
	_.mixin({
		/**
		*
		* Render the AppleScript template.
		*
		* @author Salvatore Garbesi <sal@dolox.com>
		* @method templateAppleScript
		* @memberof _
		* @param {object} input The variables to render the template with.
		* @returns {string} The rendered AppleScript template.
		*
		**/
		templateAppleScript: function(input) {
			// Load and render the template.
			return _.template(fs.readFileSync(path.join(__dirname, '..', '..', 'tpl', 'window.applescript')).toString())(input);
		}
	});
};
