/**
*
* Allows the clients to interact through the CLI and parsers CLI arguments.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @method boot
* @memberof controller/cli
* @returns {object} An instance of the `commander` library.
*
**/
module.exports = function() {
	'use strict';

	// Wrap the Function.
	return function() {
		// Set the version of the CLI utility.
		var me = commander.version(pkg.version);

		// Import the acceptable arguments for the program.
		_.each(pkg.commander, function(option) {
			me.option.apply(me, option);
		});

		// Add help examples.
		me.on('--help', function(){
			console.log('  Examples:');
			console.log('');
			console.log('    ' + pkg.name + ' -c /path/to/config.json');
			console.log('    ' + pkg.name + ' --config /path/to/config.json');
			console.log('');
		});

		// Parse the CLI arguments.
		me.parse(process.argv);

		// Return the commander instance.
		return me;
	};
};
