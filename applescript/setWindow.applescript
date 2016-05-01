(**
*
* The AppleScript template used to generate the windows for the spaces.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @method setWindow
* @param {string} inputApplication The name of the application recognizable by AppleScript.
* @param {number} inputDelay The delay between launching windows.
* @param {string} inputOsascript Invoke OSA commands to assist with launching the window.
* @param {string} inputOsascriptPost Invoke OSA commands after the window has launched.
* @param {string} inputOsascriptPre Invoke OSA commands before the window has launched.
* @param {number} inputSpace The Mac OS X space to assign the windows to.
* @param {string} shell Invoke shell commands to assist with launching the window.
* @param {string} shellPost Invoke shell commands after the window has launched.
* @param {string} shellPre Invoke shell commands before the window has launched.
* @param {number} inputWindowHeight The height of the window.
* @param {number} inputWindowWidth The width of the window.
* @param {number} inputWindowX The X position of the window.
* @param {number} inputWindowY The Y position of the window.
* @returns {undefined} Nothing is returned.
*
**)
on setWindow(inputApplication, inputDelay, inputOsascript, inputOsascriptPost, inputOsascriptPre, inputSpace, inputShell, inputShellPost, inputShellPre, inputWindowHeight, inputWindowWidth, inputWindowX, inputWindowY)
	-- Invoke the pre-shell commmand.
	if (inputShellPre is not "") then do shell script inputShellPre

	-- Invoke the pre-osascript.
	if (inputOsascriptPre is not "") then run script inputOsascriptPre

	-- Launch the Application.
	tell application inputApplication to launch

	-- Run the Application.
	tell application inputApplication to run

	-- Invoke the shell commmand.
	if (inputShell is not "") then do shell script inputShell

	-- Invoke the osascript.
	if (inputOsascript is not "") then run script inputOsascript

	-- Add a delay due to UI animations.
	delay inputDelay

	-- Resize and reposition the window.
	if (inputWindowHeight is not 0 or inputWindowWidth is not 0) then
		-- Use the system events to interact with the application.
		tell application "System Events"
			-- Fetch the first application process available.
			set applicationProcess to first process whose name is inputApplication

			-- Adjust the application process.
			tell applicationProcess
				-- Fetch the first window for the application.
				tell first window
					-- Attempt to resize and reposition the window.
					try
						-- Reposition the window.
						set position to {inputWindowX, inputWindowY}

						-- Resize the window.
						if (inputWindowHeight is not 0 or inputWindowWidth is not 0) then set size to {inputWindowWidth, inputWindowHeight}
					end try
				end tell
			end tell
		end tell
	end if

	-- Invoke the post-osascript.
	if (inputOsascriptPost is not "") then run script inputOsascriptPost

	-- Invoke the post-shell commmand.
	if (inputShellPost is not "") then do shell script inputShellPost
end setWindow
