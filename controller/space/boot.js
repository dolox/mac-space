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

		// Iterate through each of the windows and open them on the specific space.
		input.window.forEach(function(value) {
			// If the `application` property is missing, then skip the iteration.
			if (_.isEmpty(value.application) === true) {
				// Throw a error to console.
				log.error('No application name specified for window! Skipping.', value);

				// Skip the iteration..
				return;
			}

			var windowHeight = 0;
			var windowWidth = 0;
			var windowX = 0;
			var windowY = 0;

			// Process the grid if the maximum number of columns/rows aren't set to `0`.
			if (input.column.max > 0 && input.row.max > 0) {


				// @todo
				windowHeight = Math.floor(resolution.height / input.row.max);

				windowWidth = Math.floor(resolution.width / input.column.max);



				// Increment the column before the row.
				if (column < input.column.max - 1) {
					column++;
				}

				// If the columns have exhausted, then increment the row.
				else {
					// Increment the row.
					row++;

					// Reset the column.
					column = 0;
				}

				// Adjust the X position of the window.
				windowX = column * (resolution.width / input.column.max);

				// Adjust the Y position of the window.
				windowY = row * (resolution.height / input.row.max);

				// If column spacing is enabled, then adjust the window.
				if (input.column.spacing > 0 && input.column.max > 1) {
					// Only adjust the X position, if it's not the first column.
					if (column > 1) {
						windowX += input.column.spacing;
					}

					// Adjust the window width.
					windowWidth -= input.column.spacing;
				}

				// If row spacing is enabled, then adjust the window.
				if (input.row.spacing > 0 && input.row.max > 1) {
					// Only adjust the Y position, if it's not the first row.
					if (row > 1) {
						windowY += input.row.spacing;
					}

					// Adjust the window height.
					windowHeight -= input.row.spacing;
				}

				if (input.column.max > 1) {
					windowWidth -= input.column.spacing;
				}
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
				windowX,
				windowY
			]);
		});

		var appleScriptFile = path.join(instanceDirectory, 'window.applescript');
		fs.writeFileSync(appleScriptFile, appleScript);

		// Attempt to invoke the batch script.
		try {
			// Invoke the AppleScript.
			_.exec('osascript ' + appleScriptFile);
		}

		// Catch any exceptions.
		catch (exception) {
			// Throw a error to console.
			log.error('Building of space failed.', exception);
		}

		// Remove the temporary directory.
		_.exec('rm -r ' + instanceDirectory);
	};
};
