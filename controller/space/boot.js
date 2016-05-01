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
		// If the window isn't enabled, then stop the Function.
		if (input.enabled === false) {
			return;
		}

		// Change the space now to obtain the resolution. This event needs to occur now, as different spaces may contain
		// different resolutions (on separate monitors).
		_.appleScript(_.appleScriptRoutineCall('setSpace', [
			config.delay,
			input.space
		]));

		// The starting column for the grid.
		var column = -1;

		// Fetch the screen resolution.
		var resolution = _.screenResolution();

		// The starting row for the grid.
		var row = 0;

		// Store the concatenated AppleScript.
		var script = '';

		// The height of the windows.
		var height = input.row.max <= 0 ? 0 : Math.floor(resolution.height / input.row.max);

		// The width of the windows.
		var width = input.column.max <= 0 ? 0 : Math.floor(resolution.width / input.column.max);

		// Iterate through each of the windows and open them on the specific space.
		input.window.forEach(function(value) {
			// Assign the windows height.
			var windowHeight = height;

			// Assign the windows width.
			var windowWidth = width;

			// Assign the windows X position.
			var windowX = 0;

			// Assign the windows Y position.
			var windowY = 0;

			// Process the grid if the maximum number of columns/rows aren't set to `0`.
			if (input.column.max > 0 && input.row.max > 0) {
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

				// If the `application` property is empty, then stop the iteration.
				if (_.isEmpty(value.application) === true) {
					return;
				}

				// Adjust the X position of the window.
				windowX = column * (resolution.width / input.column.max) + column * input.column.spacing;

				// Adjust the Y position of the window.
				windowY = row * (resolution.height / input.row.max) + row * input.row.spacing;

				// If column spacing is enabled, then adjust the window.
				if (input.column.spacing > 0 && input.column.max > 1) {
					// Adjust the window width.
					windowWidth -= input.column.spacing;
				}

				// If row spacing is enabled, then adjust the window.
				if (input.row.spacing > 0 && input.row.max > 1) {
					// Adjust the window height.
					windowHeight -= input.row.spacing;
				}
			}

			// If the `application` property is empty, then stop the iteration.
			if (_.isEmpty(value.application) === true) {
				return;
			}

			// Append the `setWindow` routine.
			script += _.appleScriptRoutineCall('setWindow', [
				value.application,
				config.delay,
				value.osascript.join(' & '),
				value.osascriptPost.join(' & '),
				value.osascriptPre.join(' & '),
				input.space,
				value.shell.join(';'),
				value.shellPost.join(';'),
				value.shellPre.join(';'),
				windowHeight,
				windowWidth,
				windowX,
				windowY
			]) + '\n';
		});

		// Invoke the AppleScript.
		_.appleScript(script);
	};
};
