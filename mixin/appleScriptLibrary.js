/**
*
* Lodash mixin.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @mixin mixin/appleScriptLibrary
*
**/
module.exports = function() {
	'use strict';

	// Define the mixin.
	_.mixin({
		/**
		*
		* Read all of the AppleScript files for the project.
		*
		* @author Salvatore Garbesi <sal@dolox.com>
		* @method appleScriptLibrary
		* @memberof _
		* @returns {string} A concatenation of the AppleScript files.
		*
		**/
		appleScriptLibrary: function() {
			// Reference the `applescript` directory.
			var directory = path.join(__dirname, '..', 'applescript');

			// Fetch the files in the folder.
			var files = fs.readdirSync(directory);

			// The concatenated output.
			var output = '';

			// Iterate through the files and append their contents to the `output` variable.
			_.each(files, function(file) {
				output += fs.readFileSync(path.join(directory, file)).toString();
			});

			// Return the concatenated Strings.
			return output;
		}
	});
};
