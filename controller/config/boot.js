/**
*
* Lodash mixin.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @mixin src/mixin/escapeQuote
*
**/
_.mixin({
	/**
	*
	* Escape quotes contained within a String.
	*
	* @author Salvatore Garbesi <sal@dolox.com>
	* @method escapeQuote
	* @memberof _
	* @param {string} input The String with quotes to escape.
	* @returns {string} The output from the command.
	*
	**/
	escapeQuoteX: function(input) {
		'use strict';

		// Verify that the configuration file exists.
		var exists = fs.existsSync(input);

		// If the file cannot be access, throw a error.
		if (exists === false) {
			return log.error('The configration file doesn\'t exist or cannot be accessed.', '(' + input + ')');
		}

		// Attempt to read and parse the configuration file.
		try {
			return JSON.parse(fs.readFileSync(input));
		} catch (exception) {
			return log.error('Unable to read or parse JSON configuration file.', '(' + input + ')', exception);
		}

		// Throw a success to console.
		log.success('Configuration loaded successfully.', '(' + input + ')');
	}
});
