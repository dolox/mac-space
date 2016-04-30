/**
*
* Load the windows for a space.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @method boot
* @memberof controller/space
* @param {object} config The global configuraton.
* @param {object} input The configuration for the space.
* @returns {boolean} Fail/success state.
*
**/
module.exports = function() {
	'use strict';

	// Wrap the Function.
	return function(config, input) {
		var cols = -1;
		var rows = 0;

		// @todo ok so this we need to fetch when the space changes apparently...
		// interesting
		var resolution = _.screenResolution();

		var winCols = Math.floor(resolution.width / input.column.max);
		var winRows = Math.floor(resolution.height / input.row.max);

		input.window.forEach(function(value, index) {
			if (cols < input.column.max - 1) {
				cols++;
			} else {
				rows++;
				cols = 0;
			}

			var h = winRows;
			var w = winCols;

			var left = (cols * (resolution.width / input.column.max));
			var top = (rows * (resolution.height / input.row.max));

			if (input.column.max > 1 && cols == input.column.max - 1 && input.column.spacing) {
				left += input.column.spacing;
			}

			if (input.row.max > 1 && rows == input.row.max - 1 && input.row.spacing) {
				top += input.row.spacing;
			}

			if (input.row.max > 1) {
				h -= input.row.spacing;
			}

			if (input.column.max > 1) {
				w -= input.column.spacing;
			}

			var script = _.get(value, 'script');
			script = _.isArray(script) ? script.join(' & ') : script;
			script = _.isString(script) ? script : '';

			// Don't do this... buils 1 single full template file, then invoke it once
			var template = _.templateAppleScript(_.merge(_.clone(config), {
				delay: 0.5,
				application: value.application,
				space: input.space,
				command: _.escapeQuote(_.get(value, 'command')),
				pre: _.get(value, 'pre') || '',
				x: left,
				y: top,
				height: h,
				script: script,
				width: w
			}));

			fs.writeFileSync('./tmp/build.applescript', template);

			_.exec('osascript ./tmp/build.applescript');
		});
	};
};
