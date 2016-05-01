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
		// Store the concatenated AppleScript template.
		var appleScript = '';

		// @todo remove
		appleScript += fs.readFileSync(path.join(__dirname, '..', '..', 'applescript', 'setSpace.applescript')).toString();
		appleScript += fs.readFileSync(path.join(__dirname, '..', '..', 'applescript', 'setSpaceIndex.applescript')).toString();
		appleScript += fs.readFileSync(path.join(__dirname, '..', '..', 'applescript', 'setWindow.applescript')).toString();

		// The starting column for the grid.
		var column = -1;

		// The starting row for the grid.
		var row = 0;

		// Reference the `tmp` directory.
		var tmpDirectory = path.join(__dirname, '..', '..', 'tmp');

		// Generate a temporary directory for the instance.
		var instanceDirectory = path.join(tmpDirectory, nodeUuid.v4());

		// If the `tmp` directory doesn't exist, then create it.
		if (fs.existsSync(tmpDirectory) === false) {
			// Create the directory.
			fs.mkdirSync(tmpDirectory);
		}

		// Create the temporary directory for the instance.
		fs.mkdirSync(instanceDirectory);


		// @todo ok so this we need to fetch when the space changes apparently...
		var resolution = _.screenResolution();


		var windowHeight = Math.floor(resolution.height / input.row.max);

		var windowWidth = Math.floor(resolution.width / input.column.max);

		// Iterate through each of the windows and open them on the specific space.
		input.window.forEach(function(value, index) {
			// @todo if application is missing throw a error

			if (column < input.column.max - 1) {
				column++;
			}

			
			else {
				row++;
				column = 0;
			}

			var left = (column * (resolution.width / input.column.max));
			var top = (row * (resolution.height / input.row.max));

			if (input.column.max > 1 && column == input.column.max - 1 && input.column.spacing) {
				left += input.column.spacing;
			}

			if (input.row.max > 1 && row == input.row.max - 1 && input.row.spacing) {
				top += input.row.spacing;
			}

			if (input.row.max > 1) {
				windowHeight -= input.row.spacing;
			}

			if (input.column.max > 1) {
				windowWidth -= input.column.spacing;
			}

			// Append a new line.
			appleScript += '\n';

			// Append a comment for the new `setWindow` routine.
			appleScript += '-- ' + value.application;

			// Append the `title` for the window.
			appleScript += value.title ? ' - ' + value.title : '';

			// Append the `description` for the window.
			appleScript += value.description ? ' - ' + value.description : '';

			// Append a new line.
			appleScript += '\n';

			// Append the `setWindow` routine.
			appleScript += _.appleScriptRoutineCall('setWindow', [
				value.application,
				config.delay,
				value.osascript.join(' & '),
				value.osascriptPre.join(' & '),
				value.osascriptPost.join(' & '),
				input.space,
				value.shell.join(';'),
				value.shellPre.join(';'),
				value.shellPost.join(';'),
				windowHeight,
				windowWidth,
				left,
				top
			]);
		});

		var d = path.join(instanceDirectory, 'window.applescript');
		fs.writeFileSync(d, appleScript);

		try {
			_.exec('osascript ' + d);
		} catch (e) {
			log.error('command failed');
		}

		// Remove the temporary directory.
		//_.exec('rm -r ' + instanceDirectory);
	};
};
