/**
*
* The main application which loads the spaces configuration.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @module index
*
* @return {undefined} Nothing is returned from this Function.
*
**/
module.exports = (function(GLOBAL) {
	'use strict';

	// Load the Boostrap.
	require(require('path').join(__dirname, '/bootstrap'));

	// If no configuration file is set, throw a error.
	if (_.isString(_.get(cli, 'config')) === false) {
		return log.error('No configuration file specified.');
	}
	// Load and normalize the configuration for the instance.
	var config = app.controller.config.boot(cli.config);

	// If the configuration failed to normalize, stop the Function.
	if (config === false) {
		return process.exit();
	}


	console.log(config.space);



	// Merge the configuration with the defaults.
	// @todo normalize it ?
	//config = _.merge(defaults, config);





	var boot = function(config) {
		var cols = -1;
		var rows = 0;

		// @todo ok so this we need to fetch when the space changes apparently...
		// interesting
		var resolution = _.screenResolution();

		var winCols = Math.floor(resolution.width / config.column.max);
		var winRows = Math.floor(resolution.height / config.row.max);

		config.window.forEach(function(value, index) {
			if (cols < config.column.max - 1) {
				cols++;
			} else {
				rows++;
				cols = 0;
			}

			var h = winRows;
			var w = winCols;

			var left = (cols * (resolution.width / config.column.max));
			var top = (rows * (resolution.height / config.row.max));

			if (config.column.max > 1 && cols == config.column.max - 1 && config.column.spacing) {
				left += config.column.spacing;
			}

			if (config.row.max > 1 && rows == config.row.max - 1 && config.row.spacing) {
				top += config.row.spacing;
			}

			if (config.row.max > 1) {
				h -= config.row.spacing;
			}

			if (config.column.max > 1) {
				w -= config.column.spacing;
			}

			var script = _.get(value, 'script');
			script = _.isArray(script) ? script.join(' & ') : script;
			script = _.isString(script) ? script : '';

			// Don't do this... buils 1 single full template file, then invoke it once
			var template = _.templateAppleScript(_.merge(_.clone(config), {
				delay: 0.5,
				application: value.application,
				command: _.escapeQuote(_.get(value, 'command')),
				pre: _.get(value, 'pre') || '',
				x: left,
				y: top,
				height: h,
				script: script,
				width: w
			}));

			fs.writeFileSync('_tmp.applescript', template);

			_.exec('osascript _tmp.applescript');
		});
	}

	_.each(config.space, function(value) {

		console.log(value);
		boot(value);
	});
}());
