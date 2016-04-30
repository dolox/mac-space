/**
*
* Bootstrap the project with necessary globals.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @module bootstrap
*
* @return {undefined} Nothing is returned from this Function.
*
**/
module.exports = (function(GLOBAL) {
	'use strict';

	// Require the Lodash utility.
	GLOBAL._ = require('lodash');

	// The application namespace.
	GLOBAL.app = {};

	// The native process handler module.
	GLOBAL.childProcess = require('child_process');

	// The command utility to help with CLI interaction.
	GLOBAL.commander = require('commander');

	// Autoload files under a specific namespace.
	GLOBAL.expressLoad = require('express-load');

	// The native file system module.
	GLOBAL.fs = require('fs');

	// The native path module.
	GLOBAL.path = require('path');

	// Load the `package.json` file.
	GLOBAL.pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json')));

	// Logging utility.
	GLOBAL.winston = require('winston');

	// Autoload the source files into memory.
	expressLoad('', {
		cwd: path.join(__dirname, 'src')
	}).into(GLOBAL.app);


	// @todo clean this up and fork to separate files

	// Swap the package name.
	process.argv[1] = pkg.name;

	// Set the version of the CLI utility.
	GLOBAL.cli = commander.version(pkg.version);


	// Import the acceptable arguments for the program.
	_.each(pkg.commander, function(option) {
		cli.option.apply(cli, option);
	});

	// Add help examples.
	cli.on('--help', function(){
		console.log('  Examples:');
		console.log('');
		console.log('    npm run start -- -f /path/to/config.json');
		console.log('    npm run start -- --file /path/to/config.json');
		console.log('');
	});
	
	// Parse the CLI arguments.
	GLOBAL.cli.parse(process.argv);

	// Generate a new winston instance.
	GLOBAL.log = new winston.Logger({
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
			new (winston.transports.Console)({
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

	// Throw a debug to console.
	log.debug('bootstrap');
}(GLOBAL));
