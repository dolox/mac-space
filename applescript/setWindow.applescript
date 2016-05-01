(**
*
* The AppleScript template used to generate the windows for the spaces.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @module applescript/setWindow
*
**)
on setWindow(inputApplication, inputDelay, inputOsascript, inputOsascriptPre, inputOsascriptPost, inputSpace, inputShell, inputShellPre, inputShellPost, inputWindowHeight, inputWindowWidth, inputWindowX, inputWindowY)
	-- Invoke the pre-shell commmand.
	if (inputShellPre is not "") then do shell script inputShellPre

	-- Invoke the pre-osascript.
	if (inputOsascriptPre is not "") then run script inputOsascriptPre

	-- Activate the space.
	setSpace(inputDelay, inputSpace)

	-- Invoke the shell commmand.
	if (inputShell is not "") then do shell script inputShell

	-- Launch the Application.
	tell application inputApplication to launch

	-- Run the Application.
	tell application inputApplication to run

	-- Set the Application as the top window.
	tell application inputApplication to activate

	-- Set the space again, in the event that the Application acivation changed the space.
	setSpace(inputDelay, inputSpace)

	-- Invoke the osascript.
	if (inputOsascript is not "") then run script inputOsascript

	-- Resize and reposition the window.
	if (inputWindowHeight is not 0 or inputWindowWidth is not 0 or inputWindowX is not 0 or inputWindowY is not 0) then
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
						if (inputWindowHeight is not 0 or inputWindowWidth is not 0) then set position to {inputWindowX, inputWindowY}

						-- Resize the window.
						if (inputWindowX is not 0 or inputWindowY is not 0) then set size to {inputWindowWidth, inputWindowHeight}
					end try
				end tell
			end tell
		end tell
	end if

	-- Invoke the post-shell commmand.
	if (inputShellPost is not "") then do shell script inputShellPost

	-- Invoke the post-osascript.
	if (inputOsascriptPost is not "") then run script inputOsascriptPost
end setWindow
