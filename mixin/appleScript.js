/**
*
* Lodash mixin.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @mixin mixin/appleScript
*
**/
module.exports = function() {
	'use strict';

	// Define the mixin.
	_.mixin({
		/**
		*
		* Invoke a AppleScript command with the libraries AppleScript files bundled.
		*
		* @author Salvatore Garbesi <sal@dolox.com>
		* @method appleScript
		* @memberof _
		* @param {string} input The AppleScript to use.
		* @returns {mixed} The results from the command.
		*
		**/
		appleScript: function(input) {
			// Generate a temporary directory for the instance.
			var directory = path.join(tmp, nodeUuid.v4());

			// The temporary file.
			var file = path.join(directory, 'script.applescript');

			// Create the directory.
			fs.mkdirSync(directory);

			// Load the library file(s).
			var appleScript = _.appleScriptLibrary();

			// Append the script.
			appleScript += input;

			// Store the AppleScript file.
			fs.writeFileSync(file, appleScript);

			// Store the results from the command.
			var results;

			// Attempt to invoke the AppleScript file.
			try {
				// Invoke the AppleScript file.
				results = _.exec('osascript ' + file);
			}

			// Catch any exceptions.
			catch (exception) {
				// Throw a error to console.
				log.error('AppleScript error!', exception);
			}

			// Remove the temporary directory.
			_.exec('rm -r ' + directory);

			// Return the results.
			return results;
		}
	});
};
