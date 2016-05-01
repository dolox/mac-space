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

	// Generate UUIDs.
	GLOBAL.nodeUuid = require('node-uuid');

	// The native path module.
	GLOBAL.path = require('path');

	// Load the `package.json` file.
	GLOBAL.pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json')));

	// Logging utility.
	GLOBAL.winston = require('winston');

	// Autoload the source files into memory.
	expressLoad('mixin').then('controller').into(app);

	// Swap the package name for the `cli`.
	process.argv[1] = pkg.name;

	// Boot the CLI configuration.
	GLOBAL.cli = app.controller.cli.boot();

	// Generate a new winston instance.
	GLOBAL.log = app.controller.log.boot();
}(GLOBAL));
