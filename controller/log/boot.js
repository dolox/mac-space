/**
*
* Generate a `winston` logger instance for the project.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @method log
* @memberof controller
* @returns {object} An instance of the `winston` library.
*
**/
module.exports = function() {
	'use strict';

	// Wrap the Function.
	return function() {
		// Generate a new winston instance.
		return new winston.Logger({
			// Define the colors.
			colors: {
				debug: 'blue',
				error: 'red',
				info: 'blue',
				success: 'green'
			},

			// The log methods and their levels.
			levels: {
				debug: 1,
				error: 1,
				info: 1,
				success: 1
			},

			// Define the transports.
			transports: [
				// Create a new transport protocol.
				new winston.transports.Console({
					// Enable coloring of the logs.
					colorize: true,

					// The lowest level to output.
					level: 'info',

					// Enable timestamping the logs.
					timestamp: function() {
						return new Date();
					}
				})
			]
		});
	};
};
